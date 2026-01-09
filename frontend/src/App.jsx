import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import BonusfolderUpload from './components/BonusfolderUpload';
import UitingUpload from './components/UitingUpload';
import ResultsTable from './components/ResultsTable';
import LoadingSpinner from './components/LoadingSpinner';
import BriefingWorkspace from './components/BriefingAgent/BriefingWorkspace';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

function App() {
  const [view, setView] = useState('briefing'); // 'bonuscheck' or 'briefing'
  const [bonusfolderStatus, setBonusfolderStatus] = useState(null);
  const [comparisonResults, setComparisonResults] = useState(null);
  const [currentUitingName, setCurrentUitingName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check bonusfolder status bij opstarten
  useEffect(() => {
    checkBonusfolderStatus();
  }, []);

  const checkBonusfolderStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE}/bonusfolder-status`);
      setBonusfolderStatus(response.data);
    } catch (err) {
      console.error('Error checking bonusfolder status:', err);
    }
  };

  const handleBonusfolderUpload = async (file) => {
    setLoading(true);
    setError(null);
    setComparisonResults(null);

    try {
      const formData = new FormData();
      formData.append('bonusfolder', file);

      const response = await axios.post(`${API_BASE}/upload-bonusfolder`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setBonusfolderStatus({
        uploaded: true,
        filename: response.data.filename,
        uploadDate: new Date().toISOString()
      });

      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Fout bij uploaden van bonusfolder');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUitingUpload = async (file) => {
    setLoading(true);
    setError(null);
    setCurrentUitingName(file.name);

    try {
      const formData = new FormData();
      formData.append('uiting', file);

      const response = await axios.post(`${API_BASE}/compare-uiting`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setComparisonResults({
        filename: response.data.filename,
        results: response.data.results
      });

      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Fout bij vergelijken van marketinguiting');
      console.error('Comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewComparison = () => {
    setComparisonResults(null);
    setCurrentUitingName('');
    setError(null);
  };

  // Render Briefing Workspace view
  if (view === 'briefing') {
    return <BriefingWorkspace />;
  }

  // Render Bonuscheck view
  return (
    <div className="app">
      <Header />

      <div className="view-switcher">
        <button
          className={`view-btn ${view === 'bonuscheck' ? 'active' : ''}`}
          onClick={() => setView('bonuscheck')}
        >
          Bonuscheck
        </button>
        <button
          className={`view-btn ${view === 'briefing' ? 'active' : ''}`}
          onClick={() => setView('briefing')}
        >
          Briefing Agent
        </button>
      </div>

      <main className="container">
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="upload-section">
          <BonusfolderUpload
            onUpload={handleBonusfolderUpload}
            status={bonusfolderStatus}
            disabled={loading}
          />

          {bonusfolderStatus?.uploaded && (
            <UitingUpload
              onUpload={handleUitingUpload}
              disabled={loading}
            />
          )}
        </div>

        {loading && <LoadingSpinner />}

        {comparisonResults && !loading && (
          <ResultsTable
            results={comparisonResults.results}
            uitingName={comparisonResults.filename}
            bonusfolderName={bonusfolderStatus.filename}
            onNewComparison={handleNewComparison}
          />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Albert Heijn - Interne Tool voor Marketing & Studio Teams</p>
      </footer>
    </div>
  );
}

export default App;
