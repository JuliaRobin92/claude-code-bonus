import './ProgressIndicator.css';

function ProgressIndicator({ percentage, completed, total }) {
  return (
    <div className="progress-indicator">
      <div className="progress-stats">
        <span className="progress-text">
          {completed} van {total} secties compleet
        </span>
        <span className="progress-percentage">{percentage}%</span>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-bar-shine" />
        </div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
