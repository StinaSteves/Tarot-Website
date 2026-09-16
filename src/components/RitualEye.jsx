import { useEffect, useId, useRef } from 'react'
import marbleSkull from '../assets/img/marmorSkull.png'

function RitualEye() {
  const svgRef = useRef(null)
  const irisRef = useRef(null)
  const clipId = useId()

  useEffect(() => {
    const svg = svgRef.current
    const iris = irisRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let frame = null
    let previous = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const draw = (time) => {
      frame = null
      const delta = previous === null ? 1 / 60 : Math.min((time - previous) / 1000, 0.05)
      previous = time
      const smoothing = 1 - Math.exp(-delta * 13)
      currentX += (targetX - currentX) * smoothing
      currentY += (targetY - currentY) * smoothing
      const settled = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.015
      if (settled) { currentX = targetX; currentY = targetY }
      iris.setAttribute('transform', `translate(${currentX} ${currentY})`)
      if (!settled) frame = requestAnimationFrame(draw)
      else previous = null
    }
    const schedule = () => {
      if (visible && !document.hidden && !reducedMotion.matches && frame === null) {
        previous = null
        frame = requestAnimationFrame(draw)
      }
    }
    const move = (event) => {
      if (!visible || document.hidden || reducedMotion.matches || event.pointerType === 'touch') return
      const matrix = svg.getScreenCTM()
      if (!matrix) return
      const eye = new DOMPoint(877, 615).matrixTransform(matrix)
      const dx = event.clientX - eye.x
      const dy = event.clientY - eye.y
      const distance = Math.hypot(dx, dy, 90)
      targetX = dx / distance * 6
      targetY = dy / distance * 3.5
      schedule()
    }
    const reset = () => { targetX = targetY = 0; schedule() }
    const sync = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      previous = null
      if (reducedMotion.matches) {
        targetX = targetY = currentX = currentY = 0
        iris.setAttribute('transform', 'translate(0 0)')
      } else schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(svg)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', sync)
    reducedMotion.addEventListener('change', sync)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', sync)
      reducedMotion.removeEventListener('change', sync)
    }
  }, [])

  return (
    <svg ref={svgRef} className="ritual-eye" viewBox="0 0 1672 941" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d="M860 608 C862 599 874 601 884 606 L898 614 C890 621 877 627 863 628 C861 622 859 614 860 608Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {/* Reuse the actual carved eye texture, enlarged inside its fixed lids.
            Only this small image window follows the pointer. */}
        <g ref={irisRef} className="ritual-eye-iris">
          <image href={marbleSkull} width="1672" height="941" transform="translate(-1124 -613) scale(2.3 2)" />
        </g>
      </g>
    </svg>
  )
}

export default RitualEye
