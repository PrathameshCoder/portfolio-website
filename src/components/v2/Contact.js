'use client'

import { contacts, profile } from '@/data/content'
import { scrollToId } from '@/lib/smooth'
import ContactForm from '../ContactForm'
import { Reveal, SplitLetters } from './Split'

export default function Contact() {
  return (
    <section id="contact" className="contact" data-label="Contact">
      <div className="contact-head">
        <Reveal className="label">Working student roles in AI, digitalisation or software</Reveal>
        <h2 className="display-xl">
          <SplitLetters text="let’s connect" />
          <span className="accent">.</span>
        </h2>
      </div>
      <ul className="contact-list">
        {contacts.map((c, i) => (
          <Reveal as="li" key={c.label} delay={i * 0.06}>
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              <span className="cl-label">{c.label}</span>
              <span className="cl-value">{c.value}</span>
              <span className="cl-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      <div className="contact-form">
        <h3 className="h3">Or leave a message here</h3>
        <ContactForm />
      </div>
      <footer className="footer">
        <span>© 2026 {profile.name}</span>
        <span>{profile.location}</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
        >
          Back to top
        </a>
      </footer>
    </section>
  )
}
