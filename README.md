# Bonuscheck AH 🛒

Een interne webapp voor Albert Heijn om marketinguitingen automatisch te controleren op correcte weergave van Bonusaanbiedingen door ze te vergelijken met de definitieve Bonusfolder.

![Albert Heijn](https://img.shields.io/badge/Albert%20Heijn-Internal%20Tool-00A1E0?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)

## 📘 Doel

De app helpt Marketing en Studio teams om marketinguitingen (zoals winkelposters, online banners, social media posts) te controleren op:
- **Correcte productnamen** (semantische gelijkenis toegestaan)
- **Exacte prijzen** (moet 100% overeenkomen)
- **Juiste actievormen** ("1+1 gratis", "25% korting", "2e halve prijs", etc.)

## ✨ Features

- 📁 **Drag & drop upload** voor bestanden (PDF, afbeeldingen, TXT)
- 🔍 **Automatische tekstextractie** via:
  - PDF parsing (pdf-parse)
  - OCR voor afbeeldingen (Tesseract.js)
- 🤖 **AI-vergelijking** via OpenAI GPT-4
- 📊 **Overzichtelijke resultaten tabel**
- 📥 **CSV export** functionaliteit
- 🎨 **Albert Heijn huisstijl**
- ♿ **Responsive design**

## 🏗️ Technologie Stack

### Backend
- Node.js + Express
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Tesseract.js (OCR)
- OpenAI API (AI comparison)

### Frontend
- React 18
- Vite (build tool)
- react-dropzone (drag & drop)
- Axios (HTTP client)

## 📦 Installatie

### Vereisten
- Node.js 18+ en npm
- OpenAI API key

### Stap 1: Clone de repository

```bash
git clone <repository-url>
cd claude-code-bonus
```

### Stap 2: Backend setup

```bash
cd backend
npm install
```

Maak een `.env` bestand aan in de `backend` directory:

```env
PORT=3001
OPENAI_API_KEY=sk-your-api-key-here
```

**Let op:** Vraag de OpenAI API key aan bij je IT-afdeling.

### Stap 3: Frontend setup

```bash
cd ../frontend
npm install
```

## 🚀 Applicatie Starten

### Development mode

Open twee terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend draait op: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend draait op: `http://localhost:3000`

Open je browser en ga naar: **http://localhost:3000**

### Production build

**Frontend:**
```bash
cd frontend
npm run build
```

De build output staat in `frontend/dist/`

**Backend:**
```bash
cd backend
npm start
```

## 📖 Gebruiksinstructies

### 1️⃣ Bonusfolder uploaden

- Klik op het eerste uploadvak "Bonusfolder Uploaden"
- Sleep de definitieve Bonusfolder hierin (PDF, PNG, JPG of TXT)
- Of klik om handmatig te selecteren
- De folder wordt automatisch verwerkt en tekst wordt geëxtraheerd

**Let op:** Upload dit 1x per week. Alle vergelijkingen gebruiken deze als referentie.

### 2️⃣ Marketinguiting uploaden en vergelijken

- Klik op het tweede uploadvak "Marketinguiting Uploaden"
- Sleep een marketinguiting hierin (winkelposters, online banners, etc.)
- Klik op "Start Vergelijking" of de upload start automatisch
- Wacht enkele seconden terwijl de AI de vergelijking uitvoert

### 3️⃣ Resultaten bekijken

De resultaten tonen:
- ✅ **Correct** - Alles klopt
- ❌ **Fout** - Er is een afwijking (prijs, actievorm, of product niet gevonden)

Elke fout bevat een duidelijke opmerking met details.

### 4️⃣ Resultaten exporteren

- Klik op "📥 Export naar CSV"
- Download het bestand voor verdere verwerking in Excel

### 5️⃣ Nieuwe vergelijking

- Klik op "Nieuwe Vergelijking" om een nieuwe marketinguiting te uploaden
- De bonusfolder blijft geladen (tenzij je een nieuwe uploadt)

## 🎨 Design

De app gebruikt de officiële Albert Heijn huisstijl:

- **Primair blauw:** `#00A1E0`
- **Accent blauw:** `#0077B6`
- **Bonus oranje:** `#FF7900` (knoppen en waarschuwingen)
- **Achtergrond:** `#FFFFFF` / `#F5F5F5`
- **Typografie:** Open Sans

## 📁 Projectstructuur

```
claude-code-bonus/
├── backend/
│   ├── server.js                 # Express server
│   ├── utils/
│   │   ├── textExtractor.js      # PDF/OCR tekstextractie
│   │   └── aiComparison.js       # OpenAI API integratie
│   ├── uploads/                  # Tijdelijke uploads (niet in git)
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── BonusfolderUpload.jsx
│   │   │   ├── UitingUpload.jsx
│   │   │   ├── ResultsTable.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── *.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🔧 Configuratie

### OpenAI Model

Standaard gebruikt de app `gpt-4o-mini` voor snelheid en kosten-efficiëntie.

Voor hogere nauwkeurigheid, pas aan in `backend/utils/aiComparison.js`:

```javascript
model: 'gpt-4o' // Of 'gpt-4-turbo'
```

### Claude API (alternatief)

De code bevat ook commented-out support voor Anthropic Claude.

Om Claude te gebruiken:
1. Installeer `@anthropic-ai/sdk`
2. Voeg `ANTHROPIC_API_KEY` toe aan `.env`
3. Uncomment de Claude implementatie in `aiComparison.js`

### OCR Taal

Standaard is OCR ingesteld op Nederlands (`nld`).

Wijzig in `backend/utils/textExtractor.js`:

```javascript
'nld' // Nederlands
// of 'eng' voor Engels
```

## 🐛 Troubleshooting

### "OPENAI_API_KEY niet gevonden"
- Controleer of `.env` bestand bestaat in `backend/` directory
- Controleer of de key correct is opgegeven
- Herstart de backend server

### OCR werkt niet goed
- Zorg voor hoge resolutie afbeeldingen (minimaal 300 DPI)
- Gebruik duidelijke, leesbare tekst
- PDF met afbeeldingen: exporteer eerst als afbeelding of gebruik OCR-PDF

### Upload faalt
- Check bestandsgrootte (max 10MB)
- Ondersteunde formaten: PDF, PNG, JPG, TXT
- Check console voor foutmeldingen

### Backend bereikbaar?
- Controleer of backend draait op poort 3001
- Check `http://localhost:3001/api/health`

## 📊 API Endpoints

### `GET /api/health`
Health check endpoint

### `POST /api/upload-bonusfolder`
Upload bonusfolder
- Body: `multipart/form-data`
- Field: `bonusfolder` (file)

### `GET /api/bonusfolder-status`
Check of bonusfolder geüpload is

### `POST /api/compare-uiting`
Upload en vergelijk marketinguiting
- Body: `multipart/form-data`
- Field: `uiting` (file)

## 🔐 Security

- File upload beperkt tot 10MB
- Alleen PDF, PNG, JPG, TXT toegestaan
- Bestanden worden verwijderd na verwerking
- CORS ingeschakeld voor development

**Voor productie:**
- Voeg authenticatie toe
- Configureer CORS specifiek voor je domein
- Gebruik HTTPS
- Sla bonusfolders op in database i.p.v. in-memory

## 📝 Licentie

Interne tool voor Albert Heijn. Niet voor publieke distributie.

## 👥 Contact

Voor vragen of problemen, neem contact op met het IT-team.

---

**Gemaakt voor Albert Heijn Marketing & Studio Teams** 🛒
