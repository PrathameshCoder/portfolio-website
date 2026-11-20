'use client'

// The 3D background: an "embedding space" of points. Labelled points are skills
// from the CV. The cursor acts as a query and the three nearest skills light up
// and connect to it, the same top-3 retrieval idea DocuMind AI uses.

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { skillGroups } from '@/data/content'
import { sceneStore } from '@/lib/sceneStore'

// Scene colours per theme. `cloud` and `cloud2` are blended across the background points.
const PALETTE = {
  dark: { cloud: '#ff3c78', cloud2: '#9a6bff', node: '#ffe3f0', hit: '#ff6b35', edge: '#ff7ab8' },
  light: { cloud: '#c2255c', cloud2: '#6d28d9', node: '#3b1466', hit: '#c2255c', edge: '#a23a8c' },
}

function makeRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function buildSpace() {
  const rand = makeRandom(20260611)
  const gauss = () =>
    Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand())

  const nodes = []
  skillGroups.forEach((group, g) => {
    group.skills.forEach((label) => {
      nodes.push({
        label,
        group: g,
        position: new THREE.Vector3(
          group.centre[0] + gauss() * 1.0,
          group.centre[1] + gauss() * 0.8,
          group.centre[2] + gauss() * 0.9
        ),
      })
    })
  })

  // Unlabelled background points: most sit around the three clusters, the rest are scattered.
  const count = 1500
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const scattered = rand() < 0.3
    const c = skillGroups[Math.floor(rand() * skillGroups.length)].centre
    const spread = scattered ? 4.2 : 1.35
    positions[i * 3] = (scattered ? 0 : c[0]) + gauss() * spread
    positions[i * 3 + 1] = (scattered ? 0 : c[1]) + gauss() * spread * 0.75
    positions[i * 3 + 2] = (scattered ? 0 : c[2]) + gauss() * spread
    scales[i] = 0.5 + rand() * 1.1
  }

  // Faint edges joining each skill to its two nearest neighbours in the same cluster.
  const edges = []
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: i === j || a.group !== b.group ? Infinity : a.position.distanceTo(b.position) }))
      .sort((x, y) => x.d - y.d)
      .slice(0, 2)
    nearest.forEach(({ j, d }) => {
      if (d !== Infinity && i < j) edges.push(a.position, nodes[j].position)
      else if (d !== Infinity) {
        const dup = nodes[j].position
        // keep the edge if the reverse was not already added
        let exists = false
        for (let k = 0; k < edges.length; k += 2) {
          if (edges[k] === dup && edges[k + 1] === a.position) exists = true
        }
        if (!exists) edges.push(a.position, dup)
      }
    })
  })
  const edgePositions = new Float32Array(edges.length * 3)
  edges.forEach((v, i) => v.toArray(edgePositions, i * 3))

  return { nodes, positions, scales, edgePositions }
}

const cloudVertex = /* glsl */ `
  attribute float aScale;
  uniform float uSize;
  uniform float uTime;
  varying float vTwinkle;
  varying float vMix;
  void main() {
    vMix = clamp((aScale - 0.5) / 1.1, 0.0, 1.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vTwinkle = 0.7 + 0.3 * sin(uTime * 0.9 + position.x * 3.1 + position.y * 2.3);
    gl_PointSize = uSize * aScale * (1.0 / -mv.z);
  }
`
const cloudFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColor2;
  uniform float uOpacity;
  varying float vTwinkle;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.08, d);
    gl_FragColor = vec4(mix(uColor2, uColor, vMix), a * uOpacity * vTwinkle);
  }
`

function Space() {
  const space = useMemo(buildSpace, [])
  const group = useRef()
  const cloudMaterial = useRef()
  const edgeMaterial = useRef()
  const nodeRefs = useRef([])
  const rays = useRef()
  const rayMaterial = useRef()
  const marker = useRef()
  const markerMaterial = useRef()

  const pointer = useRef({ x: 0.25, y: 0.1, lastMove: -Infinity })
  const smooth = useRef({ x: 0.25, y: 0.1 })
  const highlight = useRef(space.nodes.map(() => 0))
  const colors = useRef({
    cloud: new THREE.Color(PALETTE.dark.cloud),
    cloud2: new THREE.Color(PALETTE.dark.cloud2),
    node: new THREE.Color(PALETTE.dark.node),
    hit: new THREE.Color(PALETTE.dark.hit),
    edge: new THREE.Color(PALETTE.dark.edge),
  })
  const scratch = useMemo(
    () => ({
      v: new THREE.Vector3(),
      q: new THREE.Vector3(),
      c: new THREE.Color(),
      target: new THREE.Color(),
      ndc: space.nodes.map(() => ({ x: 0, y: 0, d: 0, world: new THREE.Vector3() })),
      order: space.nodes.map((_, i) => i),
    }),
    [space]
  )

  const uniforms = useMemo(
    () => ({
      uSize: { value: 44 },
      uTime: { value: 0 },
      uOpacity: { value: 0.85 },
      uColor: { value: new THREE.Color(PALETTE.dark.cloud) },
      uColor2: { value: new THREE.Color(PALETTE.dark.cloud2) },
    }),
    []
  )
  const rayPositions = useMemo(() => new Float32Array(18), [])

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
      pointer.current.lastMove = performance.now()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const { camera, size, gl } = state
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    const still = sceneStore.reducedMotion
    const wide = size.width / size.height > 1.15
    const palette = PALETTE[sceneStore.theme] || PALETTE.dark
    const dark = sceneStore.theme !== 'light'

    // Scroll position drives the camera and how present the scene is.
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollMax > 0 ? window.scrollY / scrollMax : 0
    const hero = THREE.MathUtils.clamp(1 - window.scrollY / (window.innerHeight * 0.75), 0, 1)
    sceneStore.heroVisibility = hero
    // the field belongs to the hero: it fades out completely as the page moves on
    gl.domElement.style.opacity = String(hero * (wide ? 1 : 0.55))
    gl.domElement.style.visibility = hero < 0.01 ? 'hidden' : 'visible'

    // With no recent cursor movement (or on touch screens) the query wanders on its own.
    const idle = performance.now() - pointer.current.lastMove > 4000
    let qx = pointer.current.x
    let qy = pointer.current.y
    if (idle && !still) {
      qx = Math.sin(t * 0.31) * 0.55 + 0.15
      qy = Math.sin(t * 0.47 + 1.3) * 0.45
    }
    const ease = 1 - Math.exp(-dt * 6)
    smooth.current.x += (qx - smooth.current.x) * ease
    smooth.current.y += (qy - smooth.current.y) * ease
    qx = smooth.current.x
    qy = smooth.current.y

    // Slow drift, a little cursor parallax, and a turn as the page scrolls.
    const g = group.current
    // on wide screens the field sits in the open space between the name and the portrait
    g.position.x = wide ? 1.3 : 0
    g.position.y = wide ? 0.3 : 1.6
    g.rotation.y = (still ? 0 : t * 0.035) + progress * Math.PI * 1.5 + qx * 0.1
    g.rotation.x = (still ? 0 : Math.sin(t * 0.12) * 0.05) - qy * 0.06 + progress * 0.35
    camera.position.z = (wide ? 10 : 13) - progress * 2.2
    g.updateMatrixWorld()

    // Theme colours ease towards their targets.
    const cols = colors.current
    for (const key of ['cloud', 'cloud2', 'node', 'hit', 'edge']) {
      cols[key].lerp(scratch.target.set(palette[key]), ease)
    }
    const blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending
    const cm = cloudMaterial.current
    if (cm.blending !== blending) {
      cm.blending = blending
      cm.needsUpdate = true
    }
    cm.uniforms.uTime.value = still ? 0 : t
    cm.uniforms.uSize.value = 44 * gl.getPixelRatio()
    cm.uniforms.uOpacity.value = dark ? 0.8 : 0.55
    cm.uniforms.uColor.value.copy(cols.cloud)
    cm.uniforms.uColor2.value.copy(cols.cloud2)
    edgeMaterial.current.color.copy(cols.edge)
    edgeMaterial.current.opacity = dark ? 0.22 : 0.3

    // Retrieval: rank the skills by on-screen distance to the query, keep the top three.
    const aspect = size.width / size.height
    space.nodes.forEach((node, i) => {
      const n = scratch.ndc[i]
      n.world.copy(node.position).applyMatrix4(g.matrixWorld)
      scratch.v.copy(n.world).project(camera)
      n.x = scratch.v.x
      n.y = scratch.v.y
      // points outside the visible area are not candidates
      const visible = Math.abs(n.x) < 0.94 && n.y < 0.8 && n.y > -0.94 && scratch.v.z < 1
      n.d = visible ? Math.hypot((n.x - qx) * aspect, n.y - qy) : 99
    })
    scratch.order.sort((a, b) => scratch.ndc[a].d - scratch.ndc[b].d)
    const top = scratch.order.slice(0, 3)

    // The query point in world space, on the plane through the origin facing the camera.
    scratch.q.set(qx, qy, 0.5).unproject(camera).sub(camera.position)
    scratch.q.multiplyScalar(-camera.position.z / scratch.q.z).add(camera.position)
    marker.current.position.copy(scratch.q)
    marker.current.scale.setScalar(1 + (still ? 0 : Math.sin(t * 3) * 0.12))
    markerMaterial.current.color.copy(cols.hit)
    markerMaterial.current.opacity = hero

    top.forEach((index, k) => {
      scratch.q.toArray(rayPositions, k * 6)
      scratch.ndc[index].world.toArray(rayPositions, k * 6 + 3)
    })
    rays.current.geometry.attributes.position.needsUpdate = true
    rayMaterial.current.color.copy(cols.hit)
    rayMaterial.current.opacity = hero * 0.75

    space.nodes.forEach((_, i) => {
      const on = hero > 0.05 && top.includes(i) ? 1 : 0
      highlight.current[i] += (on - highlight.current[i]) * (1 - Math.exp(-dt * 10))
      const h = highlight.current[i]
      const mesh = nodeRefs.current[i]
      mesh.scale.setScalar(1 + h * 0.9)
      mesh.material.color.copy(scratch.c.copy(cols.node).lerp(cols.hit, h))
    })

    sceneStore.top = top.map((index) => {
      const n = scratch.ndc[index]
      return {
        label: space.nodes[index].label,
        score: Math.exp(-n.d * 0.9),
        x: ((n.x + 1) / 2) * size.width,
        y: ((1 - n.y) / 2) * size.height,
      }
    })
  })

  return (
    <>
      <group ref={group}>
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[space.positions, 3]} />
            <bufferAttribute attach="attributes-aScale" args={[space.scales, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={cloudMaterial}
            uniforms={uniforms}
            vertexShader={cloudVertex}
            fragmentShader={cloudFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[space.edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial ref={edgeMaterial} transparent opacity={0.22} depthWrite={false} />
        </lineSegments>

        {space.nodes.map((node, i) => (
          <mesh key={node.label} position={node.position} ref={(el) => (nodeRefs.current[i] = el)}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial />
          </mesh>
        ))}
      </group>

      <lineSegments ref={rays} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rayPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={rayMaterial} transparent depthWrite={false} depthTest={false} />
      </lineSegments>

      <mesh ref={marker}>
        <ringGeometry args={[0.09, 0.115, 40]} />
        <meshBasicMaterial ref={markerMaterial} transparent depthTest={false} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Space />
    </Canvas>
  )
}
