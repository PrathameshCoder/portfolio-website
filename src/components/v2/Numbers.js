'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { numbers } from '@/data/content'
import { ease } from '@/lib/motion'
import { scrollToId } from '@/lib/smooth'
import { Reveal } from './Split'

// Counts up from zero the first time it is on screen, keeping the decimals of the target.
function CountUp({ value }) {
  const ref = useRef(null)
  const target = parseFloat(value)
  const decimals = (value.split('.')[1] || '').length
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setShown((0).toFixed(decimals))
    let frame = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / 1300)
          setShown((target * (1 - Math.pow(1 - p, 3))).toFixed(decimals))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, decimals])

  return <span ref={ref}>{shown}</span>
}

export default function Numbers() {
  const open = (target) => (e) => {
    e.preventDefault()
    scrollToId(target)
  }

  return (
    <section id="numbers" className="numbers" data-label="In numbers">
      <Reveal className="label">The work, in six numbers</Reveal>
      <ul className="numbers-grid">
        {numbers.map((n, i) => (
          <motion.li
            key={n.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.8, ease, delay: (i % 3) * 0.07 }}
          >
            <a href={`#${n.target}`} onClick={open(n.target)}>
              <span className="numbers-value">
                <CountUp value={n.value} />
              </span>
              <span className="numbers-label">{n.label}</span>
              <span className="numbers-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
