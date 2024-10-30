import React, { useState } from 'react';

const UploadAndCompressPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [compressedFileUrl, setCompressedFileUrl] = useState("");

  // Maneja la selección del archivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileUrl("");
    setCompressedFileUrl("");
  };

  // Subir archivo a Cloudinary
  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "archivos"); // Reemplaza con tu preset de Cloudinary

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dacqimkdr/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFileUrl(data.secure_url); // Almacena el enlace directo al archivo en Cloudinary
    } catch (error) {
      console.error("Error al subir archivo:", error);
    } finally {
      setUploading(false);
    }
  };

  // Comprimir el archivo usando la API de api.pdf.co
  const handleCompress = async () => {
    if (!fileUrl) return;
    setCompressing(true);

    try {
      const pdfCoResponse = await fetch("https://api.pdf.co/v1/pdf/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "comanuel7@gmail.com_xxNTTCdRFqwbbr8MPWw8rJ1EremzCUpAlVRb3RrZtFaPDnpTKxZKykszkc8vIi6Z" // Reemplaza con tu API Key de api.pdf.co
        },
        body: JSON.stringify({ url: fileUrl }),
      });
      const pdfData = await pdfCoResponse.json();
      setCompressedFileUrl(pdfData.url); // URL del archivo comprimido de api.pdf.co
    } catch (error) {
      console.error("Error al comprimir archivo:", error);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Subiendo..." : "Subir a Cloudinary"}
      </button>
      <button onClick={handleCompress} disabled={!fileUrl || compressing}>
        {compressing ? "Comprimiendo..." : "Comprimir PDF"}
      </button>
      {fileUrl && (
        <p>Archivo subido a Cloudinary: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
      )}
      {compressedFileUrl && (
        <p>Archivo comprimido: <a href={compressedFileUrl} target="_blank" rel="noopener noreferrer">{compressedFileUrl}</a></p>
      )}
    </div>
  );
};

export default UploadAndCompressPDF;
