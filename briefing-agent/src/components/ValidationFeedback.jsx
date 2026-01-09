import './ValidationFeedback.css'

function ValidationFeedback({ validation, suggestions, onAcceptSuggestion }) {
  if (!validation || validation.issues.length === 0) {
    return (
      <div className="validation-feedback success">
        <div className="feedback-header">
          <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z" fill="currentColor"/>
          </svg>
          <span>Helder en concreet</span>
        </div>
      </div>
    )
  }

  return (
    <div className="validation-feedback">
      {validation.issues.map((issue, index) => (
        <div key={index} className={`feedback-item ${issue.severity}`}>
          <div className="feedback-header">
            <svg className="icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              {issue.severity === 'error' && (
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM11 15H9v-2h2v2zm0-4H9V5h2v6z" fill="currentColor"/>
              )}
              {issue.severity === 'warning' && (
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
              )}
            </svg>
            <strong>{issue.title}</strong>
          </div>
          <p className="feedback-message">{issue.message}</p>

          {issue.examples && issue.examples.length > 0 && (
            <div className="feedback-examples">
              <span className="examples-label">Voorbeelden van problematische termen:</span>
              <ul className="examples-list">
                {issue.examples.map((example, i) => (
                  <li key={i}>"{example}"</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {suggestions && suggestions.length > 0 && (
        <div className="suggestions-section">
          <h4 className="suggestions-title">Verbetervoorstellen</h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-content">
                <p className="suggestion-text">"{suggestion.text}"</p>
                <p className="suggestion-reason">{suggestion.reason}</p>
              </div>
              <div className="suggestion-actions">
                <button
                  onClick={() => onAcceptSuggestion(suggestion.text)}
                  className="btn-accept"
                >
                  Overnemen
                </button>
                <button className="btn-reject">
                  Negeren
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ValidationFeedback
