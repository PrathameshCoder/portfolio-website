'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siemens, summaries } from '@/data/content'
import { ease } from '@/lib/motion'
import { ProjectHead, Summary } from './Project'

function Lock() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

// The five layers of the recommendation as a 3D stack. Pick a layer to see how open it is and why.
function LayerExplorer() {
  const [active, setActive] = useState('L1')
  const layer = siemens.layers.find((l) => l.id === active)
  const drawn = [...siemens.layers].reverse() // L1 at the bottom

  return (
    <div className="explorer">
      <div className="stack-stage" aria-hidden="true">
        <div className="stack">
          {drawn.map((l, i) => (
            <div
              key={l.id}
              className={`slab ${l.id === active ? 'is-on' : ''} ${l.openness < 0.1 ? 'is-closed' : ''}`}
              style={{ '--i': i, '--o': l.openness }}
              onPointerEnter={() => setActive(l.id)}
              onClick={() => setActive(l.id)}
            >
              <span className="slab-face">
                <span className="slab-id">{l.id}</span>
                {l.openness < 0.1 && <Lock />}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="explorer-panel">
        <p className="label">Open or closed, layer by layer</p>
        <ol className="layers-list">
          {siemens.layers.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                className={`layer-btn ${l.id === active ? 'is-on' : ''}`}
                onClick={() => setActive(l.id)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(l.id)}
                onFocus={() => setActive(l.id)}
                aria-pressed={l.id === active}
                style={{ '--o': l.openness }}
              >
                <span className="layer-id">{l.id}</span>
                <span className="layer-name">{l.name}</span>
                <span className="layer-stance">{l.stance}</span>
                <span className="layer-meter" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>
        <AnimatePresence mode="wait">
          <motion.p
            key={layer.id}
            className="layer-why"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            aria-live="polite"
          >
            {layer.mechanism}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function SiemensChapter() {
  return (
    <section id="siemens" className="project" data-label="Siemens">
      <ProjectHead
        n="01"
        kicker="Siemens AG with FAU"
        title="Open or closed?"
        period={siemens.period}
        stack={['Platform strategy', 'Benchmarking', 'Business model design']}
      />
      <div className="proj-body">
        <Summary s={summaries.siemens} />
        <LayerExplorer />
      </div>
    </section>
  )
}
