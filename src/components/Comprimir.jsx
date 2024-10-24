import React, { useState } from 'react';
import axios from 'axios';

export const Comprimir = () => {
  const [url, setUrl] = useState('');
  const [compressedFile, setCompressedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejar el enlace del PDF
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  // Comprimir el PDF usando la API de PDF.co
  const handleCompress = async () => {
    if (!url) {
      alert("Por favor ingresa un enlace de archivo PDF.");
      return;
    }

    setLoading(true);

    try {
      // Preparar los datos para la compresión
      const optimizeData = {
        url: url, // URL del archivo PDF
        name: "compressed.pdf", // Nombre del archivo comprimido
      };

      const response = await axios.post('https://api.pdf.co/v1/pdf/optimize', optimizeData, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'comanuel7@gmail.com_xxNTTCdRFqwbbr8MPWw8rJ1EremzCUpAlVRb3RrZtFaPDnpTKxZKykszkc8vIi6Z' // Reemplaza con tu clave API de PDF.co
        }
      });

      // Manejar la respuesta de la API
      if (response.data && response.data.url) {
        setCompressedFile(response.data.url);
        alert("Archivo comprimido exitosamente.");
      }
    } catch (error) {
      console.error("Error al comprimir el PDF:", error);
      alert("Hubo un error al comprimir el PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Comprimir PDF</h1>
      <input
        type="text"
        placeholder="Ingresa el enlace del PDF"
        value={url}
        onChange={handleUrlChange}
      />
      <button onClick={handleCompress} disabled={loading}>
        {loading ? "Comprimiendo..." : "Comprimir PDF"}
      </button>

      {compressedFile && (
        <div>
          <h2>Archivo Comprimido:</h2>
          <a href={compressedFile} target="_blank" rel="noopener noreferrer">
            Descargar PDF Comprimido
          </a>
        </div>
      )}
    </div>
  );
};
