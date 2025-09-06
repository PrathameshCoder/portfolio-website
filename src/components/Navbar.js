'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { SunIcon } from '@heroicons/react/24/outline'
import { MoonIcon } from '@heroicons/react/24/solid'


export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2rem 3rem 0.5rem 2rem',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Prathamesh.</div>

      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '3.5rem',
        margin: 0,
        padding: 0,
        marginRight: '70px',
      }}>
        <li><Link href="#">Home</Link></li>
        <li><Link href="#projects">Projects</Link></li>
        <li><Link href="#about">About</Link></li>
        <li><Link href="#contact">Contact</Link></li>
      </ul>

      {/* Modern Framer-based toggle switch */}
      <ThemeToggle />
    </nav>
  )
}
