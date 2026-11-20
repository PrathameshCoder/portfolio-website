'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { cranberry, summaries } from '@/data/content'
import { ease } from '@/lib/motion'
import { ProjectHead, Summary } from './Project'

// Sample accounts for the demo's user list (illustrative).
const USERS = [
  { email: 'l.weber@fau.de', role: 'Employee', status: 'Active', mustChange: false },
  { email: 'm.schmidt@fau.de', role: 'HR', status: 'Active', mustChange: false },
  { email: 'new.hire@fau.de', role: 'Employee', status: 'Active', mustChange: true },
  { email: 'j.fischer@fau.de', role: 'Employee', status: 'Disabled', mustChange: false },
]

const IMPACT_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 }

// Same matching rule as the real search endpoint: title or summary contains the
// query (any case), or a tag equals it.
function search(entries, q) {
  const query = q.trim().toLowerCase()
  if (!query) return entries
  return entries.filter(
    (e) => e.title.toLowerCase().includes(query) || e.summary.toLowerCase().includes(query) || e.tags.includes(query)
  )
}

// A small working copy of the app: switch role, search the knowledge base, try the user admin.
function AppDemo({ role, setRole }) {
  const [view, setView] = useState('knowledge')
  const [q, setQ] = useState('')
  const results = useMemo(
    () => search(cranberry.entries, q).sort((a, b) => IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact]),
    [q]
  )
  const canManage = role !== 'Employee'

  return (
    <div className="app">
      <div className="app-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>cranberry / {view === 'knowledge' ? 'dashboard' : 'admin/users'}</span>
      </div>
      <div className="app-body">
        <aside className="app-side">
          <p className="app-brand">Cranberry</p>
          <div className="app-role" role="radiogroup" aria-label="Signed in as">
            <span className="app-side-label">Signed in as</span>
            {cranberry.roles.map((r) => (
              <button key={r} type="button" role="radio" aria-checked={role === r} className={role === r ? 'is-on' : ''} onClick={() => setRole(r)}>
                {r}
              </button>
            ))}
          </div>
          <nav className="app-nav" aria-label="Demo sections">
            <button type="button" className={view === 'knowledge' ? 'is-on' : ''} onClick={() => setView('knowledge')}>
              Knowledge
            </button>
            <button type="button" className={view === 'users' ? 'is-on' : ''} onClick={() => setView('users')}>
              Users {!canManage && <span className="app-lock">locked</span>}
            </button>
          </nav>
        </aside>

        <div className="app-main">
          <AnimatePresence mode="wait">
            {view === 'knowledge' ? (
              <motion.div key="k" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <label className="app-search">
                  <span className="sr-only">Search the knowledge base</span>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, summaries or a tag, like process" />
                </label>
                <p className="app-count">
                  {results.length} {results.length === 1 ? 'entry' : 'entries'}
                </p>
                <ul className="app-list">
                  <AnimatePresence initial={false}>
                    {results.map((e) => (
                      <motion.li
                        key={e.title}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease }}
                      >
                        <div className="app-item-top">
                          <strong>{e.title}</strong>
                          <span className={`impact impact-${e.impact.toLowerCase()}`}>{e.impact.toLowerCase()}</span>
                        </div>
                        <p>{e.summary}</p>
                        <p className="app-tags">
                          {e.tags.map((t) => (
                            <button key={t} type="button" onClick={() => setQ(t)}>
                              #{t}
                            </button>
                          ))}
                          <span>by {e.author}</span>
                        </p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                {results.length === 0 && <p className="app-empty">Nothing matches. Try a tag such as hr, it or process.</p>}
              </motion.div>
            ) : canManage ? (
              <motion.div key="u" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <p className="app-count">Accounts, visible to HR and Admin</p>
                <table className="app-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u) => (
                      <tr key={u.email} className={u.status === 'Disabled' ? 'is-off' : ''}>
                        <td>
                          {u.email}
                          {u.mustChange && <span className="app-flag">must change password</span>}
                        </td>
                        <td>{u.role}</td>
                        <td>{u.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div key="f" className="app-403" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <span className="app-403-code">403</span>
                <p>
                  Forbidden. User management is limited to HR and Admin, and the API refuses the request even if the page is
                  reached.
                </p>
                <button type="button" className="btn btn-ghost" onClick={() => setRole('HR')}>
                  Sign in as HR
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// The six checks between the login form and the dashboard, lit one after another.
function SignInStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '0px 0px -15% 0px' })
  const [step, setStep] = useState(0)
  const steps = cranberry.flow

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 1600)
    return () => clearInterval(t)
  }, [inView, steps.length])

  return (
    <div className="strip" ref={ref}>
      <p className="label">Under the hood: every sign-in passes six checks</p>
      <ol className="strip-steps">
        {steps.map((s, i) => (
          <li key={s.name}>
            <button type="button" className={`strip-step ${i === step ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`} onClick={() => setStep(i)} aria-pressed={i === step}>
              <span className="strip-n">{i + 1}</span>
              {s.name}
            </button>
          </li>
        ))}
      </ol>
      <p className="strip-detail" aria-live="polite">
        {steps[step].detail}
      </p>
    </div>
  )
}

export default function CranberryChapter() {
  const [role, setRole] = useState('Employee')

  return (
    <section id="cranberry" className="project" data-label="Cranberry">
      <ProjectHead n="02" kicker="Cranberry, FAU Designing Technology" title="A knowledge hub with roles" period={cranberry.period} stack={cranberry.stack} />
      <div className="proj-body">
        <div>
          <Summary s={summaries.cranberry} />
          <a className="text-link" href={cranberry.href} target="_blank" rel="noopener noreferrer">
            Read the code on GitHub
          </a>
        </div>
        <div className="demo-wrap">
          <p className="label">Try it: search, then open Users as an employee and as HR</p>
          <AppDemo role={role} setRole={setRole} />
          <SignInStrip />
        </div>
      </div>
    </section>
  )
}
