import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadBox.css';

function UitingUpload({ onUpload, disabled }) {
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
        <h2>2. Marketinguiting Uploaden</h2>
      </div>

      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <input {...getInputProps()} />

        <div className="dropzone-icon">🎨</div>

        <p className="dropzone-text">
          {isDragActive
            ? 'Drop het bestand hier...'
            : 'Sleep een marketinguiting hier, of klik om te uploaden'}
        </p>
        <p className="dropzone-subtext">
          Ondersteund: PDF, PNG, JPG, TXT
        </p>

        <button className="button-primary">
          Start Vergelijking
        </button>
      </div>

      <div className="upload-info">
        <p><strong>Voorbeelden:</strong> Winkelposters, online banners, social media posts, etc.</p>
        <p>Upload meerdere uitingen na elkaar om ze allemaal te controleren.</p>
      </div>
    </div>
  );
}

export default UitingUpload;
