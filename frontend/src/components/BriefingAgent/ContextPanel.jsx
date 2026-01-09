import './ContextPanel.css';

const ContextPanel = ({ visible, proposal, onClose }) => {
  if (!visible) return null;

  return (
    <>
      <div className="context-overlay" onClick={onClose} />
      <div className={`context-panel ${visible ? 'visible' : ''}`}>
        <div className="context-header">
          <h3>Context & Inzichten</h3>
          <button className="close-context" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="context-content">
          {/* Global Context */}
          <section className="context-section">
            <div className="section-header">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="#00ADE6" strokeWidth="2"/>
              </svg>
              <h4>Campagne Context</h4>
            </div>
            <div className="context-cards">
              <div className="context-card">
                <span className="card-label">Doelstelling</span>
                <p className="card-value">15% traffic increase</p>
                <span className="card-meta">vs Q4 2025</span>
              </div>
              <div className="context-card">
                <span className="card-label">Budget</span>
                <p className="card-value">€65.000</p>
                <span className="card-meta">3 weken campagne</span>
              </div>
              <div className="context-card">
                <span className="card-label">Platform</span>
                <p className="card-value">Omnichannel</p>
                <span className="card-meta">App, Social, Email</span>
              </div>
            </div>
          </section>

          {/* Historical Performance */}
          <section className="context-section">
            <div className="section-header">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#00ADE6" strokeWidth="2"/>
              </svg>
              <h4>Eerdere Campagnes</h4>
            </div>
            <div className="performance-list">
              <div className="performance-item">
                <div className="perf-header">
                  <span className="perf-name">Q4 2025 Bonus Campagne</span>
                  <span className="perf-score success">ROI 2.4x</span>
                </div>
                <div className="perf-metrics">
                  <div className="metric">
                    <span className="metric-label">Conversie</span>
                    <span className="metric-value">8.7%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Engagement</span>
                    <span className="metric-value">34%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">CTR</span>
                    <span className="metric-value">12.3%</span>
                  </div>
                </div>
              </div>

              <div className="performance-item">
                <div className="perf-header">
                  <span className="perf-name">Q3 2025 Family Focus</span>
                  <span className="perf-score moderate">ROI 1.8x</span>
                </div>
                <div className="perf-metrics">
                  <div className="metric">
                    <span className="metric-label">Conversie</span>
                    <span className="metric-value">6.2%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Engagement</span>
                    <span className="metric-value">28%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">CTR</span>
                    <span className="metric-value">9.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Learnings */}
          <section className="context-section">
            <div className="section-header">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#00ADE6" strokeWidth="2"/>
              </svg>
              <h4>Key Learnings</h4>
            </div>
            <div className="learnings-list">
              <div className="learning-item">
                <div className="learning-dot" />
                <p>Donderdag launches presteren 5.9% beter dan vrijdag</p>
              </div>
              <div className="learning-item">
                <div className="learning-dot" />
                <p>Instagram Stories tonen 23% hogere engagement bij 25-35 jaar</p>
              </div>
              <div className="learning-item">
                <div className="learning-dot" />
                <p>Front-loading budget (70% week 1) maximaliseert bereik</p>
              </div>
              <div className="learning-item">
                <div className="learning-dot" />
                <p>Convenience messaging resoneert sterker dan prijs focus</p>
              </div>
            </div>
          </section>

          {/* Proposal-Specific Context */}
          {proposal && (
            <section className="context-section highlight">
              <div className="section-header">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" stroke="#00ADE6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h4>Specifiek voor: {proposal.title}</h4>
              </div>
              {proposal.data && (
                <div className="specific-context">
                  {proposal.data.previousCampaigns && (
                    <div className="context-detail">
                      <span className="detail-label">Gebruikt van:</span>
                      <div className="detail-tags">
                        {proposal.data.previousCampaigns.map(camp => (
                          <span key={camp} className="tag">{camp}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {proposal.data.experimentStatus && (
                    <div className="context-detail">
                      <span className="detail-label">Experiment status:</span>
                      <span className="detail-value experiment">
                        {proposal.data.experimentStatus}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ContextPanel;
