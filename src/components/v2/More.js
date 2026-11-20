'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { certification, education, languages, profile, skillGroups } from '@/data/content'
import { ease } from '@/lib/motion'
import { Reveal, SplitLetters } from './Split'

const TABS = ['Skills', 'Education', 'Languages', 'Beyond work']

export default function More() {
  const [tab, setTab] = useState('Skills')
  return (
    <section id="more" className="more" data-label="More">
      <header className="more-head">
        <h2 className="display-md">
          <SplitLetters text="and more" />
          <span className="accent">.</span>
        </h2>
        <div className="tabs" role="tablist" aria-label="More about Prathamesh" data-hscroll>
          {TABS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={t === tab} className={t === tab ? 'is-on' : ''} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <motion.div key={tab} className="more-panel" role="tabpanel" aria-label={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        {tab === 'Skills' && (
          <dl className="toolbox">
            {skillGroups.map((g) => (
              <div key={g.id}>
                <dt>{g.title}</dt>
                <dd>{g.skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
        )}
        {tab === 'Education' && (
          <ul className="edu">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="edu-when">{e.period}</span>
                <strong>{e.degree}</strong>
                <span>{e.school}</span>
                {e.detail && <span className="muted">{e.detail}</span>}
              </li>
            ))}
            <li>
              <span className="edu-when">{certification.date}</span>
              <strong>{certification.name}</strong>
              <span>Certification</span>
            </li>
          </ul>
        )}
        {tab === 'Languages' && (
          <ul className="langs">
            {languages.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong>
                <span>{l.level}</span>
              </li>
            ))}
          </ul>
        )}
        {tab === 'Beyond work' && (
          <div className="beyond">
            <p>Outside study and projects I design and make music.</p>
            <ul className="beyond-links">
              {profile.links
                .filter((l) => l.label === 'Behance' || l.label === 'Music')
                .map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      <span>{l.label === 'Music' ? 'Music, as Rhythmic Chaos' : 'Design work on Behance'}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </motion.div>
    </section>
  )
}
