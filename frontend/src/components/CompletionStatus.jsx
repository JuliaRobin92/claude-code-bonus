import './CompletionStatus.css';

function CompletionStatus({ isComplete, percentage, onSubmit }) {
  if (isComplete) {
    return (
      <div className="completion-status complete">
        <div className="completion-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M8 12l3 3 5-5" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="completion-content">
          <h3 className="completion-title">Briefing is verzendklaar</h3>
          <p className="completion-message">
            Alle verplichte secties zijn ingevuld. Deze briefing bevat voldoende
            basisinformatie om mee verder te werken.
          </p>
        </div>

        <button className="submit-button" onClick={onSubmit}>
          Briefing verzenden
        </button>
      </div>
    );
  }

  return (
    <div className="completion-status incomplete">
      <div className="completion-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="completion-content">
        <h3 className="completion-title">Briefing is nog niet compleet</h3>
        <p className="completion-message">
          Vul alle verplichte secties in om de briefing verzendklaar te maken.
          Nog {100 - percentage}% te gaan.
        </p>
      </div>

      <button className="submit-button disabled" disabled>
        Briefing verzenden
      </button>
    </div>
  );
}

export default CompletionStatus;
