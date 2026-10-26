import { useEffect, useRef, useState } from 'react'
import Nav from './components/Nav.jsx'
import Tarot from './components/Tarot.jsx'
import Pricing from './components/Pricing.jsx'
import Rituals from './components/Rituals.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'
import HeroFog from './components/HeroFog.jsx'
import './App.css'

import Hekate from './assets/img/Hekate.png'
import Hunde from './assets/img/Hunde.png'
import Heiligenschein from './assets/img/newHalo.png'
import Berg1 from './assets/img/Berg1.png'
import Berg2 from './assets/img/Berg2.png'
import Berg3 from './assets/img/Berg3.png'
import Berg4 from './assets/img/Berg4.png'
import NeuBG from './assets/img/layerNeu.png'

// All four exports share a canvas; keep their framing identical.
const mountains = [Berg1, Berg2, Berg3, Berg4]
// Keep the back ridge's gentle drift, while the front ridges stay nearly
// anchored to the scene: 28.8px vs 3.2px extra movement per 100px of scrolling.
const mountainScrollOffsets = [0.72, 0.08, 0.04, 0]
const landscapeScrollStrength = 0.4

function App() {
  const [selectedReading, setSelectedReading] = useState(null)
  useEffect(() => {
    // React mounts after the browser's initial anchor lookup on page navigation.
    const target = document.getElementById(window.location.hash.slice(1))
    if (!target) return
    const frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])

  const landingRef = useRef(null)
  const mountainRefs = useRef([])
  const cloudRefs = useRef([])

  const hekateRef =
    useRef(null)

  const heiligenscheinRef =
    useRef(null)

  const hundeRef =
    useRef(null)

  const targetX =
    useRef(0)

  const targetY =
    useRef(0)

  const currentHekateX =
    useRef(0)

  const currentHeiligenscheinX =
    useRef(0)

  const currentHundeX =
    useRef(0)

  const currentHundeY =
    useRef(0)

  useEffect(() => {
    const landing = landingRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame

    const updateMountains = () => {
      frame = undefined
      const { top } = landing.getBoundingClientRect()
      const height = landing.querySelector('.mountain-scene').clientHeight
      const distance = Math.max(0, Math.min(-top, height)) * landscapeScrollStrength

      mountainRefs.current.forEach((layer, index) => {
        if (!layer) return
        layer.style.transform = reducedMotion.matches
          ? 'none'
          : `translate3d(0, ${distance * mountainScrollOffsets[index]}px, 0)`
      })
      cloudRefs.current.forEach((layer, index) => {
        if (!layer) return
        layer.style.transform = reducedMotion.matches
          ? 'none'
          : `translate3d(0, ${distance * (index === 0 ? 0.56 : 0.32)}px, 0)`
      })
    }

    const scheduleUpdate = () => {
      if (frame === undefined) frame = requestAnimationFrame(updateMountains)
    }

    updateMountains()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotion.addEventListener('change', scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotion.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  useEffect(() => {
    let animationFrame
    let previousTime
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let hundeVelocityX = 0
    let hundeVelocityY = 0

    const animate = (
      timestamp
    ) => {
      const delta =
        previousTime === undefined
          ? 1 / 60
          : Math.min(
              (
                timestamp -
                previousTime
              ) /
                1000,
              0.05
            )

      previousTime =
        timestamp

      currentHekateX.current +=
        (
          targetX.current -
          currentHekateX.current
        ) *
        (
          1 -
          Math.pow(
            1 - 0.075,
            delta * 60
          )
        )

      currentHeiligenscheinX.current +=
        (
          targetX.current -
          currentHeiligenscheinX.current
        ) *
        (
          1 -
          Math.pow(
            1 - 0.045,
            delta * 60
          )
        )

      const hundeTargetX =
        Math.max(
          -1,
          Math.min(
            1,
            targetX.current *
              1.6
          )
        )

      const spring =
        3.2

      const damping =
        2.4

      hundeVelocityX +=
        (
          (
            hundeTargetX -
            currentHundeX.current
          ) *
            spring -
          hundeVelocityX *
            damping
        ) *
        delta

      hundeVelocityY +=
        (
          (
            targetY.current -
            currentHundeY.current
          ) *
            spring -
          hundeVelocityY *
            damping
        ) *
        delta

      currentHundeX.current +=
        hundeVelocityX *
        delta

      currentHundeY.current +=
        hundeVelocityY *
        delta

      const x =
        currentHekateX.current

      if (
        heiligenscheinRef.current
      ) {
        heiligenscheinRef.current.style.transform = `
          translateX(${currentHeiligenscheinX.current * 2.5}px)
          rotateY(${currentHeiligenscheinX.current * 0.8}deg)
        `
      }

      if (
        hekateRef.current
      ) {
        hekateRef.current.style.transform = `
          translateX(${x * 5}px)
          rotateY(${x * 1.2}deg)
        `
      }

      if (
        hundeRef.current
      ) {
        const hundeX =
          Math.max(
            -4,
            Math.min(
              4,
              currentHundeX.current *
                -3
            )
          )

        const hundeY =
          Math.max(
            -2,
            Math.min(
              2,
              currentHundeY.current *
                -1.5
            )
          )

        const hundeRotation =
          Math.max(
            -0.15,
            Math.min(
              0.15,
              currentHundeX.current *
                -0.1
            )
          )

        hundeRef.current.style.transform = `
          translateX(${hundeX}px)
          translateY(${hundeY}px)
          rotateY(${hundeRotation}deg)
        `
      }

      animationFrame =
        requestAnimationFrame(
          animate
        )
    }

    const syncAnimation = () => {
      cancelAnimationFrame(animationFrame)
      previousTime = undefined

      if (reducedMotion.matches) {
        currentHekateX.current = 0
        currentHeiligenscheinX.current = 0
        currentHundeX.current = 0
        currentHundeY.current = 0
        hundeVelocityX = 0
        hundeVelocityY = 0
        for (const element of [hekateRef.current, heiligenscheinRef.current, hundeRef.current]) {
          if (element) element.style.transform = 'none'
        }
      } else if (!document.hidden) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    syncAnimation()
    reducedMotion.addEventListener('change', syncAnimation)
    document.addEventListener('visibilitychange', syncAnimation)

    return () => {
      cancelAnimationFrame(animationFrame)
      reducedMotion.removeEventListener('change', syncAnimation)
      document.removeEventListener('visibilitychange', syncAnimation)
    }
  }, [])

  const handlePointerMove =
    (event) => {
      const rect =
        event.currentTarget
          .getBoundingClientRect()

      targetX.current =
        (
          (
            event.clientX -
            rect.left
          ) /
            rect.width -
          0.5
        ) *
        2

      targetY.current =
        (
          (
            event.clientY -
            rect.top
          ) /
            rect.height -
          0.5
        ) *
        2
    }

  const handlePointerLeave =
    () => {
      targetX.current =
        0

      targetY.current =
        0
    }

  return (
    <>
    <Nav />
    <main className="site-sections">
      <div
        ref={landingRef}
        id="home"
        className="landing"

        onPointerMove={
          handlePointerMove
        }

        onPointerLeave={
          handlePointerLeave
        }

        onPointerCancel={
          handlePointerLeave
        }
      >

        <div className="mountain-scene" aria-hidden="true">
          {mountains.map((src, index) => (
            <div
              key={src}
              ref={element => { mountainRefs.current[index] = element }}
              className="mountain-layer"
              style={{ zIndex: (index + 1) * 10 }}
            >
              <img
                className={`mountain-art mountain-art--${index + 1}`}
                src={src}
                alt=""
                draggable={false}
              />
            </div>
          ))}
          {['distant', 'valley'].map((depth, index) => (
            <div
              key={depth}
              ref={element => { cloudRefs.current[index] = element }}
              className={`cloud-layer cloud-layer--${depth}`}
            >
              <HeroFog depth={depth} />
            </div>
          ))}
        </div>

        <img
          className="landscape-overlay"
          src={NeuBG}
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        <div className="hero-values-frame">
          <ul className="hero-values" aria-label="Leitgedanken">
            <li>Intuition</li>
            <li>Wissen</li>
            <li>Wandel</li>
            <li>Freiheit</li>
          </ul>
        </div>

        <svg
          width="0"
          height="0"

          aria-hidden="true"

          style={{
            position: 'absolute'
          }}
        >

          <defs>

            <clipPath
              id="hund-links"
              clipPathUnits="objectBoundingBox"
            >

              <polygon
                points="
                  0.2009,0.5378
                  0.1686,0.5393
                  0.1572,0.5444
                  0.1520,0.5553
                  0.1266,0.5473
                  0.1092,0.5590
                  0.0900,0.5648
                  0.0769,0.5771
                  0.0515,0.5968
                  0.0175,0.6157
                  0.0148,0.6274
                  0.0236,0.6390
                  0.0358,0.6441
                  0.0410,0.6565
                  0.0620,0.6638
                  0.0594,0.6841
                  0.0716,0.6936
                  0.0795,0.7052
                  0.0961,0.7103
                  0.1031,0.7205
                  0.1135,0.7132
                  0.1319,0.7089
                  0.1520,0.7132
                  0.1642,0.7496
                  0.1729,0.7984
                  0.1895,0.8064
                  0.2358,0.7787
                  0.2620,0.6914
                "
              />

            </clipPath>


            <clipPath
              id="hund-rechts"
              clipPathUnits="objectBoundingBox"
            >

              <polygon
                points="
                  0.7860,0.6346
                  0.8961,0.6354
                  0.9258,0.6499
                  0.9406,0.6659
                  0.9546,0.6747
                  0.9520,0.6878
                  0.9790,0.7147
                  0.9913,0.7205
                  0.9921,0.7336
                  0.9764,0.7445
                  0.9686,0.7620
                  0.9659,0.7722
                  0.9555,0.7758
                  0.9528,0.7911
                  0.9406,0.7969
                  0.9258,0.8100
                  0.9135,0.7962
                  0.8969,0.7853
                  0.8803,0.7817
                  0.8559,0.8079
                  0.8122,0.7933
                  0.7860,0.7074
                "
              />

            </clipPath>

          </defs>

        </svg>


        <div
          className="hekate-group"
        >

          <img
            ref={
              heiligenscheinRef
            }

            src={
              Heiligenschein
            }

            alt=""

            aria-hidden="true"

            className="heiligenschein"
          />


          <div
            ref={
              hekateRef
            }

            className="hekate-motion"
          >

            <div
              ref={
                hundeRef
              }

              className="hunde"
            >

              <img
                src={
                  Hunde
                }

                alt="Hunde"

                className="hund hund-links"
              />


              <img
                src={
                  Hunde
                }

                alt=""

                aria-hidden="true"

                className="hund hund-rechts"
              />

            </div>


            <img
              src={
                Hekate
              }

              alt="Hekate"

              className="hekate"
            />

          </div>

        </div>


        <div className="hero-copy">
          <p className="hero-eyebrow">Tarot · Astrologie · Rituale</p>
          <h1 className="landing-title">
            <span>zwischen</span>
            <span>den welten</span>
          </h1>
          <span className="hero-copy-divider" aria-hidden="true" />
          <p className="hero-description">
            Klarheit finden. Muster erkennen.<br />
            Deinen eigenen Weg gehen.
          </p>
          <button
            type="button"
            className="hero-cta-button"
            onClick={() => document.querySelector('.tarot-section')?.scrollIntoView({
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            })}
          >
            <span>Mehr erfahren</span>
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden="true">
              <path d="M1 8h24M20 3l5 5-5 5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>

      </div>


      <Tarot />
      <div className="ritual-contact-group">
        <Rituals />
        <Pricing onSelect={setSelectedReading} />
        <div className="ritual-contact-divider" aria-hidden="true">
          <svg viewBox="0 0 40 400" preserveAspectRatio="none" fill="none">
            <defs><linearGradient id="ritual-contact-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="400"><stop stopColor="#c1bdb5"/><stop offset=".5" stopColor="#999084"/><stop offset="1" stopColor="#61585f"/></linearGradient></defs>
            <path d="M20 0V400" stroke="url(#ritual-contact-ink)" strokeWidth=".7"/>
            <path d="m20 182 2 14 11-9-9 11 15 2-15 2 9 11-11-9-2 14-2-14-11 9 9-11-15-2 15-2-9-11 11 9Z" transform="translate(20 235) scale(.75) translate(-20 -200)" fill="#171717"/>
          </svg>
        </div>
        <Booking selectedReading={selectedReading} onClearReading={() => setSelectedReading(null)} />
      </div>

    </main>
    <Footer />
    </>
  )
}


export default App
