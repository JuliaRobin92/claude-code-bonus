import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="ah-logo">AH</div>
          <div className="title-section">
            <h1>Bonuscheck AH</h1>
            <p className="subtitle">Interne tool voor Marketing & Studio</p>
          </div>
        </div>
        <div className="header-description">
          <p>Controleer marketinguitingen automatisch op correcte weergave van Bonusaanbiedingen</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
