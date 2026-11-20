'use client'

// Smooth scrolling with Lenis, plus helpers to jump to a section and to lock
// the page while an overlay is open. Falls back to native scrolling when the
// visitor prefers reduced motion.
import Lenis from 'lenis'

let lenis = null

export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    // let sideways swipes inside horizontal strips scroll natively
    virtualScroll: ({ deltaX, deltaY, event }) =>
      !(Math.abs(deltaX) > Math.abs(deltaY) && event.target?.closest?.('[data-hscroll]')),
  })
  let frame = 0
  const loop = (time) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(loop)
  }
  frame = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : -56 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function lockScroll(locked) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
