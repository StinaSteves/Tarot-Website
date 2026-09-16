import TarotCard from '../assets/img/hangedmenCard.png'
import BackCard from '../assets/img/cardBack.png'
import TarotParticles from './TarotParticles.jsx'
import TarotCollage from './TarotCollage.jsx'
import { TAROT_SHAPE_HEIGHT, TAROT_SHAPE_PATH, TAROT_SHAPE_WIDTH } from './tarotShape.js'
import './Tarot.css'

function Tarot() {
  return (
    <section id="services" className="tarot-section" aria-labelledby="tarot-title">

      <svg
        className="tarot-transition"
        viewBox={`0 0 ${TAROT_SHAPE_WIDTH} ${TAROT_SHAPE_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={TAROT_SHAPE_PATH} />
      </svg>

      <TarotParticles />

      <svg
        className="tarot-bottom-sweep"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 0 400 C 420 215 1060 240 1440 0 L 1440 400 Z" />
      </svg>

      <div className="tarot-visual">

        <TarotCollage />

        <div className="tarot-card-flip">
          <div className="tarot-card-flip-inner">

            <img
              src={TarotCard}
              alt="Tarotkarte Der Gehängte"
              className="tarot-card tarot-card-front"
            />

            <img
              src={BackCard}
              alt=""
              aria-hidden="true"
              className="tarot-card tarot-card-back"
            />

          </div>
        </div>

      </div>


      <div className="tarot-content">

        <p className="tarot-kicker">
          Legungen
        </p>

        <h2 id="tarot-title">
          <span>Ein Blick</span>
          <span>in die Zukunft</span>
        </h2>

        <p className="tarot-description">
          Tarot zeigt keine festen Wege, sondern Möglichkeiten. Erkenne, was ist,
          was kommen kann – und was du verändern darfst.
        </p>

        <button
          type="button"
          className="hero-cta-button tarot-booking-button"
          onClick={() => document.getElementById('termin-buchen')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
        >
          <span>JETZT BUCHEN</span>

          <svg viewBox="0 0 36 16" fill="none" aria-hidden="true">
            <path d="M1 8h32M26 1l7 7-7 7" />
          </svg>
        </button>

      </div>

      <aside
        className="tarot-time-ornament"
        aria-label="Vergangenheit, Gegenwart, Zukunft"
      >
        <svg viewBox="0 0 80 300" fill="none" aria-hidden="true">
          <path
            d="M40 0v300"
            stroke="currentColor"
            strokeWidth="0.7"
          />

          <path
            d="M40 166l3 34 16-15-13 19 34 3-34 3 13 19-16-15-3 34-3-34-16 15 13-19-34-3 34-3-13-19 16 15Z"
            fill="currentColor"
          />
        </svg>

        <span>Vergangenheit</span>
        <span>Gegenwart</span>
        <span>Zukunft</span>
      </aside>

    </section>
  )
}

export default Tarot