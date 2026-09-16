import { useState } from 'react'
import mountain1 from '../assets/img/Berg1.png'
import mountain3 from '../assets/img/Berg3.png'
import mountain4 from '../assets/img/Berg4.png'
import './Footer.css'

const socialNames = ['Instagram', 'Pinterest', 'TikTok', 'YouTube']
function SocialIcon({ name }) {
  if (name === 'Instagram') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg>
  if (name === 'Pinterest') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M9 21l3-14m-1 8c7 3 9-8 3-9-7-1-9 8-5 10" fill="none" stroke="#171717" strokeWidth="2"/></svg>
  if (name === 'TikTok') return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 3v13a4 4 0 1 1-4-4M14 3c0 4 3 6 6 6" stroke="currentColor" strokeWidth="3"/></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 6 3-6 3Z" fill="#171717"/></svg>
}

export default function Footer() {
  const [notice, setNotice] = useState('')
  const pending = name => setNotice(`${name} wird noch ergänzt.`)
  return (
    <footer className="site-footer" aria-label="Seitenabschluss">
      <svg className="footer-landscape" viewBox="0 0 1440 650" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id="footer-mountain-crop"><path d="M0 0H696V770L1123 1025V1400H0Z"/></clipPath>
          <clipPath id="footer-wave"><path d="M0 285C180 280 220 325 580 315S1100 190 1440 280V650H0Z"/></clipPath>
          <linearGradient id="footer-depth" x2="0" y2="1">
            <stop stopColor="#111111" stopOpacity="0"/>
            <stop offset=".65" stopColor="#111111" stopOpacity=".7"/>
          </linearGradient>
        </defs>
        <g clipPath="url(#footer-wave)">
          <path d="M0 0H1440V650H0Z" fill="#171719"/>
          <svg x="0" y="165" width="1440" height="485" viewBox="0 959 913 441" preserveAspectRatio="xMidYMid slice">
            <image href={mountain4} width="1123" height="1400"/>
          </svg>
          <svg x="650" y="230" width="790" height="420" viewBox="299 953 824 447" preserveAspectRatio="xMidYMid slice">
            <image href={mountain3} width="1123" height="1400"/>
          </svg>
          <path d="M0 0H1440V650H0Z" fill="url(#footer-depth)"/>
        </g>
        <g transform="translate(-360 -475) scale(.94)">
          <image href={mountain1} width="1123" height="1400" clipPath="url(#footer-mountain-crop)"/>
        </g>
      </svg>
      <div className="footer-shade" aria-hidden="true"/>
      <div className="footer-brand">
        <a className="footer-logo" href="#home" aria-label="NYX – zurück zum Anfang">NYX</a>
        <p className="footer-tagline">Rituale. Wissen. Wandel.</p>
        <div className="footer-socials" aria-label="Social Media – Links folgen">
          {socialNames.map(name => <button type="button" key={name} aria-label={`${name} – Link folgt`} title={`${name} – Link folgt`} onClick={() => pending(name)}><SocialIcon name={name}/></button>)}
        </div>
        <p className="footer-follow">Follow the signs</p>
      </div>
      <nav className="footer-nav" aria-label="Footer-Navigation">
        <a href="#home">Home</a>
        <button type="button" onClick={() => pending('Über mich')}>Über mich</button>
        <a href="#services">Services</a>
        <a href="#rituale">Rituale</a>
        <a href="#termin-buchen">Kontakt</a>
        <button type="button" onClick={() => pending('FAQ')}>FAQ</button>
      </nav>
      <div className="footer-newsletter">
        <h2>Newsletter</h2>
        <p>Erhalte Inspiration, Mondzyklen und<br className="footer-linebreak"/> neue Ritualanleitungen direkt in dein Postfach.</p>
        <form onSubmit={event => { event.preventDefault(); setNotice('Der Newsletter startet bald. Deine E-Mail-Adresse wurde noch nicht gespeichert.') }}>
          <label htmlFor="footer-email" className="footer-sr-only">Deine E-Mail-Adresse für den Newsletter</label>
          <input id="footer-email" type="email" name="email" autoComplete="email" placeholder="Deine E-Mail" required aria-describedby="newsletter-preview"/>
          <button type="submit" aria-label="Newsletter-Vorschau"><span aria-hidden="true">⟶</span></button>
        </form>
        <span id="newsletter-preview" className="footer-preview">Newsletter startet bald</span>
        <nav className="footer-legal" aria-label="Rechtliche Informationen">
          {['Datenschutz', 'Impressum', 'AGB'].map(name => <button key={name} type="button" onClick={() => pending(name)}>{name}</button>)}
        </nav>
        {notice && <p className="footer-notice" role="status">{notice}</p>}
      </div>
      <div className="footer-celestial" aria-hidden="true">
        <svg className="footer-star" viewBox="0 0 50 160" fill="none"><path d="M25 0v160M0 78h50" stroke="currentColor" strokeWidth=".5"/><path d="m25 58 2 17 13-10-10 12 19 2-19 2 10 12-13-10-2 18-2-18-13 10 10-12L1 79l19-2-10-12 13 10Z" fill="currentColor"/></svg>
        <p>Somewhere<br/>between<br/>worlds</p>
      </div>
    </footer>
  )
}
