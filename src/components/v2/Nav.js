'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { sectionStore } from '@/lib/sectionStore'
import { scrollToId } from '@/lib/smooth'
import { sceneStore } from '@/lib/sceneStore'

const items = [
  { id: 'journey', label: 'Journey' },
  { id: 'siemens', label: 'Siemens' },
  { id: 'cranberry', label: 'Cranberry' },
  { id: 'ai', label: 'AI work' },
  { id: 'more', label: 'More' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(sectionStore.get())
  const [mode, setMode] = useState('dark')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => sectionStore.subscribe(setActive), [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pg-mode')
      if (saved === 'light' || saved === 'dark') setMode(saved)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.dataset.mode = mode
    sceneStore.theme = mode
    try {
      localStorage.setItem('pg-mode', mode)
    } catch {}
  }, [mode])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className={`nav ${open ? 'is-open' : ''}`}>
      <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <a href="#top" className="nav-logo" onClick={go('top')} aria-label="Prathamesh Gongle, back to top">
        PG<span className="accent">.</span>
      </a>
      <span className="nav-now" aria-live="polite">
        {active.label}
      </span>
      <nav className="nav-links" aria-label="Sections">
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} onClick={go(i.id)} aria-current={active.id === i.id ? 'true' : undefined}>
            {i.label}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <button
          type="button"
          className="mode-toggle"
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span>{mode === 'dark' ? 'Dark' : 'Light'}</span>
          <span className="mode-glyph" aria-hidden="true" />
        </button>
        <button type="button" className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="nav-sheet" hidden={!open}>
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} onClick={go(i.id)}>
            {i.label}
          </a>
        ))}
      </div>
    </header>
  )
}
