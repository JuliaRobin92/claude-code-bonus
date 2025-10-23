import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadBox.css';

function BonusfolderUpload({ onUpload, status, disabled }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled
  });

  return (
    <div className="upload-box">
      <div className="upload-box-header">
        <h2>1. Bonusfolder Uploaden</h2>
        {status?.uploaded && (
          <span className="upload-status-badge success">
            ✓ Geüpload
          </span>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <input {...getInputProps()} />

        <div className="dropzone-icon">📁</div>

        {!status?.uploaded ? (
          <>
            <p className="dropzone-text">
              {isDragActive
                ? 'Drop het bestand hier...'
                : 'Sleep de Bonusfolder hier, of klik om te uploaden'}
            </p>
            <p className="dropzone-subtext">
              Ondersteund: PDF, PNG, JPG, TXT
            </p>
          </>
        ) : (
          <>
            <p className="dropzone-text success-text">
              ✓ {status.filename}
            </p>
            <p className="dropzone-subtext">
              Geüpload op {new Date(status.uploadDate).toLocaleString('nl-NL')}
            </p>
            <button
              className="button-secondary small"
              onClick={(e) => e.stopPropagation()}
            >
              Upload nieuwe folder
            </button>
          </>
        )}
      </div>

      <div className="upload-info">
        <p><strong>Let op:</strong> Upload 1x per week de definitieve Bonusfolder.</p>
        <p>Deze wordt gebruikt als referentie voor alle vergelijkingen.</p>
      </div>
    </div>
  );
}

export default BonusfolderUpload;
