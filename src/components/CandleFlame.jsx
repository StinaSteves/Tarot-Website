import { useEffect, useRef } from 'react'

export default function CandleFlame() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const ratio = Math.min(devicePixelRatio || 1, 2)
    canvas.width = 160 * ratio
    canvas.height = 240 * ratio
    let frame = null
    let visible = false
    let time = 0
    let previous = null

    const draw = () => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.clearRect(0, 0, 160, 240)
      const sway = Math.sin(time * 2.3) * 8 + Math.sin(time * 5.7 + 1) * 3
      const flicker = Math.sin(time * 8.1) * 3 + Math.sin(time * 13.3) * 1.5
      const top = 46 + Math.sin(time * 3.8) * 9 + flicker
      const base = 218
      const glow = ctx.createRadialGradient(80 + sway / 3, 155, 4, 80, 150, 76)
      glow.addColorStop(0, 'rgba(255,196,110,.19)')
      glow.addColorStop(.4, 'rgba(245,148,62,.07)')
      glow.addColorStop(1, 'rgba(240,130,50,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, 160, 240)

      // The wick stays anchored while heat bends the narrowing upper flame.
      const flame = (scale, blur, stops) => {
        ctx.save()
        ctx.translate(80, base)
        ctx.scale(scale, scale)
        ctx.translate(-80, -base)
        ctx.filter = `blur(${blur}px)`
        const gradient = ctx.createLinearGradient(0, top, 0, base)
        stops.forEach(([offset, color]) => gradient.addColorStop(offset, color))
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(80, base)
        ctx.bezierCurveTo(50, base - 14, 53 - flicker, 156, 68 + sway * .25, 119)
        ctx.bezierCurveTo(77 + sway * .8, 93, 84 + sway, top + 18, 80 + sway, top)
        ctx.bezierCurveTo(99 + sway, top + 35, 96 + sway * .5, 127, 105 + flicker, 163)
        ctx.bezierCurveTo(115, 195, 101, base - 1, 80, base)
        ctx.fill()
        ctx.restore()
      }
      flame(1, 2.1, [[0, 'rgba(238,132,44,0)'], [.15, 'rgba(255,174,65,.7)'], [.65, '#ffc66f'], [1, 'rgba(100,124,207,.2)']])
      flame(.82, .8, [[0, 'rgba(255,228,163,0)'], [.15, '#ffe6b0'], [.6, '#fff5d8'], [.88, '#fff5dc'], [1, 'rgba(117,146,223,.65)']])
      flame(.49, 1.8, [[0, 'rgba(255,255,230,0)'], [.25, '#fffde9'], [.75, '#fff9df'], [1, 'rgba(85,103,166,.2)']])
      const blue = ctx.createRadialGradient(80, 215, 1, 80, 212, 12)
      blue.addColorStop(0, 'rgba(51,45,49,.85)')
      blue.addColorStop(.55, 'rgba(106,136,228,.55)')
      blue.addColorStop(1, 'rgba(105,135,225,0)')
      ctx.fillStyle = blue
      ctx.fillRect(65, 199, 30, 30)
    }
    const animate = stamp => {
      frame = null
      time += previous === null ? 0 : Math.min((stamp - previous) / 1000, .05)
      previous = stamp
      draw()
      frame = requestAnimationFrame(animate)
    }
    const sync = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      previous = null
      draw()
      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(animate)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    observer.observe(canvas)
    motion.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    draw()
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer.disconnect()
      motion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return <canvas ref={ref} className="pricing-candle-flame" aria-hidden="true" />
}
