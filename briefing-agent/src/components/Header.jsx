import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">Briefing Agent</h1>
          <span className="header-badge">Wave 2</span>
        </div>
        <p className="header-subtitle">
          Jouw briefing wordt inhoudelijk beter terwijl je eraan werkt
        </p>
      </div>
    </header>
  )
}

export default Header
