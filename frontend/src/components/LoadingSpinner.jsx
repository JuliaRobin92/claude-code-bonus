import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Verwerken...</p>
      <p className="loading-subtext">
        Dit kan enkele seconden duren, afhankelijk van de bestandsgrootte
      </p>
    </div>
  );
}

export default LoadingSpinner;
