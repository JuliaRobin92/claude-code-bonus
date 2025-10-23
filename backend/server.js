import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { extractTextFromFile } from './utils/textExtractor.js';
import { compareWithAI } from './utils/aiComparison.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuratie voor file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limiet
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|png|jpg|jpeg|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Alleen PDF, PNG, JPG en TXT bestanden zijn toegestaan'));
    }
  }
});

// In-memory opslag voor bonusfolder (in productie zou je een database gebruiken)
let currentBonusFolder = null;

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bonuscheck AH API is actief' });
});

// Upload bonusfolder
app.post('/api/upload-bonusfolder', upload.single('bonusfolder'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Geen bestand geüpload' });
    }

    console.log('Bonusfolder ontvangen:', req.file.originalname);

    // Extract text from uploaded file
    const text = await extractTextFromFile(req.file.path);

    currentBonusFolder = {
      filename: req.file.originalname,
      text: text,
      uploadDate: new Date().toISOString()
    };

    // Verwijder bestand na verwerking
    await fs.unlink(req.file.path);

    res.json({
      success: true,
      message: 'Bonusfolder succesvol geüpload en verwerkt',
      filename: req.file.originalname,
      textLength: text.length
    });
  } catch (error) {
    console.error('Error processing bonusfolder:', error);
    res.status(500).json({ error: 'Fout bij verwerken van bonusfolder: ' + error.message });
  }
});

// Get current bonusfolder status
app.get('/api/bonusfolder-status', (req, res) => {
  if (currentBonusFolder) {
    res.json({
      uploaded: true,
      filename: currentBonusFolder.filename,
      uploadDate: currentBonusFolder.uploadDate
    });
  } else {
    res.json({ uploaded: false });
  }
});

// Upload en vergelijk marketinguiting
app.post('/api/compare-uiting', upload.single('uiting'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Geen bestand geüpload' });
    }

    if (!currentBonusFolder) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: 'Geen bonusfolder geüpload. Upload eerst de bonusfolder.' });
    }

    console.log('Marketinguiting ontvangen:', req.file.originalname);

    // Extract text from uploaded file
    const uitingText = await extractTextFromFile(req.file.path);

    // Verwijder bestand na verwerking
    await fs.unlink(req.file.path);

    // Vergelijk met AI
    const comparisonResults = await compareWithAI(
      currentBonusFolder.text,
      uitingText
    );

    res.json({
      success: true,
      filename: req.file.originalname,
      results: comparisonResults
    });
  } catch (error) {
    console.error('Error comparing uiting:', error);
    res.status(500).json({ error: 'Fout bij vergelijken: ' + error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Bestand is te groot. Maximaal 10MB toegestaan.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Bonuscheck AH backend draait op http://localhost:${PORT}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
});
