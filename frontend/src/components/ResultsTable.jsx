import { useState } from 'react';
import './ResultsTable.css';

function ResultsTable({ results, uitingName, bonusfolderName, onNewComparison }) {
  const totalItems = results.length;
  const correctItems = results.filter(r => r.status === '✅').length;
  const errorItems = results.filter(r => r.status === '❌').length;

  const exportToCSV = () => {
    // CSV headers
    const headers = ['Product', 'Status', 'Opmerking'];

    // CSV rows
    const rows = results.map(item => [
      `"${item.product}"`,
      item.status === '✅' ? 'Correct' : 'Fout',
      `"${item.opmerking || ''}"`
    ]);

    // Combine into CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `bonuscheck-${uitingName.replace(/\.[^/.]+$/, '')}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="results-title-section">
          <h2>Resultaten</h2>
          <div className="comparison-info">
            <span className="info-label">Marketinguiting:</span> <strong>{uitingName}</strong>
            <span className="info-separator">|</span>
            <span className="info-label">Bonusfolder:</span> <strong>{bonusfolderName}</strong>
          </div>
        </div>

        <div className="results-actions">
          <button className="button-secondary" onClick={onNewComparison}>
            Nieuwe Vergelijking
          </button>
          <button className="button-export" onClick={exportToCSV}>
            📥 Export naar CSV
          </button>
        </div>
      </div>

      <div className="results-summary">
        <div className="summary-card total">
          <div className="summary-number">{totalItems}</div>
          <div className="summary-label">Totaal aanbiedingen</div>
        </div>
        <div className="summary-card success">
          <div className="summary-number">{correctItems}</div>
          <div className="summary-label">Correct</div>
        </div>
        <div className="summary-card error">
          <div className="summary-number">{errorItems}</div>
          <div className="summary-label">Fouten gevonden</div>
        </div>
      </div>

      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Product</th>
              <th className="status-column">Status</th>
              <th>Opmerking</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className={item.status === '❌' ? 'error-row' : ''}>
                <td className="product-cell">{item.product}</td>
                <td className="status-cell">
                  <span className={`status-badge ${item.status === '✅' ? 'success' : 'error'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="opmerking-cell">
                  {item.opmerking || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {errorItems > 0 && (
        <div className="results-footer">
          <div className="warning-box">
            <span className="warning-icon">⚠️</span>
            <div>
              <strong>Let op:</strong> Er zijn {errorItems} fout(en) gevonden.
              Controleer de marketinguiting en corrigeer waar nodig.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsTable;
