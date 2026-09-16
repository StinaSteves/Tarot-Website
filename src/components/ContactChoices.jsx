import { useEffect, useId, useRef, useState } from 'react'
import candle from '../assets/img/kerze.png'
import tarot from '../assets/img/hangedmenCard.png'
import love from '../assets/img/herz.png'
import career from '../assets/img/karriere.png'
import money from '../assets/img/geld.png'
import family from '../assets/img/familie.png'

const topics = [{ label: 'Liebe', image: love }, { label: 'Karriere', image: career }, { label: 'Geld', image: money }, { label: 'Familie', image: family }]
export default function ContactChoices({ topic, onSelect }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const candleRef = useRef(null)
  const menuId = useId()
  useEffect(() => {
    if (!open) return
    const outside = event => { if (!rootRef.current.contains(event.target)) setOpen(false) }
    const escape = event => { if (event.key === 'Escape') { setOpen(false); candleRef.current.focus() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])
  const ritualSelected = topics.some(item => item.label === topic)
  return <div ref={rootRef} className={`contact-choices${open ? ' is-open' : ''}`}>
    <div className="contact-candle-group">
      <button ref={candleRef} type="button" className="contact-choice contact-candle" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(value => !value)}>
        <span className={`contact-choice-orbit${ritualSelected ? ' is-selected' : ''}`}><img src={candle} alt=""/></span>
        <span className="contact-topic-name">Rituale</span>
        <span className="contact-topic-description">{ritualSelected ? topic : 'Wähle dein Thema'}</span>
      </button>
      <div id={menuId} className="contact-ritual-fan" role="group" aria-label="Ritualthema auswählen" aria-hidden={!open} inert={!open}>
        {topics.map((item, index) => <button key={item.label} type="button" style={{ '--choice-index': index }} aria-pressed={topic === item.label} onClick={() => { onSelect(item.label); setOpen(false); candleRef.current.focus() }}><img src={item.image} alt=""/><span>{item.label}</span></button>)}
      </div>
    </div>
    <button type="button" className="contact-choice contact-tarot" aria-pressed={topic === 'Tarot'} onClick={() => { onSelect('Tarot'); setOpen(false) }}>
      <span className={`contact-choice-orbit${topic === 'Tarot' ? ' is-selected' : ''}`}><img src={tarot} alt=""/></span>
      <span className="contact-topic-name">Tarot</span>
      <span className="contact-topic-description">Klarheit & Impulse</span>
    </button>
  </div>
}
