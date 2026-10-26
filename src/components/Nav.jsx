
function Nav() {
  return (
    <nav className="nav" aria-label="Hauptnavigation">
      <div className="nav-container">
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#rituale" className="nav-link">Rituale</a></li>
          <li><a href="#preise" className="nav-link">Preise</a></li>
          <li><a href="#termin-buchen" className="nav-link">Kontakt</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
