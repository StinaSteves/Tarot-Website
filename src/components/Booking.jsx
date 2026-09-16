import { useState } from 'react'
import ContactMoon from './ContactMoon.jsx'
import contactArt from '../assets/img/contact-hand-moon.png'
import mountain from '../assets/img/Berg1.png'
import mountainMiddle from '../assets/img/Berg2.png'
import mountainBase from '../assets/img/Berg4.png'
import mountainBack from '../assets/img/Berg3.png'
import './Booking.css'

function ContactStar({ className }) {
  return <svg className={className} viewBox="0 0 60 100" fill="none" aria-hidden="true"><path d="M30 0v100M0 52h60" stroke="currentColor" strokeWidth=".6"/><path d="m30 32 3 16 13-10-10 13 20 2-20 2 10 13-13-10-3 17-3-17-13 10 10-13-20-2 20-2-10-13 13 10Z" fill="currentColor"/></svg>
}

export default function Booking() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const submitRequest = async event => {
    event.preventDefault()
    if (status === 'sending' || status === 'sent') return
    const form = new FormData(event.currentTarget)
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', topic: 'Allgemeines', name: form.get('name'), email: form.get('email'), message: form.get('message'), website: form.get('website') }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Die Nachricht konnte nicht gesendet werden.')
      setStatus('sent')
    } catch (cause) {
      setError(cause instanceof SyntaxError || cause instanceof TypeError ? 'Der Versand ist gerade nicht erreichbar. Bitte versuche es später erneut.' : cause.message)
      setStatus('error')
    }
  }

  return (
    <section id="termin-buchen" className="booking-section" aria-labelledby="booking-title">
      <p className="contact-eyebrow">Kontakt <span/></p>
      <div className="contact-art" aria-hidden="true">
        <div className="contact-art-scene">
          <img src={contactArt} alt="" loading="lazy"/>
          <svg className="contact-art-depth" viewBox="0 0 1024 1536" aria-hidden="true">
            <defs>
              <clipPath id="contact-ridge-crop"><path d="M0 0H696V770L1123 1025V1400H0Z"/></clipPath>
              <clipPath id="contact-forearm"><path d="M493 910Q470 964 481 1002Q442 1008 414 1045Q393 1090 412 1134L406 1173Q350 1204 355 1257Q347 1303 424 1342L368 1536H775Q783 1450 660 1373L639 1208Q662 1183 666 1154Q728 1102 699 1038L648 997L652 918Z"/></clipPath>
            </defs>
            <g transform="translate(-210 540) scale(.9)">
              <image href={mountain} width="1123" height="1400" clipPath="url(#contact-ridge-crop)"/>
              <image href={mountainMiddle} width="1123" height="1400"/>
              <image href={mountainBack} width="1123" height="1400"/>
              <image href={mountainBase} width="1123" height="1400"/>
            </g>
            <g transform="translate(650 980) scale(.48)">
              <image href={mountain} width="1123" height="1400" clipPath="url(#contact-ridge-crop)"/>
              <image href={mountainMiddle} width="1123" height="1400"/>
              <image href={mountainBack} width="1123" height="1400"/>
              <image href={mountainBase} width="1123" height="1400"/>
            </g>
            <image href={contactArt} width="1024" height="1536" clipPath="url(#contact-forearm)"/>
          </svg>
          <ContactMoon />
          <svg className="contact-fingertip" viewBox="0 0 1024 1536" aria-hidden="true">
            <defs><clipPath id="contact-fingertip-clip"><path d="M503 339Q517 331 525 340Q536 354 530 379L493 416 490 380Z"/></clipPath></defs>
            <image href={contactArt} width="1024" height="1536" clipPath="url(#contact-fingertip-clip)"/>
          </svg>
        </div>
        <span className="contact-art-caption">Worte<br/>sind auch<br/>Magie</span>
        <svg className="contact-phases" viewBox="0 0 28 260" fill="currentColor">
          <path d="M5 12a9 9 0 0 0 18 0q-9 10-18 0ZM5 48a9 9 0 0 0 18 0q-9 10-18 0Z"/>
          <circle cx="14" cy="93" r="9"/>
          <path d="M5 137a9 9 0 0 1 18 0q-9-10-18 0ZM5 173a9 9 0 0 1 18 0q-9-10-18 0Z"/>
          <path d="M14 208v52" stroke="currentColor" strokeWidth=".6"/>
        </svg>
        <ContactStar className="contact-art-star"/>
      </div>
      <div className="contact-content">
        <h2 id="booking-title">Was <em>führt</em><br/>dich hierher?</h2>
        <p className="contact-intro">Ob eine Frage, eine Buchung oder einfach<br/>ein Zeichen – ich freue mich, von dir zu hören.</p>
        <form className="contact-form" onSubmit={submitRequest}>
          <fieldset disabled={status === 'sending' || status === 'sent'}>
            <legend className="contact-sr-only">Thema und Nachricht</legend>
            <div className="contact-message-layout">
              <div className="contact-fields">
                <div className="contact-identity">
                  <label><span>Dein Name</span><input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label>
                  <label><span>Deine E-Mail</span><input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
                </div>
                <label className="contact-message"><span>Deine Nachricht</span><textarea name="message" required minLength={3} maxLength={2000}/></label>
                <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
              </div>
              <p className="contact-side-note">Manchmal<br/>beginnt alles<br/>mit einer<br/>Nachricht.</p>
              <button className="contact-submit" type="submit">{status === 'sending' ? 'Wird gesendet …' : status === 'sent' ? 'Nachricht gesendet' : 'Nachricht senden'}<span aria-hidden="true">⟶</span></button>
            </div>
          </fieldset>
          {status === 'error' && <p className="contact-feedback contact-error" role="alert">{error}</p>}
          {status === 'sent' && <p className="contact-feedback" role="status">Deine Nachricht wurde versendet. Ich melde mich per E-Mail bei dir.</p>}
        </form>
      </div>
      <aside className="contact-margin" aria-hidden="true"><p>Fragen<br/>Buchungen<br/>Rituale<br/>Ideen<br/>Kooperationen<br/>Sonstiges</p></aside>
    </section>
  )
}
