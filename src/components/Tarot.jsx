import TarotCard from '../assets/img/TarotCard.png'
import TarotParticles from './TarotParticles.jsx'
import { TAROT_SHAPE_HEIGHT, TAROT_SHAPE_PATH, TAROT_SHAPE_WIDTH } from './tarotShape.js'
import '../App.css'

function Tarot() {
  return (
    <section className="tarot-section">

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

      <div className="tarot-visual">

        <div className="tarot-outline tarot-outline-top" />
        <div className="tarot-orange-block" />
        <div className="tarot-black-block" />

        <img
          src={TarotCard}
          alt="Tarotkarte Der Gehängte"
          className="tarot-card"
        />

        <div className="tarot-booking">
          <button
            type="button"
            className="hero-cta-button"
          >
            JETZT BUCHEN
          </button>
        </div>

      </div>


      <div className="tarot-content">

        <p className="tarot-kicker">
          Legungen
        </p>

        <h2>
          Ein Blick in die Zukunft
        </h2>

        <span className="tarot-divider" />

        <p className="tarot-description">
         Buchen sie eine legung bla bla bla
        </p>

        <span className="tarot-small-line" />

      </div>

    </section>
  )
}

export default Tarot
