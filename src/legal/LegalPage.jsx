import { legalPages } from './content.js'
import './LegalPage.css'

export default function LegalPage({ page }) {
  return (
    <div className="legal-site">
      <a className="legal-skip" href="#legal-content">Zum Inhalt</a>
      <header className="legal-header">
        <a className="legal-brand" href={import.meta.env.BASE_URL} aria-label="NYX – Startseite">NYX<span>Zwischen den Welten</span></a>
        <a className="legal-back" href={import.meta.env.BASE_URL}>← <span>Zur Startseite</span></a>
      </header>
      <main id="legal-content" className="legal-main">
        <div className="legal-heading">
          <p className="legal-eyebrow">Informationen <span aria-hidden="true">/ {page.number}</span></p>
          <h1>{page.label}</h1>
          <p className="legal-intro">{page.intro}</p>
          <svg className="legal-ornament" viewBox="0 0 100 160" fill="none" aria-hidden="true">
            <circle cx="50" cy="52" r="30" stroke="currentColor" strokeWidth=".6"/>
            <path d="M50 0v160M4 52h92M50 26l4 22 18-14-14 18 22 4-22 4 14 18-18-14-4 22-4-22-18 14 14-18-22-4 22-4-14-18 18 14Z" stroke="currentColor" strokeWidth=".6"/>
          </svg>
        </div>
        <div className="legal-layout">
          <aside className="legal-sidebar">
            <nav aria-label="Rechtliche Seiten">
              {legalPages.map(item => <a key={item.slug} href={`${import.meta.env.BASE_URL}${item.slug}/`} aria-current={item.slug === page.slug ? 'page' : undefined}><span>{item.number}</span>{item.label}<span aria-hidden="true">↗</span></a>)}
            </nav>
            <nav className="legal-toc" aria-label="Auf dieser Seite">
              <p>Auf dieser Seite</p>
              {page.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
            </nav>
          </aside>
          <article className="legal-article" aria-label={page.label}>
            <div className="legal-notice"><span>Entwurf · Angaben offen</span><p>{page.notice}</p></div>
            {page.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="legal-section" aria-labelledby={`${section.id}-title`}>
                <span className="legal-section-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                  {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {section.pending && <div className="legal-pending"><strong>Noch zu ergänzen</strong><p>{section.pending}</p></div>}
                </div>
              </section>
            ))}
            <a className="legal-contact" href={`${import.meta.env.BASE_URL}#termin-buchen`}>Zum Kontaktformular <span aria-hidden="true">⟶</span></a>
          </article>
        </div>
      </main>
      <footer className="legal-footer">
        <a href={import.meta.env.BASE_URL} aria-label="NYX – Startseite">NYX</a>
        <p>Rituale. Wissen. Wandel.</p>
        <nav aria-label="Rechtliche Informationen">{legalPages.map(item => <a key={item.slug} href={`${import.meta.env.BASE_URL}${item.slug}/`} aria-current={item.slug === page.slug ? 'page' : undefined}>{item.label}</a>)}</nav>
      </footer>
    </div>
  )
}
