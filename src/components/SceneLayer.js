'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { sceneStore } from '@/lib/sceneStore'

// WebGL only exists in the browser, so the scene is loaded on the client.
const Scene = dynamic(() => import('./Scene'), { ssr: false })

// The 3D skill field behind the hero. The hero text names the nearest skills.
export default function SceneLayer() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => (sceneStore.reducedMotion = media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  return (
    <div className="scene-layer" aria-hidden="true">
      <Scene />
    </div>
  )
}
