import { useEffect, useRef } from 'react'
import { TAROT_SHAPE_HEIGHT, TAROT_SHAPE_PATH, TAROT_SHAPE_WIDTH } from './tarotShape.js'

function TarotParticles({ clipToTarot = true, className = 'tarot-particles' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const section = canvas.parentElement
    const curve = section.querySelector('.tarot-transition')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const shape = new Path2D(TAROT_SHAPE_PATH)
    let width = 0
    let height = 0
    let pixelRatio = 1
    let mask = new Path2D()
    let particles = []
    let frame = null
    let previousTime = null
    let visible = false

    const draw = (delta = 0) => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      context.clearRect(0, 0, width, height)
      context.save()
      context.clip(mask)

      for (const particle of particles) {
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        if (particle.x < 0 || particle.x > width) {
          particle.x = Math.max(0, Math.min(width, particle.x))
          particle.vx *= -1
        }
        if (particle.y < 0 || particle.y > height) {
          particle.y = Math.max(0, Math.min(height, particle.y))
          particle.vy *= -1
        }
      }

      const reach = Math.max(140, Math.min(230, width * 0.16))
      context.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        const first = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const second = particles[j]
          const distance = Math.hypot(first.x - second.x, first.y - second.y)
          if (distance >= reach) continue

          context.strokeStyle = `rgba(85, 85, 90, ${(1 - distance / reach) * 0.24})`
          context.beginPath()
          context.moveTo(first.x, first.y)
          context.lineTo(second.x, second.y)
          context.stroke()
        }
      }

      context.fillStyle = 'rgba(95, 95, 100, 0.42)'
      for (const particle of particles) {
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }
      context.restore()
    }

    const canAnimate = () => visible && !document.hidden && !reducedMotion.matches

    const animate = (timestamp) => {
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
      width = section.clientWidth
      height = section.clientHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)

      const curveHeight = clipToTarot && curve ? curve.getBoundingClientRect().height : 0
      mask = new Path2D()
      if (curveHeight > 0) mask.addPath(shape, new DOMMatrix().scale(width / TAROT_SHAPE_WIDTH, curveHeight / TAROT_SHAPE_HEIGHT))
      if (height > curveHeight) mask.rect(0, curveHeight, width, height - curveHeight)

      const count = Math.max(28, Math.min(140, Math.round(width * height / 14000)))
      particles = Array.from({ length: count }, () => {
        const direction = Math.random() * Math.PI * 2
        const speed = 5 + Math.random() * 7
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(direction) * speed,
          vy: Math.sin(direction) * speed,
          radius: 1 + Math.random() * 1.1,
        }
      })
      draw()
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(section)
    if (curve) resizeObserver.observe(curve)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.01
      syncAnimation()
    }, { threshold: 0.01 })
    intersectionObserver.observe(section)
    reducedMotion.addEventListener('change', syncAnimation)
    document.addEventListener('visibilitychange', syncAnimation)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      reducedMotion.removeEventListener('change', syncAnimation)
      document.removeEventListener('visibilitychange', syncAnimation)
    }
  }, [clipToTarot])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default TarotParticles
