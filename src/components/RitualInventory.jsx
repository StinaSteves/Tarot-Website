import { useId, useRef, useState } from 'react'
import love from '../assets/img/herz.png'
import career from '../assets/img/karriere.png'
import money from '../assets/img/geld.png'
import family from '../assets/img/familie.png'

const items = [
  { label: 'Liebe', image: love, description: 'Verbindung & Selbstliebe' },
  { label: 'Karriere', image: career, description: 'Berufung & neue Wege' },
  { label: 'Geld', image: money, description: 'Fülle & innere Sicherheit' },
  { label: 'Familie', image: family, description: 'Wurzeln & Zusammenhalt' },
]

export default function RitualInventory() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const id = useId()

  return (
    <div className={`ritual-inventory${open ? ' is-open' : ''}`} onKeyDown={event => {
      if (event.key === 'Escape' && open) { setOpen(false); triggerRef.current?.focus() }
    }}>
      <button ref={triggerRef} className="ritual-inventory-toggle" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
        <span>{open ? 'Dein Anliegen im Mittelpunkt' : 'Ritualthemen entdecken'}</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16"/><path className="ritual-toggle-vertical" d="M12 4v16"/></svg>
      </button>
      <div id={id} className="ritual-inventory-panel" hidden={!open}>
        <ul className="ritual-inventory-items" aria-label="Ritualbereiche">
          {items.map((item, index) => <li className="ritual-inventory-item" key={item.label}>
            <figure>
              <img src={item.image} alt="" loading="lazy" draggable={false} width="140" height="160" />
              <figcaption><span className="ritual-item-number" aria-hidden="true">0{index + 1}</span><span className="ritual-item-name">{item.label}</span><span className="ritual-item-description">{item.description}</span></figcaption>
            </figure>
          </li>)}
        </ul>
        <a className="ritual-prices-link" href="#ritual-preise">Rituale & Preise ansehen <span aria-hidden="true">⟶</span></a>
      </div>
    </div>
  )
}
