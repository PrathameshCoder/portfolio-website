'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ease } from '@/lib/motion'

// A counter from 000 to 100, then the curtain lifts.
export default function Preloader() {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1100)
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 160)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="true"
        >
          <span className="preloader-mark">
            PG<span className="accent">.</span>
          </span>
          <span className="preloader-count">{String(n).padStart(3, '0')}</span>
          <span className="preloader-note">AI, digitalisation and software</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
