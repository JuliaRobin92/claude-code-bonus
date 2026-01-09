import { useEffect, useState } from 'react';
import './AgentActivity.css';

const AgentActivity = ({ activities }) => {
  const [visible, setVisible] = useState(false);
  const [latestActivity, setLatestActivity] = useState(null);

  useEffect(() => {
    if (activities.length > 0) {
      setLatestActivity(activities[0]);
      setVisible(true);

      // Auto-hide na 5 seconden
      const timeout = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [activities]);

  return (
    <div className="agent-activity-container">
      {/* Activity Stream Indicator */}
      <button
        className="activity-toggle"
        onClick={() => setVisible(!visible)}
      >
        <div className="activity-icon">
          <div className="pulse-dot" />
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
              fill="#00ADE6"
              fillOpacity="0.2"
              stroke="#00ADE6"
              strokeWidth="2"
            />
          </svg>
        </div>
        <span className="activity-label">Agent Activiteit</span>
        {activities.length > 0 && (
          <span className="activity-count">{activities.length}</span>
        )}
      </button>

      {/* Activity Stream */}
      {visible && (
        <div className="activity-stream">
          <div className="stream-header">
            <h4>Live Activiteit</h4>
            <button
              className="close-stream"
              onClick={() => setVisible(false)}
            >
              ×
            </button>
          </div>

          <div className="stream-list">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`activity-item ${index === 0 ? 'latest' : ''}`}
              >
                <div className="activity-timeline">
                  <div className="timeline-dot" />
                  {index < activities.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleTimeString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="stream-empty">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#D1D5DB" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>Agent start binnenkort met analyseren...</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Latest Activity */}
      {latestActivity && !visible && (
        <div className="floating-activity">
          <div className="float-pulse" />
          <div className="float-content">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="#00ADE6"
                strokeWidth="0"
              />
            </svg>
            <span>{latestActivity.action}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentActivity;
