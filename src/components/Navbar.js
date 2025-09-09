'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import styles from '../app/page.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles['navbar-logo']}>Prathamesh.</div>

      {/* Links */}
      <ul className={`${styles['navbar-links']} ${menuOpen ? styles.show : ''}`}>
        <li><Link href="#" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link href="#projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
        <li><Link href="#about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>

      {/* Hamburger button */}
      <div className={styles.menuWrapper}>
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className={styles.menuIcon} />
          ) : (
            <Bars3Icon className={styles.menuIcon} />
          )}
        </button>
      </div>
    </nav>
  )
}
