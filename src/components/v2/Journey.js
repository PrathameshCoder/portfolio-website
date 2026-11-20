'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '@/data/content'
import { ease } from '@/lib/motion'
import { scrollToId } from '@/lib/smooth'
import { Reveal, SplitLetters } from './Split'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const toM = (d) => {
  const [y, m] = d.split('-').map(Number)
  return y * 12 + (m - 1)
}
const M0 = toM(timeline.start)
const M1 = toM(timeline.end)
// Recent years hold more, so they get more width.
const YEAR_W = { 2020: 0.4, 2021: 0.55, 2022: 0.55, 2023: 0.6, 2024: 0.9, 2025: 1.3, 2026: 2.4, 2027: 1.1 }
const segs = (() => {
  const out = []
  let x = 0
  for (let y = Math.floor(M0 / 12); y * 12 < M1; y++) {
    const m0 = Math.max(M0, y * 12)
    const m1 = Math.min(M1, y * 12 + 12)
    const w = (YEAR_W[y] ?? 1) * ((m1 - m0) / 12)
    out.push({ y, m0, m1, x0: x, w })
    x += w
  }
  return { out, total: x }
})()
const pctM = (m) => {
  const s = segs.out.find((g) => m >= g.m0 && m <= g.m1) ?? segs.out[segs.out.length - 1]
  return ((s.x0 + ((m - s.m0) / (s.m1 - s.m0)) * s.w) / segs.total) * 100
}
const pct = (d) => pctM(toM(d))
const fmt = (d) => `${MONTHS[Number(d.split('-')[1]) - 1]} ${d.split('-')[0]}`

export default function Journey() {
  const [hover, setHover] = useState(null)
  const scroller = useRef(null)
  const years = useMemo(() => segs.out.filter((s) => s.m0 % 12 === 0).map((s) => ({ y: s.y, p: pctM(s.m0) })), [])
  const nowP = pct(timeline.now)

  // On narrow screens the chart scrolls sideways: open it at the recent end.
  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])

  const go = (it) => {
    if (!it.target) return
    scrollToId(it.target)
  }

  return (
    <section id="journey" className="journey" data-label="Journey">
      <header className="section-head">
        <Reveal className="label">Six years, side by side</Reveal>
        <h2 className="display-md">
          <SplitLetters text="the journey" />
          <span className="accent">.</span>
        </h2>
      </header>

      <div className="journey-scroll" ref={scroller} data-hscroll>
        <div className="journey-grid">
          <div className="journey-years" aria-hidden="true">
            {years.map((y) => (
              <span key={y.y} style={{ left: `${y.p}%` }}>
                {y.y}
              </span>
            ))}
          </div>
          <div className="journey-lanes">
            <div className="journey-overlay" aria-hidden="true">
              {years.map((y) => (
                <i key={y.y} className="journey-gridline" style={{ left: `${y.p}%` }} />
              ))}
              <i className="journey-now" style={{ left: `${nowP}%` }}>
                <b>Now</b>
              </i>
            </div>
            {timeline.lanes.map((lane, li) => (
              <div className="journey-lane" key={lane.id}>
                <span className="journey-lane-label">{lane.label}</span>
                <div className="journey-plot" style={{ height: lane.items.some((x) => x.row) ? 98 : 62 }}>
                  {lane.items.map((it) => {
                    const x0 = pct(it.from)
                    const w = Math.max(1.2, pct(it.to) - x0)
                    const when = it.yearOnly ? it.from.slice(0, 4) : `${fmt(it.from)} to ${fmt(it.to)}`
                    const Tag = it.target ? 'button' : 'div'
                    return (
                      <Tag
                        key={it.label}
                        type={it.target ? 'button' : undefined}
                        className={`journey-bar ${it.yearOnly ? 'is-approx' : ''} ${it.target ? 'is-link' : ''}`}
                        style={{ left: `${x0}%`, width: `${w}%`, top: (it.row || 0) * 40 + 12 }}
                        onMouseEnter={() => setHover({ ...it, when })}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover({ ...it, when })}
                        onBlur={() => setHover(null)}
                        onClick={it.target ? () => go(it) : undefined}
                        aria-label={it.target ? `${it.label}, ${when}. Open it.` : undefined}
                      >
                        <span className="journey-bar-label">{it.label}</span>
                        <motion.span
                          className="journey-bar-line"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease, delay: 0.3 + li * 0.1 + x0 / 140 }}
                        />
                      </Tag>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="journey-readout" aria-live="polite">
        {hover ? (
          <>
            <strong>{hover.label}</strong> {hover.when}
            {hover.target && <span className="muted">, click to open</span>}
          </>
        ) : (
          <span className="muted">Hover a bar for dates. Project bars open their chapter.</span>
        )}
      </p>
    </section>
  )
}
