'use client'

import { useState } from 'react'
import { projects, summaries } from '@/data/content'
import { Reveal, SplitLetters } from './Split'
import { Summary } from './Project'

// DocuMind's five stages. Picking one explains it.
function Pipeline({ steps }) {
  const [active, setActive] = useState(2)
  return (
    <div className="pipe">
      <p className="label">How a question is answered</p>
      <ol className="pipe-steps">
        {steps.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              className={`pipe-step ${i < active ? 'is-past' : ''} ${i === active ? 'is-on' : ''}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="pipe-index">{i + 1}</span>
              {s.name}
            </button>
          </li>
        ))}
      </ol>
      <p className="pipe-detail" aria-live="polite">
        {steps[active].detail}
      </p>
    </div>
  )
}

// How the agent setup fits together. Picking a part explains it.
const AGENT_PARTS = [
  { name: 'Hermes agent', note: 'Runs the recurring job search on a schedule.' },
  { name: 'Qwen', note: 'A local AI model, running on my own hardware instead of a paid API.' },
  { name: 'Old laptop', note: 'Turned into a remote machine and reached from anywhere over Tailscale.' },
  { name: 'Telegram bot', note: 'Where the results arrive, on my phone, without opening anything.' },
]

function AgentParts() {
  const [active, setActive] = useState(0)
  return (
    <div className="pipe">
      <p className="label">How the pieces connect</p>
      <ol className="pipe-steps pipe-steps-4">
        {AGENT_PARTS.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              className={`pipe-step ${i < active ? 'is-past' : ''} ${i === active ? 'is-on' : ''}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="pipe-index">{i + 1}</span>
              {p.name}
            </button>
          </li>
        ))}
      </ol>
      <p className="pipe-detail" aria-live="polite">
        {AGENT_PARTS[active].note}
      </p>
    </div>
  )
}

function AiCard({ p, n }) {
  return (
    <Reveal as="div" className="aicard" y={30}>
      <article>
        <p className="proj-kicker">
          <span className="proj-n">{n}</span>
          <span>{p.kind}</span>
          <span className="proj-period">{p.year}</span>
        </p>
        <h3 className="aicard-title">{p.title}</h3>
        <ul className="chips proj-stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <Summary s={summaries[p.id]} />
        {p.pipeline ? <Pipeline steps={p.pipeline} /> : <AgentParts />}
        {p.href && (
          <a className="text-link" href={p.href} target="_blank" rel="noopener noreferrer">
            {p.linkLabel}
          </a>
        )}
      </article>
    </Reveal>
  )
}

export function AiWork() {
  return (
    <section id="ai" className="project" data-label="AI work">
      <header className="proj-head">
        <h2 className="proj-title">
          <SplitLetters text="AI builds" />
        </h2>
        <Reveal as="p" className="proj-lead" delay={0.1}>
          Small, complete tools, each built end to end and tested against a real use.
        </Reveal>
      </header>
      <div className="aicards">
        {projects.map((p, i) => (
          <AiCard key={p.id} p={p} n={String(i + 3).padStart(2, '0')} />
        ))}
      </div>
    </section>
  )
}
