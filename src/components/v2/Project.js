'use client'

import { Reveal, SplitLetters } from './Split'

// The header every project shares: number, title, when, and the tools.
export function ProjectHead({ n, kicker, title, period, stack }) {
  return (
    <header className="proj-head">
      <Reveal className="proj-kicker">
        <span className="proj-n">{n}</span>
        <span>{kicker}</span>
        <span className="proj-period">{period}</span>
      </Reveal>
      <h2 className="proj-title">
        <SplitLetters text={title} />
      </h2>
      {stack && (
        <Reveal as="ul" className="chips proj-stack" delay={0.1}>
          {stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </Reveal>
      )}
    </header>
  )
}

// The one-minute read: what the project was, what I did, what came out of it.
export function Summary({ s }) {
  return (
    <dl className="summary">
      <Reveal>
        <dt>The project</dt>
        <dd>{s.brief}</dd>
      </Reveal>
      <Reveal delay={0.06}>
        <dt>What I did</dt>
        <dd>{s.did}</dd>
      </Reveal>
      <Reveal delay={0.12}>
        <dt>Outcome</dt>
        <dd>
          <ul className="outcomes">
            {s.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </dd>
      </Reveal>
    </dl>
  )
}
