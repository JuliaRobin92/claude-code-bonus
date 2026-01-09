import './DecisionControl.css';

const DecisionControl = ({ type, onAcceptAll, onRefineAll }) => {
  return (
    <div className="decision-control">
      <div className="control-header">
        <h3>Briefing Acties</h3>
        <p>Neem beslissingen op alle voorstellen tegelijk</p>
      </div>

      <div className="control-actions">
        <button className="control-btn primary" onClick={onAcceptAll}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="btn-content">
            <span className="btn-label">Alles Goedkeuren</span>
            <span className="btn-desc">Accepteer alle stabiele voorstellen</span>
          </div>
        </button>

        <button className="control-btn secondary" onClick={onRefineAll}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="btn-content">
            <span className="btn-label">Laat Agent Verfijnen</span>
            <span className="btn-desc">Trigger nieuwe analyse ronde</span>
          </div>
        </button>

        <button className="control-btn tertiary">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="btn-content">
            <span className="btn-label">Exporteer Briefing</span>
            <span className="btn-desc">Download als PDF of JSON</span>
          </div>
        </button>
      </div>

      <div className="control-meta">
        <div className="meta-stat">
          <span className="stat-value">4</span>
          <span className="stat-label">Actieve voorstellen</span>
        </div>
        <div className="meta-stat">
          <span className="stat-value">84%</span>
          <span className="stat-label">Gem. confidence</span>
        </div>
        <div className="meta-stat">
          <span className="stat-value">Live</span>
          <span className="stat-label">Agent status</span>
        </div>
      </div>
    </div>
  );
};

export default DecisionControl;
