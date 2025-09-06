'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleSwitch = () => setIsDark(!isDark)

  return (

<motion.button
  onClick={toggleSwitch}
  initial={false}
  animate={{ backgroundColor: isDark ? '#000' : '#fff' }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  style={{
    width: 70,
    height: 34,
    borderRadius: 50,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: isDark ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    padding: 4,
    border: `1.5px solid ${isDark ? '#fff' : '#000'}`,
    position: 'relative',
  }}
>
  {/* Sun SVG */}
  <motion.div
    initial={false}
    animate={{ opacity: isDark ? 1 : 1 }}
    style={{
      position: 'absolute',
      left: 10,
      width: 16,
      height: 16,
      color: isDark ? '#fff' : '#000',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  </motion.div>

  {/* Moon SVG */}
  <motion.div
    initial={false}
    animate={{ opacity: isDark ? 1 : 1 }}
    style={{
      position: 'absolute',
      right: 10,
      width: 16,
      height: 16,
      color: isDark ? '#fff' : '#000',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
    </svg>
  </motion.div>

  {/* Handle */}
  <motion.div
    layout
    transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
    style={{
      width: 25,
      height: 25,
      backgroundColor: isDark ? '#fff' : '#000',
      borderRadius: '50%',
      zIndex: 2,
    }}
  />
</motion.button>

  )
}
