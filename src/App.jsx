import { useEffect, useRef } from 'react'
import Nav from './components/Nav.jsx'
import Tarot from './components/Tarot.jsx'
import './App.css'

import Hekate from './assets/img/Hekate.png'
import Hunde from './assets/img/Hunde.png'
import Heiligenschein from './assets/img/Heiligenschein.png'
import Flag from './assets/img/flag2.png'

function ShardBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let animationFrame
    let startTime = performance.now()

    const shards = []

    // =========================================
    // SPLITTERFORMEN
    // =========================================

    const createPolygon = (
      length,
      thickness,
      type
    ) => {
      if (type === 'needle') {
        const tipWobble =
          (
            Math.random() -
            0.5
          ) *
          thickness *
          2.5

        const tailWobble =
          (
            Math.random() -
            0.5
          ) *
          thickness *
          3

        return [
          {
            x:
              -length * 0.5 +
              tailWobble,

            y:
              thickness *
              (
                Math.random() -
                0.5
              ) *
              0.3,
          },

          {
            x:
              length * 0.48 +
              tipWobble,

            y:
              -thickness *
              (
                0.7 +
                Math.random() *
                0.3
              ),
          },

          {
            x:
              length * 0.53 +
              tipWobble,

            y: 0,
          },

          {
            x:
              length * 0.48 +
              tipWobble,

            y:
              thickness *
              (
                0.7 +
                Math.random() *
                0.3
              ),
          },
        ]
      }

      if (type === 'slash') {
        const randomBend =
          (
            Math.random() -
            0.5
          ) *
          length *
          0.2

        return [
          {
            x:
              -length *
              0.42,

            y:
              -thickness *
              0.15,
          },

          {
            x:
              length *
              0.45 +
              randomBend,

            y:
              -thickness *
              (
                0.55 +
                Math.random() *
                0.12
              ),
          },

          {
            x:
              length *
                0.53 +
              randomBend,

            y:
              thickness *
              (
                0.6 +
                Math.random() *
                0.18
              ),
          },

          {
            x:
              -length *
              0.35,

            y:
              thickness *
              0.4,
          },
        ]
      }

      const bump =
        (
          Math.random() -
          0.5
        ) *
        thickness *
        0.8

      return [
        {
          x:
            -length *
            0.32,

          y:
            thickness *
              (
                0.15 +
                Math.random() *
                0.2
              ) +
            bump,
        },

        {
          x:
            length *
            0.12,

          y:
            -thickness *
              (
                0.65 +
                Math.random() *
                0.15
              ) +
            bump,
        },

        {
          x:
            length *
            0.4,

          y:
            thickness *
              (
                0.12 +
                Math.random() *
                0.22
              ) +
            bump,
        },

        {
          x:
            length *
            0.08,

          y:
            thickness *
              (
                0.65 +
                Math.random() *
                0.18
              ) +
            bump,
        },
      ]
    }

    // =========================================
    // EINEN SPLITTER ERSTELLEN
    // =========================================

    const createShard = () => {
      const depth =
        Math.random()

      const roll =
        Math.random()

      const type =
        roll < 0.62
          ? 'needle'
          : roll < 0.88
            ? 'slash'
            : 'chunk'

      const baseLength =
        type === 'chunk'
          ? 20 +
            Math.random() *
            35

          : type === 'slash'
            ? 38 +
              Math.random() *
              60

            : 44 +
              Math.random() *
              110

      const progress =
        Math.pow(
          Math.random(),
          0.62
        )

      const growthStrength =
        Math.pow(
          progress,
          1.22
        )

      // =========================================
      // DICKE
      // =========================================

      const thickness =
        type === 'chunk'
          ? 1.1 +
            growthStrength *
              11 +
            Math.random() *
              2

          : type === 'slash'
            ? 0.7 +
              growthStrength *
                5.5 +
              Math.random() *
                1.25

            : 0.34 +
              growthStrength *
                3.2 +
              Math.random() *
                0.7

      // =========================================
      // LÄNGE
      // =========================================

      const length =
        baseLength *
        (
          0.55 +
          growthStrength *
            (
              type === 'needle'
                ? 1.45
                : 1.22
            )
        )

      // =========================================
      // KURVE
      // =========================================

      const x =
        progress *
        width

      const curveY =
        height *
        (
          0.035 +
          0.59 *
            (
              1 -
              Math.pow(
                1 -
                  progress,
                2.9
              )
            )
        )

      const band =
        height *
        (
          0.1 +
          progress *
            0.38
        )

      const y =
        curveY +
        (
          Math.random() -
          0.5
        ) *
        band

      // =========================================
      // ROTATION
      // =========================================

      let rotation =
        (
          Math.random() -
          0.5
        ) *
        (
          type === 'needle'
            ? 2.5
            : 1.1
        )

      if (
        Math.random() >
        0.76
      ) {
        rotation +=
          (
            Math.random() -
            0.5
          ) *
          (
            type === 'needle'
              ? 3.3
              : 1.7
          )
      }

      return {
        depth,
        type,
        x,
        y,
        rotation,

        phaseX:
          Math.random() *
          Math.PI *
          2,

        phaseY:
          Math.random() *
          Math.PI *
          2,

        moveX:
          type === 'needle'
            ? 14 +
              Math.random() *
              36

            : 7 +
              Math.random() *
              16,

        moveY:
          type === 'needle'
            ? 10 +
              Math.random() *
              19

            : 4 +
              Math.random() *
              11,

        speed:
          0.00019 +
          Math.random() *
          0.00021,

        sway:
          0.025 +
          Math.random() *
          0.045,

        alpha:
          0.55 +
          depth *
          0.37,

        points:
          createPolygon(
            length,
            thickness,
            type
          ),
      }
    }

    // =========================================
    // SPLITTER ERZEUGEN
    // =========================================

    const populate = () => {
      shards.length = 0

      const count =
        Math.max(
          120,

          Math.floor(
            (
              width *
              height
            ) /
            6300
          )
        )

      for (
        let i = 0;
        i < count;
        i++
      ) {
        shards.push(
          createShard()
        )
      }
    }

    // =========================================
    // CANVAS
    // =========================================

    const resize = () => {
      const dpr =
        Math.min(
          window.devicePixelRatio ||
          1,
          2
        )

      width =
        window.innerWidth

      height =
        canvas.parentElement
          ?.clientHeight ||
        window.innerHeight

      canvas.width =
        Math.round(
          width *
          dpr
        )

      canvas.height =
        Math.round(
          height *
          dpr
        )

      canvas.style.width =
        `${width}px`

      canvas.style.height =
        `${height}px`

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      )

      populate()

      startTime =
        performance.now()
    }

    // =========================================
    // SPLITTER ZEICHNEN
    // =========================================

    const drawShard = (
      shard,
      time
    ) => {
      const x =
        shard.x +
        Math.sin(
          time *
            shard.speed +
          shard.phaseX
        ) *
        shard.moveX

      const y =
        shard.y +
        Math.cos(
          time *
            shard.speed +
          shard.phaseY
        ) *
        shard.moveY

      const scale =
        0.62 +
        shard.depth *
        0.78

      const rotation =
        shard.rotation +
        Math.sin(
          time *
            shard.speed *
            0.61 +
          shard.phaseX
        ) *
        shard.sway

      ctx.save()

      ctx.translate(
        x,
        y
      )

      ctx.rotate(
        rotation
      )

      ctx.scale(
        scale,
        scale
      )

      ctx.beginPath()

      shard.points.forEach(
        (
          point,
          index
        ) => {
          if (
            index === 0
          ) {
            ctx.moveTo(
              point.x,
              point.y
            )
          } else {
            ctx.lineTo(
              point.x,
              point.y
            )
          }
        }
      )

      ctx.closePath()

      ctx.fillStyle =
        `rgba(
          255,
          255,
          255,
          ${shard.alpha}
        )`

      ctx.fill()

      ctx.restore()
    }

    // =========================================
    // ANIMATION
    // =========================================

    const animate = (
      timestamp
    ) => {
      const time =
        timestamp -
        startTime

      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      shards.forEach(
        (shard) => {
          drawShard(
            shard,
            time
          )
        }
      )

      animationFrame =
        requestAnimationFrame(
          animate
        )
    }

    // =========================================
    // START
    // =========================================

    resize()

    animationFrame =
      requestAnimationFrame(
        animate
      )

    window.addEventListener(
      'resize',
      resize
    )

    return () => {
      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        'resize',
        resize
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="shard-background"
      aria-hidden="true"
    />
  )
}

function App() {
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
    let animationFrame
    let previousTime

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

    animationFrame =
      requestAnimationFrame(
        animate
      )

    return () =>
      cancelAnimationFrame(
        animationFrame
      )
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
      <div
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

        <ShardBackground />


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


        <Nav />


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


        <h1
          className="landing-title"
        >
          Zwischen den Welten
        </h1>


        <img
          src={
            Flag
          }

          alt="Flag"

          className="hekate-portrait"
        />


        <div
          className="hero-cta"
          aria-label="Mehr erfahren"
        >

          <div
            className="hero-cta-lines hero-cta-lines-top"
          >
            <span
              className="hero-line hero-line-short"
            />

            <span
              className="hero-line hero-line-long"
            />
          </div>


          <button
            type="button"
            className="hero-cta-button"
          >
            LEARN MORE
          </button>


          <span
            className="hero-line hero-line-bottom"
          />

        </div>

      </div>


      <Tarot />

    </>
  )
}


export default App