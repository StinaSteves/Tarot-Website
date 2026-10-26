import ritualsBackground from '../assets/img/ritualsBG.png'
import marbleSkull from '../assets/img/marmorSkull.png'
import RitualEye from './RitualEye.jsx'
import RitualInventory from './RitualInventory.jsx'
import './Rituals.css'

// Generate once so a rerender keeps the existing dust positions.
const dustParticles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 80,
  delay: -Math.random() * 35,
  duration: 20 + Math.random() * 15,
  size: 4 + Math.random() * 6,
  softness: 0.4 + Math.random() * 1.1,
  opacity: 0.25 + Math.random() * 0.35,
  stretch: 0.65 + Math.random() * 0.55,
  driftX: 12 + Math.random() * 24,
  driftY: 8 + Math.random() * 16,
}))

const fineDustParticles = Array.from({ length: 16 }, (_, i) => ({
  id: `fine-${i}`,
  sharp: true,
  left: Math.random() * 100,
  top: Math.random() * 90,
  delay: -Math.random() * 50,
  duration: 35 + Math.random() * 20,
  size: 1 + Math.random() * 1.2,
  softness: 0,
  opacity: 0.22 + Math.random() * 0.28,
  stretch: 1,
  driftX: 5 + Math.random() * 10,
  driftY: 3 + Math.random() * 7,
}))

const layeredDustParticles = [...dustParticles, ...fineDustParticles]

function Rituals() {
  return (
    <section id="rituale" className="ritual-section" aria-labelledby="ritual-title">
      <img
        className="ritual-stag-background"
        src={ritualsBackground}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="ritual-skull-stage">
        <div className="ritual-skull-frame">
          <img className="ritual-marble-skull" src={marbleSkull} alt="Marmorhirsch mit ausladendem Geweih" loading="lazy" draggable={false} />
          <RitualEye />
        </div>
      </div>

      {/* Dust particles background */}
      <div className="ritual-dust-particles" aria-hidden="true">
        {layeredDustParticles.map((particle) => (
          <div
            key={particle.id}
            className={`dust-particle${particle.sharp ? ' dust-particle-sharp' : ''}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size * particle.stretch}px`,
              '--dust-softness': `${particle.softness}px`,
              '--dust-opacity': particle.opacity,
              '--dust-x': `${particle.driftX}px`,
              '--dust-y': `${particle.driftY}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <svg className="ritual-moon-phases" viewBox="0 0 40 252" fill="none" aria-hidden="true">
        <defs>
          <mask id="ritual-crescent-thin" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="30">
            <rect width="40" height="30" fill="white" /><circle cx="20" cy="7" r="10" fill="black" />
          </mask>
          <mask id="ritual-crescent-wide" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="30">
            <rect width="40" height="30" fill="white" /><circle cx="20" cy="5" r="10" fill="black" />
          </mask>
        </defs>
        <g fill="currentColor">
          <circle cx="20" cy="12" r="10" mask="url(#ritual-crescent-thin)" />
          <g transform="translate(0 38)"><circle cx="20" cy="12" r="10" mask="url(#ritual-crescent-wide)" /></g>
          <g transform="translate(0 76)"><circle cx="20" cy="12" r="10" mask="url(#ritual-crescent-wide)" /></g>
          <circle cx="20" cy="126" r="10" />
          <g transform="translate(0 176) scale(1 -1)"><circle cx="20" cy="12" r="10" mask="url(#ritual-crescent-wide)" /></g>
          <g transform="translate(0 214) scale(1 -1)"><circle cx="20" cy="12" r="10" mask="url(#ritual-crescent-thin)" /></g>
          <g transform="translate(0 252) scale(1 -1)"><circle cx="20" cy="12" r="10" mask="url(#ritual-crescent-thin)" /></g>
        </g>
      </svg>

      <div className="ritual-copy">
        <p className="ritual-kicker">Rituale &amp; Spells</p>
        <h2 id="ritual-title"><span>Magie</span><span>im Alltag</span></h2>
        <p className="ritual-description">
          <span>Rituale sind mehr als alte Traditionen –</span>{' '}
          <span>sie sind Werkzeuge, um Intentionen zu</span>{' '}
          <span>setzen, Energie zu lenken und dein</span>{' '}
          <span>Leben bewusst zu gestalten.</span>
        </p>
        <RitualInventory />
      </div>

      <svg className="ritual-solitary-star" viewBox="0 0 40 112" fill="none" aria-hidden="true">
        <path d="M20 0V112" stroke="currentColor" strokeWidth=".5" opacity=".4" />
        <path d="M20 33l1.5 13 8-6-6 8 13 1.5-13 1.5 6 8-8-6-1.5 13-1.5-13-8 6 6-8-13-1.5 13-1.5-6-8 8 6Z" fill="currentColor" opacity=".65" />
      </svg>
      <svg className="ritual-corner-lines" viewBox="0 0 48 42" fill="none" aria-hidden="true">
        <path d="M3 9V42M37 14V42" stroke="currentColor" strokeWidth=".65" opacity=".65" />
        <circle cx="37" cy="7" r="1.1" fill="currentColor" />
      </svg>
      <svg className="ritual-bottom-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 75C330 15 520 110 900 64S1250 7 1440 26V100H0Z" />
      </svg>
    </section>
  )
}

export default Rituals
