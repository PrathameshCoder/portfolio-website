'use client'

import { useEffect } from 'react'
import { startSmoothScroll } from '@/lib/smooth'
import { watchSections } from '@/lib/sectionStore'

// Page-wide behaviour: smooth scrolling and the section watcher.
export default function Providers() {
  useEffect(() => {
    const stopScroll = startSmoothScroll()
    const stopWatch = watchSections()
    return () => {
      stopScroll()
      stopWatch()
    }
  }, [])
  return null
}
