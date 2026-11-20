'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
      website: form.get('website'),
    }

    try {
      setStatus('loading')
      setMessage('')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'The server did not accept the message.')
      setStatus('success')
      setMessage('Message sent. I will reply by email.')
      formEl.reset()
    } catch (err) {
      setStatus('error')
      setMessage(`Message not sent. ${err.message} You can also email me directly.`)
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      {/* Honeypot field, hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

      <label className="field">
        <span>Name</span>
        <input type="text" name="name" autoComplete="name" maxLength={100} required />
      </label>
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label className="field field-wide">
        <span>Message</span>
        <textarea name="message" rows={5} minLength={5} maxLength={5000} required />
      </label>

      <div className="cform-footer">
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending message' : 'Send message'}
        </button>
        {message && (
          <p role="status" className={status === 'success' ? 'form-ok' : 'form-error'}>
            {message}
          </p>
        )}
      </div>
    </form>
  )
}
