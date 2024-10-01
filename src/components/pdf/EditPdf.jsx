import React, { useState } from 'react';

import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import PptxGenJS from 'PptxGenJS'

// Necesario para cargar el trabajador de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.mjs';

const EditPdf = () => {
    const [file, setFile] = useState(null);
    const [ocrText, setOcrText] = useState('');
    const [convertedDoc, setConvertedDoc] = useState(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFile(file);
    };
  
    const pdfPageToImage = async (pdf, pageNo) => {
      const page = await pdf.getPage(pageNo);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      return canvas.toDataURL();
    };
  
    const performOcr = async (imageData) => {
      const { data: { text } } = await Tesseract.recognize(imageData, 'eng');
      return text;
    };
  
    const convertPdfToWord = async (pdfBytes) => {
      try {
        const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
  
        let ocrResults = '';
  
        for (let i = 1; i <= numPages; i++) {
          const imageData = await pdfPageToImage(pdf, i);
          const ocrResult = await performOcr(imageData);
          ocrResults += `Page ${i}:\n${ocrResult}\n\n`;
        }
  
        setOcrText(ocrResults);
  
        const pptx = new PptxGenJS();
        const slide = pptx.addSlide();
        slide.addText(ocrResults, { x: 0.5, y: 0.5, fontSize: 14 });
  
        pptx.writeFile({ fileName: 'converted.docx' }).then((fileName) => {
          console.log(`Saved to ${fileName}`);
        });
  
      } catch (error) {
        console.error('Error converting PDF to Word:', error);
      }
    };
  
    const handleUpload = async () => {
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const pdfBytes = new Uint8Array(event.target.result);
            await convertPdfToWord(pdfBytes);
          } catch (error) {
            console.error('Error loading PDF:', error);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    };
  
    return (
      <div>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Convertir PDF a Word</button>
        {ocrText && (
          <div>
            <h3>Texto extraído por OCR:</h3>
            <pre>{ocrText}</pre>
          </div>
        )}
        {convertedDoc && (
          <div>
            <h3>Documento Word Convertido:</h3>
            <iframe src={convertedDoc} width="600" height="400"></iframe>
            <a href={convertedDoc} download="converted.docx">Descargar Documento Word</a>
          </div>
        )}
      </div>
    );
  };
  
  export default EditPdf;