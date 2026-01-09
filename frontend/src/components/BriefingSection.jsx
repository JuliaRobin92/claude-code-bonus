import './BriefingSection.css';

function BriefingSection({
  section,
  sectionNumber,
  status,
  isExpanded,
  onToggle,
  data,
  onUpdate
}) {
  const getStatusIcon = () => {
    switch (status.status) {
      case 'complete':
        return (
          <svg className="status-icon complete" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M8 12l3 3 5-5" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'partial':
        return (
          <svg className="status-icon partial" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        );
      case 'incomplete':
        return (
          <svg className="status-icon incomplete" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          </svg>
        );
      case 'optional':
        return (
          <svg className="status-icon optional" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="3 3"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (!section.required) {
      return 'Optioneel';
    }

    if (status.status === 'complete') {
      return 'Compleet';
    } else if (status.status === 'partial') {
      return `${status.completedRequired}/${status.totalRequired} verplicht`;
    } else {
      return 'Incompleet';
    }
  };

  const getMissingFields = () => {
    if (status.status === 'complete' || !section.required) {
      return null;
    }

    const missingRequired = section.fields.filter(f => {
      if (!f.required) return false;
      const value = data[f.id];
      return !value || value.toString().trim().length === 0;
    });

    if (missingRequired.length === 0) return null;

    return (
      <div className="missing-fields">
        <span className="missing-label">Ontbrekende verplichte velden:</span>
        <ul>
          {missingRequired.map(field => (
            <li key={field.id}>{field.label}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={`briefing-section ${status.status} ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <span className="section-number">{sectionNumber}</span>
          <h2 className="section-title">{section.title}</h2>
          {section.required && <span className="required-badge">Verplicht</span>}
        </div>

        <div className="section-header-right">
          <span className="section-status">{getStatusText()}</span>
          {getStatusIcon()}
          <svg
            className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="section-content">
          {getMissingFields()}

          <div className="section-fields">
            {section.fields.map(field => (
              <div key={field.id} className="field-group">
                <label className="field-label">
                  {field.label}
                  {field.required && <span className="required-asterisk">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    className="field-input"
                    value={data[field.id] || ''}
                    onChange={(e) => onUpdate(field.id, e.target.value)}
                    placeholder={`Voer ${field.label.toLowerCase()} in...`}
                    rows={4}
                  />
                ) : (
                  <input
                    className="field-input"
                    type={field.type}
                    value={data[field.id] || ''}
                    onChange={(e) => onUpdate(field.id, e.target.value)}
                    placeholder={`Voer ${field.label.toLowerCase()} in...`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BriefingSection;
