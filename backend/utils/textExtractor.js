import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';
import fs from 'fs/promises';
import path from 'path';

/**
 * Extracts text from various file types (PDF, images, TXT)
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === '.pdf') {
      return await extractFromPDF(filePath);
    } else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      return await extractFromImage(filePath);
    } else if (ext === '.txt') {
      return await extractFromText(filePath);
    } else {
      throw new Error(`Niet-ondersteund bestandstype: ${ext}`);
    }
  } catch (error) {
    throw new Error(`Fout bij tekstextractie uit ${ext}: ${error.message}`);
  }
}

/**
 * Extract text from PDF
 */
async function extractFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);

  if (!data.text || data.text.trim().length === 0) {
    throw new Error('Geen tekst gevonden in PDF. Mogelijk is het een afbeelding-PDF.');
  }

  console.log(`✅ PDF verwerkt: ${data.numpages} pagina's, ${data.text.length} karakters`);
  return data.text;
}

/**
 * Extract text from image using OCR
 */
async function extractFromImage(filePath) {
  console.log('🔍 OCR gestart voor afbeelding...');

  const { data: { text } } = await Tesseract.recognize(
    filePath,
    'nld', // Nederlands
    {
      logger: m => {
        if (m.status === 'recognizing text') {
          console.log(`OCR voortgang: ${Math.round(m.progress * 100)}%`);
        }
      }
    }
  );

  if (!text || text.trim().length === 0) {
    throw new Error('Geen tekst herkend in afbeelding. Zorg voor een duidelijke, leesbare afbeelding.');
  }

  console.log(`✅ OCR voltooid: ${text.length} karakters herkend`);
  return text;
}

/**
 * Extract text from plain text file
 */
async function extractFromText(filePath) {
  const text = await fs.readFile(filePath, 'utf-8');

  if (!text || text.trim().length === 0) {
    throw new Error('Tekstbestand is leeg');
  }

  console.log(`✅ Tekstbestand ingelezen: ${text.length} karakters`);
  return text;
}
