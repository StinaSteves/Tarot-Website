import { useEffect, useId, useRef, useState } from 'react'
import love from '../assets/img/herz.png'
import career from '../assets/img/karriere.png'
import money from '../assets/img/geld.png'
import family from '../assets/img/familie.png'

const items = [
  { label: 'Liebe', image: love },
  { label: 'Karriere', image: career },
  { label: 'Geld', image: money },
  { label: 'Familie', image: family },
]

export default function RitualInventory() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const dismiss = (event) => {
      if (!containerRef.current.contains(event.target)) setOpen(false)
    }
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current.focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return (
    <div ref={containerRef} className={`ritual-inventory${open ? ' is-open' : ''}`}>
      <div className="ritual-inventory-glow" aria-hidden="true" />
      <ul id={id} className="ritual-inventory-items" aria-label="Ritualbereiche" aria-hidden={!open} inert={!open}>
        {items.map((item, index) => (
          <li className="ritual-inventory-item" key={item.label} style={{ '--item-index': index }}>
            <figure>
              <img src={item.image} alt="" draggable={false} />
              <figcaption>{item.label}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <button ref={triggerRef} className="hero-cta-button ritual-button" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <span>Alle Rituale</span>
        <svg viewBox="0 0 44 16" fill="none" aria-hidden="true"><path d={open ? 'M16 2l12 12M28 2L16 14' : 'M1 8h40M36 3l5 5-5 5'} /></svg>
      </button>
    </div>
  )
}
