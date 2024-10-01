import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const UnlockPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [password, setPassword] = useState('');
  const [unlockedPdf, setUnlockedPdf] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setUnlockedPdf(null); // Reset unlocked PDF
    setError(null); // Reset error message
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const unlockPdf = async () => {
    if (pdfFile) {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        try {
          const uint8Array = new Uint8Array(e.target.result);
          const pdfDoc = await PDFDocument.load(uint8Array, {
            updateMetadata: false,
            ignoreEncryption: false,
            password: password || undefined, // Use password if provided
          });

          const bytes = await pdfDoc.save();
          const blob = new Blob([bytes], { type: 'application/pdf' });
          setUnlockedPdf(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error unlocking PDF:', error);
          setError('Failed to unlock PDF. Check the password.');
        }
      };

      fileReader.readAsArrayBuffer(pdfFile);
    } else {
      alert('Please select a PDF file.');
    }
  };

  return (
    <div className='form-group'>
      <h2>Unlock PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input
        type="password"
        placeholder="Enter password (if required)"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={unlockPdf}>Unlock PDF</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {unlockedPdf && (
        <div>
          <h3>Unlocked PDF</h3>
          <a href={unlockedPdf} download="unlocked.pdf">Download Unlocked PDF</a>
        </div>
      )}
    </div>
  );
};

export default UnlockPDF;
