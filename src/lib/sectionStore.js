'use client'

// Which chapter is in the middle of the screen. The nav shows its label, and
// the <html data-section> attribute drives the accent colour cross-fade in CSS.
const listeners = new Set()
let current = { id: 'top', label: 'Index' }

export const sectionStore = {
  get: () => current,
  set(next) {
    if (next.id === current.id) return
    current = next
    document.documentElement.dataset.section = next.id
    listeners.forEach((fn) => fn(next))
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

export function watchSections() {
  const sections = Array.from(document.querySelectorAll('section[data-label]'))
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) sectionStore.set({ id: e.target.id, label: e.target.dataset.label })
      }
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )
  sections.forEach((s) => io.observe(s))
  return () => io.disconnect()
}
