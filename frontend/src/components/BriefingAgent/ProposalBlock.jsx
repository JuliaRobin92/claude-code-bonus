import { useState, useEffect } from 'react';
import './ProposalBlock.css';

const ProposalBlock = ({ proposal, isActive, onActivate, onDecision }) => {
  const [showReasoning, setShowReasoning] = useState(false);
  const [adjustmentMode, setAdjustmentMode] = useState(false);
  const [pulseUpdate, setPulseUpdate] = useState(false);

  // Visual feedback bij updates
  useEffect(() => {
    setPulseUpdate(true);
    const timeout = setTimeout(() => setPulseUpdate(false), 600);
    return () => clearTimeout(timeout);
  }, [proposal.confidence, proposal.lastUpdated]);

  const getStatusColor = () => {
    switch (proposal.status) {
      case 'stable': return '#10B981';
      case 'learning': return '#F59E0B';
      case 'under_review': return '#00ADE6';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = () => {
    switch (proposal.status) {
      case 'stable': return 'Stabiel';
      case 'learning': return 'Leren';
      case 'under_review': return 'Onder review';
      default: return 'Actief';
    }
  };

  const getRelativeTime = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Zojuist';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min geleden`;
    const hours = Math.floor(minutes / 60);
    return `${hours} uur geleden`;
  };

  return (
    <div
      className={`proposal-block ${isActive ? 'active' : ''} ${pulseUpdate ? 'pulse-update' : ''} status-${proposal.status}`}
      onClick={() => onActivate()}
    >
      {/* Status Indicator */}
      <div className="proposal-status-bar" style={{ backgroundColor: getStatusColor() }}>
        <span className="status-label">{getStatusLabel()}</span>
        <div className="confidence-indicator">
          <div
            className="confidence-fill"
            style={{
              width: `${proposal.confidence * 100}%`,
              backgroundColor: 'rgba(255,255,255,0.9)'
            }}
          />
        </div>
        <span className="confidence-value">{Math.round(proposal.confidence * 100)}%</span>
      </div>

      {/* Content */}
      <div className="proposal-content">
        <div className="proposal-header">
          <h3>{proposal.title}</h3>
          <button
            className="reasoning-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowReasoning(!showReasoning);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="proposal-main">
          <p className="proposal-text">{proposal.proposal}</p>
        </div>

        {/* Expandable Reasoning */}
        {showReasoning && (
          <div className="reasoning-layer">
            <div className="reasoning-header">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" stroke="#00ADE6" strokeWidth="1.5"/>
              </svg>
              <span>Agent Reasoning</span>
            </div>
            <p>{proposal.reasoning}</p>
            <div className="reasoning-meta">
              <span>Laatst bijgewerkt: {getRelativeTime(proposal.lastUpdated)}</span>
            </div>
          </div>
        )}

        {/* Adjustment Mode */}
        {adjustmentMode && (
          <div className="adjustment-panel">
            <h4>Bijsturen</h4>
            <div className="adjustment-controls">
              <div className="slider-group">
                <label>Focus scherpte</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="adjustment-slider"
                />
              </div>
              <div className="slider-group">
                <label>Ambitie niveau</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="60"
                  className="adjustment-slider"
                />
              </div>
              <div className="slider-group">
                <label>Risico tolerantie</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="40"
                  className="adjustment-slider"
                />
              </div>
            </div>
            <button
              className="apply-adjustment"
              onClick={(e) => {
                e.stopPropagation();
                onDecision(proposal.id, 'adjust', {
                  reasoning: 'Aangepast op basis van gebruiker input'
                });
                setAdjustmentMode(false);
              }}
            >
              Toepassen
            </button>
          </div>
        )}
      </div>

      {/* Decision Actions */}
      <div className="proposal-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="action-btn accept"
          onClick={() => onDecision(proposal.id, 'accept')}
          title="Behouden"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Behouden
        </button>

        <button
          className="action-btn adjust"
          onClick={() => setAdjustmentMode(!adjustmentMode)}
          title="Bijsturen"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 7h12M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="7" r="2" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="16" cy="17" r="2" fill="currentColor"/>
          </svg>
          Bijsturen
        </button>

        <button
          className="action-btn reject"
          onClick={() => onDecision(proposal.id, 'reject')}
          title="Verwerpen"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProposalBlock;
