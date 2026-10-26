import { ritualOffers } from '../data/ritualOffers.js'
import { readings } from '../data/readings.js'
import cardBack from '../assets/img/cardBack.png'
import magicianCard from '../assets/img/magierCard.png'
import candle from '../assets/img/ritual-candle.png'
import CandleFlame from './CandleFlame.jsx'
import TarotParticles from './TarotParticles.jsx'
import './Pricing.css'

export default function Pricing({ onSelect }) {
  return <section id="preise" className="pricing-section" aria-labelledby="pricing-title">
    <TarotParticles clipToTarot={false} className="pricing-particles" />
    <div className="pricing-story">
      <p className="pricing-eyebrow">Angebote & Preise <span aria-hidden="true" /></p>
      <h2 id="pricing-title">Zeit für<br/><em>deinen Weg.</em></h2>
      <p className="pricing-intro">Eine Legung, ein Ritual, ein persönlicher Begleiter.<br/>Finde, was zu dir und deinem Anliegen passt.</p>
      <div className="pricing-art">
        <svg className="pricing-orbit" viewBox="0 0 600 520" fill="none" aria-hidden="true">
          <ellipse cx="300" cy="266" rx="234" ry="175" transform="rotate(-28 300 266)" stroke="currentColor" strokeWidth=".7"/>
          <ellipse cx="300" cy="266" rx="218" ry="160" transform="rotate(-28 300 266)" stroke="currentColor" strokeWidth=".4"/>
          <path d="M76 90v110M21 145h110m-55-23 3 20 17-12-13 17 20 3-20 3 13 17-17-12-3 20-3-20-17 12 13-17-20-3 20-3-13-17 17 12Z" stroke="currentColor" strokeWidth=".7"/>
          <circle cx="519" cy="359" r="4" fill="currentColor"/>
          <path d="M489 384v92m-15-46h30" stroke="currentColor" strokeWidth=".7"/>
        </svg>
        {[0, 1].map(index => <img key={index} className={`pricing-tarot-card pricing-tarot-card--${index + 1}`} src={cardBack} alt="" loading="lazy" draggable={false} width="687" height="1024"/>)}
        <div
          className="pricing-tarot-card pricing-tarot-card--3 pricing-card-flip"
          aria-hidden="true"
        >
          <span className="pricing-card-flip-inner">
            <img className="pricing-card-face pricing-card-reverse" src={cardBack} alt="" loading="lazy" draggable={false} width="687" height="1024" />
            <img className="pricing-card-face pricing-card-magician" src={magicianCard} alt="" loading="lazy" draggable={false} width="1024" height="1536" />
          </span>
        </div>
        <span className="pricing-art-caption">Intuition · Begegnung · Klarheit</span>
      </div>
    </div>
    <div className="pricing-offers">
      <p className="pricing-list-heading"><span>Tarot-Kartenlegungen</span><span>Zeit & Preis</span></p>
      {readings.map((reading, index) => <article className="pricing-reading" key={reading.id} aria-labelledby={`reading-${reading.id}`}>
        <div className="pricing-reading-copy">
          <p className="pricing-duration"><span aria-hidden="true">0{index + 1} / </span>{reading.minutes} Minuten</p>
          <h3 id={`reading-${reading.id}`}>{reading.name}</h3>
          <p className="pricing-description">{reading.description}</p>
          <a className="pricing-request" href="#termin-buchen" onClick={() => onSelect(reading)} aria-label={`${reading.name}: ${reading.minutes} Minuten für ${reading.price} Euro anfragen`}>Legung anfragen <svg viewBox="0 0 36 16" fill="none" aria-hidden="true"><path d="M1 8h32M26 1l7 7-7 7" stroke="currentColor" strokeWidth=".8"/></svg></a>
        </div>
        <p className="pricing-amount"><span>{reading.price}<span className="pricing-currency"> €</span></span><span className="pricing-unit">pro Sitzung</span></p>
      </article>)}
      <p className="pricing-note">Deine Anfrage ist unverbindlich.<br/>Termin und Ablauf klären wir persönlich.</p>
    </div>
    <div id="ritual-preise" className="pricing-ritual-block">
    <div className="pricing-story pricing-ritual-story">
      <p className="pricing-eyebrow">Rituale & Talismane <span aria-hidden="true" /></p>
      <h2>Deine Intention.<br/><em>Dein Ritual.</em></h2>
      <p className="pricing-intro">Für das, was du loslassen, einladen<br/>oder bewusst begleiten möchtest.</p>
      <p className="pricing-ritual-note">Jedes Ritual entsteht für dein persönliches Anliegen – als Anleitung für dich oder von mir durchgeführt.</p>

    </div>
    <div className="pricing-offers pricing-ritual-offers">
      <p className="pricing-list-heading"><span>Persönlich für dich</span><span>Preis</span></p>
      {ritualOffers.map((offer, index) => <article className="pricing-reading" key={offer.id} aria-labelledby={`offer-${offer.id}`}>
        <div className="pricing-reading-copy">
          <p className="pricing-duration"><span aria-hidden="true">0{index + 1} / </span>{offer.format}</p>
          <h3 id={`offer-${offer.id}`}>{offer.name}</h3>
          <p className="pricing-description">{offer.description}</p>
          <a className="pricing-request" href="#termin-buchen" onClick={() => onSelect(offer)} aria-label={`${offer.name}: ${offer.from ? 'ab ' : ''}${offer.price} Euro anfragen`}>{offer.action} <svg viewBox="0 0 36 16" fill="none" aria-hidden="true"><path d="M1 8h32M26 1l7 7-7 7" stroke="currentColor" strokeWidth=".8"/></svg></a>
        </div>
        <p className="pricing-amount"><span>{offer.from && <small className="pricing-from">ab </small>}{offer.price}<span className="pricing-currency"> €</span></span><span className="pricing-unit">{offer.unit}</span></p>
      </article>)}
      <p className="pricing-note">Auch hier beginnt alles mit einer unverbindlichen Anfrage.<br/>Dein Anliegen und den genauen Umfang besprechen wir persönlich.</p>
    </div>
    <div className="pricing-candle" aria-hidden="true">
      <img src={candle} alt="" width="1024" height="1536" loading="lazy" />
      <CandleFlame />
    </div>
    </div>
    <svg className="pricing-bottom" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M0 75C330 15 520 110 900 64S1250 7 1440 26V100H0Z" fill="#dfdeda"/></svg>
  </section>
}
