import './ProgressIndicator.css'

function ProgressIndicator({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div className="progress-indicator">
      <div className="progress-info">
        <span className="progress-label">Vraag {current} van {total}</span>
        <span className="progress-percentage">{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressIndicator
