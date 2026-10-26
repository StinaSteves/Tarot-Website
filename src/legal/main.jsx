import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { legalPages } from './content.js'
import LegalPage from './LegalPage.jsx'
import '../App.css'

const slug = window.location.pathname.slice(import.meta.env.BASE_URL.length).split('/').filter(Boolean)[0]
const page = legalPages.find(item => item.slug === slug)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {page ? <LegalPage page={page} /> : <main><h1>Seite nicht gefunden</h1><a href={import.meta.env.BASE_URL}>Zur Startseite</a></main>}
  </StrictMode>,
)
