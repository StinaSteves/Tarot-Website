import { useEffect, useRef } from 'react'

// Soft overlapping sprites form a continuous mist rather than visible dots.
function createMistSprite(color, phase) {
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 192
  const context = sprite.getContext('2d')
  for (let i = 0; i < 7; i++) {
    const angle = i * 2.4 + phase
    const x = 96 + Math.cos(angle) * 29
    const y = 96 + Math.sin(angle) * 21
    const radius = 43 + (i % 3) * 7
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `rgba(${color}, 0.24)`)
    gradient.addColorStop(0.4, `rgba(${color}, 0.13)`)
    gradient.addColorStop(1, `rgba(${color}, 0)`)
    context.fillStyle = gradient
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }
  return sprite
}

function HeroFog({ depth }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const scene = canvas.closest('.mountain-scene')
    const valley = depth === 'valley'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sprites = ['153, 119, 171', '180, 150, 193', '126, 99, 148']
      .map((color, index) => createMistSprite(color, index))
    let width = 0
    let height = 0
    let pixelRatio = 1
    let particles = []
    let time = 0
    let frame = null
    let previousTime = null
    let visible = false

    const draw = (delta = 0) => {
      time += delta
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.progress = (particle.progress + delta * particle.speed) % 1
        const t = particle.progress
        const flowX = valley ? 0.02 + t * 0.66 : 0.2 + t * 0.84
        const flowY = valley
          ? 1.02 - t * 0.3 + Math.sin(t * Math.PI * 2) * 0.04
          : 1.04 - t * 0.8 + Math.sin(t * Math.PI * 2) * 0.055
        const turbulence = Math.sin(time * 0.32 + particle.phase + t * 9)
        const x = flowX * width + particle.spread * width * 0.065
          + Math.cos(time * 0.24 + particle.phase) * height * 0.02
        const y = flowY * height + particle.spread * height * 0.065
          + turbulence * height * 0.025
        const size = particle.size * Math.min(width, height * 1.25)
          * (1 + Math.sin(time * 0.38 + particle.phase) * 0.16)

        // Fade births and exits; each wisp moves and changes shape independently.
        const envelope = Math.sin(Math.PI * t) ** 0.65
        context.globalAlpha = particle.opacity * envelope
        context.save()
        context.translate(x, y)
        context.rotate(particle.phase + time * particle.spin)
        context.drawImage(sprites[particle.sprite], -size / 2, -size * 0.36, size, size * 0.72)
        context.restore()
      }
      context.globalAlpha = 1
    }

    const canAnimate = () => visible && !document.hidden && !reducedMotion.matches

    const animate = timestamp => {
      frame = null
      const delta = previousTime === null ? 0 : Math.min((timestamp - previousTime) / 1000, 0.05)
      previousTime = timestamp
      draw(delta)
      if (canAnimate()) frame = requestAnimationFrame(animate)
    }

    const syncAnimation = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      previousTime = null
      draw()
      if (canAnimate()) frame = requestAnimationFrame(animate)
    }

    const resize = () => {
      width = scene.clientWidth
      height = scene.clientHeight
      // Mist is deliberately soft; cap resolution and particle count on large screens.
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5, 1600 / width)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      let seed = valley ? 137 : 521
      const random = () => {
        seed = (seed * 16807) % 2147483647
        return (seed - 1) / 2147483646
      }
      const count = width < 600 ? 65 : 110
      const baseCount = valley ? Math.round(count * 0.75) : count
      const layerCount = Math.round(baseCount * 1.25)
      particles = Array.from({ length: Math.round(layerCount * 1.25) }, (_, index) => ({
        progress: random(),
        speed: 0.009 + random() * 0.009,
        spread: random() * 2 - 1,
        phase: random() * Math.PI * 2,
        size: 0.13 + random() * 0.15,
        opacity: 0.2 + random() * 0.25,
        spin: (random() - 0.5) * 0.1,
        sprite: index % sprites.length,
      }))
      draw()
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(scene)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncAnimation()
    })
    intersectionObserver.observe(scene)
    reducedMotion.addEventListener('change', syncAnimation)
    document.addEventListener('visibilitychange', syncAnimation)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      reducedMotion.removeEventListener('change', syncAnimation)
      document.removeEventListener('visibilitychange', syncAnimation)
    }
  }, [depth])

  return <canvas ref={canvasRef} className="hero-fog" aria-hidden="true" />
}

export default HeroFog
