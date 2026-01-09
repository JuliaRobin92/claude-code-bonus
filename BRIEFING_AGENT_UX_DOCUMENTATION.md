# Briefing Agent - Wave 1: Fundament
## UX/UI Prototype Documentatie

---

## Executive Summary

Dit prototype is een **functionele compleetheid checker** voor marketingbriefings. Het geeft marketeers zekerheid dat hun briefing alle noodzakelijke basisinformatie bevat vóór verzending naar vervolgdisciplines. Het is een basisbewaker, geen strategisch adviseur.

**Kernvraag:** "Is deze briefing functioneel compleet om mee verder te werken?"

---

## 1. Hoofdscherm: Briefing Overzicht

### Layout & Structuur

Het hoofdscherm bestaat uit drie hoofdgebieden:

#### 1.1 Sticky Header
**Waarom dit zekerheid geeft:**
- Gebruiker ziet altijd de voortgang, ongeacht waar ze in de briefing zitten
- Real-time feedback op compleetheid voorkomt verrassingen bij verzending
- Percentage en fractie (bijv. "6 van 8 secties compleet") geven concrete progressie-indicatie

**Componenten:**
- **Titel & Subtitel**: "Briefing Agent" + "Functionele compleetheid check"
  - Communiceert duidelijk het doel: checken, niet adviseren
- **Voortgangsindicator**:
  - Percentage (groot, visueel prominent in #00ADE6)
  - Tekst: "X van Y secties compleet"
  - Voortgangsbalk met animatie (subtiel bewegend "shine" effect)

#### 1.2 Introductie Blok
**Waarom dit zekerheid geeft:**
- Stelt verwachtingen: wat moet er gebeuren voor verzending?
- Korte, neutrale instructie zonder jargon
- Visuele accent (blauwe linker border) trekt aandacht zonder afleidend te zijn

**Inhoud:**
> "Vul alle verplichte secties in om zekerheid te hebben dat deze briefing functioneel compleet is voor verzending naar vervolgdisciplines."

#### 1.3 Briefing Secties (9 secties)
Elke sectie heeft een vast patroon voor consistentie en voorspelbaarheid.

---

## 2. Sectie Component: Status & Feedback

### 2.1 Sectie Header (Collapsed State)

**Visuele Elementen:**

1. **Sectienummer** (1-9)
   - In grijs rondje, links uitgelijnd
   - Geeft structuur en volgorde aan

2. **Sectietitel**
   - Helder, beschrijvend (bijv. "Context & Achtergrond")

3. **"Verplicht" Badge** (indien van toepassing)
   - Rood accent, uppercase
   - Communiceert expliciete verwachting

4. **Status Tekst**
   - "Compleet" / "Incompleet" / "X van Y verplicht" / "Optioneel"
   - Direct, functioneel taalgebruik

5. **Status Icoon**
   - **Groen vinkje**: Alle verplichte velden ingevuld
   - **Oranje cirkel met stip**: Gedeeltelijk ingevuld
   - **Rode lege cirkel**: Niet ingevuld
   - **Grijze gestippelde cirkel**: Optionele sectie

6. **Expand/Collapse Pijl**
   - Draait 180° bij uitklappen (subtiele animatie)

**Sectie Border:**
- **Groen** (complete)
- **Oranje** (partial)
- **Rood** (incomplete)
- **Grijs** (optional)

**Waarom dit zekerheid geeft:**
- Status is in één oogopslag duidelijk (kleur + icoon + tekst = triple redundancy)
- Geen interpretatie nodig: "compleet" betekent verzendklaar
- Visuele hiërarchie maakt prioritering moeiteloos

---

### 2.2 Sectie Content (Expanded State)

#### A. Ontbrekende Velden Waarschuwing
**Wanneer zichtbaar:** Als er verplichte velden leeg zijn

**Uiterlijk:**
- Rode achtergrond (#fef2f2)
- Rode border
- Uppercase label: "ONTBREKENDE VERPLICHTE VELDEN:"
- Bulleted lijst van exacte veldnamen

**Waarom dit zekerheid geeft:**
- Geen raden: exacte lijst van wat ontbreekt
- Actionable feedback: gebruiker weet precies wat te doen
- Verdwijnt automatisch zodra velden zijn ingevuld (instant validation)

#### B. Formuliervelden
**Veldtypen:**
- Tekst input (korte antwoorden)
- Textarea (langere antwoorden, bijv. context, doelgroep)
- Datum picker (deadlines)

**Visuele Indicatoren:**
- **Label** met rode asterisk (*) voor verplichte velden
- **Placeholder** met zachte hint ("Voer kernboodschap in...")
- **Focus state**: Blauwe border (#00ADE6) + subtiele shadow
- **Clean borders**: 2px solid voor duidelijkheid

**Waarom dit zekerheid geeft:**
- Duidelijk onderscheid tussen verplicht en optioneel (asterisk)
- Focus state geeft feedback tijdens invullen
- Geen validatie-errors tijdens typen (voorkomt frustratie)
- Validatie gebeurt op sectie-niveau, niet per veld

---

## 3. Voortgangsindicator (Header Component)

### Visuele Elementen

**Stats Bar:**
- Links: "X van Y secties compleet" (grijs, beschrijvend)
- Rechts: Percentage (groot, #00ADE6, bold)

**Progress Bar:**
- Achtergrond: Lichtgrijs (#e1e8ed)
- Voorgrond: Gradient blauw (#00ADE6 → #0095c9)
- Hoogte: 12px, volledig afgerond
- **Animatie**:
  - Width transition (0.6s cubic-bezier) bij vooruitgang
  - Subtiel "shine" effect (bewegende highlight) voor vitaliteit

**Waarom dit zekerheid geeft:**
- Dubbele representatie (fractie + percentage) voor verschillende voorkeuren
- Visuele vooruitgang voelt bevredigend, moedigt voltooiing aan
- Altijd zichtbaar (sticky) = continue bewustzijn van status
- Animatie geeft feedback op acties (niet alleen statisch getal)

---

## 4. Completion Status Component

Dit component verschijnt onderaan de pagina en heeft twee states:

### State 1: Incompleet
**Visueel:**
- Oranje border (#f59e0b)
- Oranje gradient achtergrond (wit → licht oranje)
- Oranje waarschuwingsicoon (cirkel met uitroepteken)
- Titel: "Briefing is nog niet compleet" (oranje tekst)
- Boodschap: "Vul alle verplichte secties in om de briefing verzendklaar te maken. Nog X% te gaan."
- **Button**: Grijs, disabled, "Briefing verzenden"

**Waarom dit zekerheid geeft:**
- Helder signaal: dit kan nog niet verzonden worden
- Specifieke feedback: hoeveel er nog te doen is (percentage)
- Disabled button voorkomt frustratie van niet-werkende klik
- Neutrale toon, geen schuld of druk

### State 2: Verzendklaar
**Visueel:**
- Groen border (#10b981)
- Groen gradient achtergrond (wit → licht groen)
- Groen vinkje icoon met subtiele pulse animatie
- Titel: "Briefing is verzendklaar" (groen tekst)
- Boodschap: "Alle verplichte secties zijn ingevuld. Deze briefing bevat voldoende basisinformatie om mee verder te werken."
- **Button**: Blauw (#00ADE6), enabled, "Briefing verzenden"
  - Hover: Donkerder blauw, lift effect (translateY -2px)
  - Shadow: Blauwe glow (#00ADE6 met opacity)

**Waarom dit zekerheid geeft:**
- Duidelijke "permission to send": groen licht om verder te gaan
- Bevestigend zonder overdreven enthousiasme
- Functionele bewoording: "voldoende basisinformatie" (geen kwaliteitsoordeel)
- Actieve button nodigt uit tot verzending
- Pulse animatie trekt subtiel de aandacht naar succes

---

## 5. Interactiepatronen

### 5.1 Sectie Uitklappen/Inklappen
- **Trigger**: Klik op gehele header
- **Feedback**: Hover state (lichte grijze achtergrond)
- **Animatie**: Pijl draait 180°, content slide-down (0.3s ease)
- **Waarom**: Overzichtelijkheid behouden, focus op één sectie tegelijk

### 5.2 Formulier Invullen
- **Real-time updates**: Status wijzigt zodra veld is ingevuld (geen "save" button)
- **Sectiestatus**: Update zodra alle verplichte velden compleet zijn
- **Voortgang**: Header percentage update instant
- **Completion status**: Wijzigt naar "verzendklaar" zodra laatste sectie compleet is
- **Waarom**: Geen cognitieve last van "heb ik opgeslagen?", continue feedback loop

### 5.3 Status Transitions
Alle status wijzigingen hebben subtiele animaties:
- Border kleur: 0.3s ease
- Progress bar: 0.6s cubic-bezier (smooth acceleration)
- Icon opacity: 0.2s ease
- **Waarom**: Geeft gevoel van responsiviteit, menselijkere interface

---

## 6. Typografie & Kleuren

### Typografie
- **Font**: Systeem fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
  - Professioneel, native feel, snel te laden
- **Hiërarchie**:
  - H1 (Briefing Agent): 28px, 600 weight
  - H2 (Sectietitels): 18px, 600 weight
  - Body: 15px, 400 weight
  - Labels: 14px, 600 weight
  - Kleine tekst: 13-14px
- **Tracking**: Licht negatief (-0.3px tot -0.5px) voor premium feel
- **Line-height**: 1.6 voor leesbaarheid

### Kleurenschema

**Primaire Kleuren:**
- **#00ADE6**: Hoofdkleur (buttons, accenten, voortgang)
  - Helder, professioneel, energiek zonder opdringerig
- **#0095c9**: Donkerder blauw (hover states)

**Status Kleuren:**
- **#10b981**: Groen (compleet, succes)
- **#f59e0b**: Oranje (partial, attentie)
- **#ef4444**: Rood (incompleet, verplicht)
- **#94a3b8**: Grijs (optioneel, secundair)

**Neutrals:**
- **#1a2332**: Donkergrijs (primaire tekst)
- **#475569**: Medium grijs (subtitels)
- **#64748b**: Licht grijs (secondary text)
- **#e1e8ed**: Borders, backgrounds
- **#f8fafc**: Subtiele backgrounds
- **#ffffff**: Content achtergronden

**Achtergrond:**
- Lichte gradient: #f5f7fa → #e8ecf1 (dashboard-achtig, kalm)

**Waarom deze kleuren:**
- Blauw = vertrouwen, professionaliteit (geen speelsheid)
- Status kleuren volgen universele conventies
- Hoog contrast voor toegankelijkheid
- Subtiele tinten voor rust en focus

---

## 7. Responsive Gedrag

**Breakpoint:** 768px

**Mobile aanpassingen:**
- Header: Stacked layout (progress indicator onder titel)
- Completion status: Vertical layout, centered text
- Secties: Kleinere padding
- Button: Full width
- Progress indicator: 100% breedte

**Waarom:**
- Touch-friendly targets
- Leesbare tekst op kleine schermen
- Behoud van alle functionaliteit

---

## 8. Toon & Taalgebruik

### Principes
- **Functioneel**: "Compleet", "Incompleet", "Verplicht"
- **Neutraal**: Geen "Goed gedaan!", "Bijna klaar!", "Je bent er bijna!"
- **Beschrijvend**: "Alle verplichte secties zijn ingevuld" vs "Klaar om te verzenden!"
- **Actionable**: "Vul alle verplichte secties in" vs "Vergeet niet om alles in te vullen"

**Geen:**
- Emoji's
- AI-taal ("Ik zie dat...", "Laten we...")
- Gamificatie ("Level up!", badges)
- Overdreven positiviteit

**Wel:**
- Directe feedback
- Concrete instructies
- Zakelijke maar menselijke toon

**Waarom:**
Dit is een professionele tool voor dagelijks gebruik door marketeers. Overdreven vriendelijkheid of playfulness ondermijnt de geloofwaardigheid. Denk aan Slack (professioneel), niet aan Duolingo (speels).

---

## 9. Schermen & States Overzicht

### Scherm 1: Lege Briefing (0% Compleet)
**Kenmerken:**
- Alle secties: rode border, "Incompleet" status
- Progress bar: 0%, oranje completion status
- Eerste sectie standaard open (context)
- Duidelijke call to action: begin met invullen

**Gebruikerszekerheid:**
"Ik zie precies waar ik moet beginnen en wat er van me verwacht wordt."

---

### Scherm 2: Gedeeltelijk Ingevuld (bijv. 50% Compleet)
**Kenmerken:**
- Mix van groene (compleet) en rode (incompleet) secties
- Sommige secties: oranje border (gedeeltelijk)
- Progress bar: 50%, oranje completion status
- Ontbrekende velden warnings in openstaande secties

**Gebruikerszekerheid:**
"Ik zie mijn voortgang en weet precies welke secties nog aandacht nodig hebben."

---

### Scherm 3: Volledig Compleet (100%)
**Kenmerken:**
- Alle verplichte secties: groene border, vinkje
- Progress bar: 100%
- Groene completion status met "Verzendklaar" boodschap
- Button enabled, visueel prominent

**Gebruikerszekerheid:**
"Ik heb de zekerheid dat deze briefing functioneel compleet is en verzonden kan worden zonder terugkoppeling over ontbrekende informatie."

---

## 10. Ontwerprationale: Waarom Dit Zekerheid Geeft

### 10.1 Visuele Redundantie
Elke status wordt op 3 manieren gecommuniceerd:
1. **Kleur** (rood/oranje/groen)
2. **Icoon** (cirkel/vinkje)
3. **Tekst** ("Compleet"/"Incompleet")

**Waarom:** Toegankelijk voor kleurenblinden, verschillende leerstijlen, geen ruimte voor interpretatie.

### 10.2 Continue Feedback Loop
- Elke actie (veld invullen) → directe visuele update
- Geen wachten op "save" of "validate"
- Real-time progress → gevoel van controle

**Waarom:** Vermindert onzekerheid ("Telt dit al mee?"), verhoogt gevoel van agency.

### 10.3 Expliciete Verwachtingen
- "Verplicht" badges
- Rode asterisks
- Exacte lijsten van ontbrekende velden

**Waarom:** Geen raden, geen verrassingen. Gebruiker weet altijd de "rules of the game".

### 10.4 Single Source of Truth
- Geen losse documenten
- Geen externe checklists
- Alles in één interface

**Waarom:** Cognitieve load verminderen, fouten door gemiste informatie voorkomen.

### 10.5 Non-Blocking Validatie
- Geen validatie tijdens typen
- Geen pop-ups of modals
- Feedback op sectie-niveau

**Waarom:** Gebruiker blijft in flow, geen frustratie door premature validatie.

### 10.6 Verzendklaar = Objectief Criterium
- Binaire state: compleet of niet
- Gebaseerd op data, niet op oordeel
- Geen kwaliteitsbeoordeling

**Waarom:** Vertrouwen in het systeem: het beoordeelt niet, het checkt alleen of info er is.

---

## 11. Technische Implementatie Notes

### Frontend Stack
- **React 18** met hooks
- **Vite** voor snelle development
- **Pure CSS** (geen externe UI libraries)
- **Geen backend** voor prototype (state in React useState)

### Key Features
- **Controlled components**: Alle form inputs
- **Derived state**: Status berekeningen op basis van briefingData
- **Memoization**: useMemo voor performance bij herberekeningen
- **CSS animations**: Smooth transitions zonder JS

### File Structure
```
/frontend/src/components/
  ├── BriefingAgent.jsx       (Main container)
  ├── BriefingAgent.css
  ├── BriefingSection.jsx     (Individual sections)
  ├── BriefingSection.css
  ├── ProgressIndicator.jsx   (Header progress)
  ├── ProgressIndicator.css
  ├── CompletionStatus.jsx    (Bottom status + button)
  └── CompletionStatus.css
```

### Running the Prototype
```bash
cd frontend
npm install
npm run dev
# Navigate to http://localhost:5173/briefing.html
```

---

## 12. Volgende Stappen (Buiten Scope van Wave 1)

**Wave 1 focus:** Functionele compleetheid alleen.

**Toekomstige waves zouden kunnen bevatten:**
- Integratie met bestaande briefing systems
- Opslaan/laden van briefings (database)
- Notificaties naar stakeholders
- Export naar PDF/Word
- Template keuze (verschillende briefing types)
- Optioneel: lichte suggesties voor veelvoorkomende missende info (maar geen inhoudelijk advies)

**Dit prototype is bedoeld als:**
- Conceptvalidatie
- User testing baseline
- Design system referentie
- Stakeholder alignment tool

---

## 13. Conclusie

Dit prototype beantwoordt de kernvraag **"Is deze briefing functioneel compleet?"** door:

1. **Transparantie**: Elke sectie, elk veld, elke verwachting is expliciet
2. **Continuous feedback**: Real-time status updates
3. **Actionable guidance**: Exacte lijsten van wat ontbreekt
4. **Objectieve criteria**: Geen interpretatie nodig
5. **Professional aesthetics**: Vertrouwen door degelijk design

**Het resultaat:**
Een marketeer kan met 100% zekerheid een briefing verzenden, wetende dat alle vervolgdisciplines de basisinformatie hebben om mee te werken. Heen-en-weer communicatie over ontbrekende info wordt geëlimineerd.

**Design filosofie:**
Professionele rust. Geen AI-theater, geen spelletjes, gewoon solide tooling die werkt.

---

**Prototype versie:** 1.0
**Laatst bijgewerkt:** Januari 2026
**Designer/Developer:** Claude Code AI Assistant
**Voor:** UX Review & Stakeholder Presentatie
