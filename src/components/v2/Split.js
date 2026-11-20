'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

// Letters rise out of a mask, one after another. Used for the big display headings.
// `animateNow` plays on mount (the hero); otherwise each heading plays when it scrolls in.
export function SplitLetters({ text, delay = 0, animateNow = false, className = '' }) {
  const reduce = useReducedMotion()
  let n = 0
  const words = text.split(' ')
  const play = animateNow ? { animate: { y: '0%' } } : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <span className={`split ${className}`} aria-label={text} role="text">
      {words.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && ' '}
          <span className="split-word" aria-hidden="true">
            {Array.from(word).map((ch) => {
              const i = n++
              return (
                <span className="split-mask" key={i}>
                  <motion.span
                    className="split-char"
                    initial={reduce ? false : { y: '110%' }}
                    {...play}
                    transition={{ duration: 0.95, ease, delay: delay + i * 0.03 }}
                  >
                    {ch}
                  </motion.span>
                </span>
              )
            })}
          </span>
        </Fragment>
      ))}
    </span>
  )
}

// Fade up on entering the screen.
export function Reveal({ children, delay = 0, y = 26, className, as = 'div', animateNow = false }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  const play = animateNow ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '0px 0px -8% 0px' } }
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y }} {...play} transition={{ duration: 0.85, ease, delay }}>
      {children}
    </M>
  )
}
