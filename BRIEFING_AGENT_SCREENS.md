# Briefing Agent - Scherm Beschrijvingen

Dit document beschrijft de drie belangrijkste schermen/states van het Briefing Agent prototype.

---

## 📱 Scherm 1: Lege Briefing (0% Compleet)

### Wat zie je

**Header:**
- Titel: "Briefing Agent" + subtitel "Functionele compleetheid check"
- Voortgangsindicator: "0 van 8 secties compleet" + grote "0%" in blauw
- Progress bar: volledig grijs (leeg)

**Introductie blok:**
Blauwe linker border met instructie:
> "Vul alle verplichte secties in om zekerheid te hebben dat deze briefing functioneel compleet is voor verzending naar vervolgdisciplines."

**Briefing secties (9 total):**
- Sectie 1 "Context & Achtergrond": **OPEN** (standaard)
  - Rode border
  - Rode badge "VERPLICHT"
  - Status: rode lege cirkel + "Incompleet"
  - Rode waarschuwing box: "ONTBREKENDE VERPLICHTE VELDEN:"
    - Huidige situatie
    - Uitdaging/Probleem
  - 3 lege formuliervelden zichtbaar
    - 2 met rode asterisk (verplicht)
    - 1 zonder (optioneel)

- Sectie 2-8: **INGEKLAPT** (collapsed)
  - Alle met rode border
  - Alle met "VERPLICHT" badge
  - Alle met rode status "Incompleet"
  - Pijl naar beneden (kan uitgeklapt worden)

- Sectie 9 "Beschikbare Assets": **INGEKLAPT**
  - Grijze border (geen rood)
  - Grijze gestippelde cirkel + "Optioneel"
  - Geen "VERPLICHT" badge

**Bottom status:**
- Oranje border, oranje gradient achtergrond
- Oranje waarschuwingsicoon (cirkel met uitroepteken)
- Titel in oranje: "Briefing is nog niet compleet"
- Tekst: "Vul alle verplichte secties in om de briefing verzendklaar te maken. Nog 100% te gaan."
- **Button: Grijs, disabled** - "Briefing verzenden"

### Gebruiker gedachte
_"Ik zie duidelijk waar ik moet beginnen. Sectie 1 staat al open en toont precies welke velden ik moet invullen. Ik weet dat ik nog 8 secties moet voltooien."_

---

## 📱 Scherm 2: Gedeeltelijk Ingevuld (50% Compleet)

### Wat zie je

**Header:**
- Voortgangsindicator: "4 van 8 secties compleet" + grote "50%" in blauw
- Progress bar: **halverwege gevuld** met blauwe gradient
  - Subtiel "shine" animatie effect over de blauwe balk

**Briefing secties:**

✅ **Sectie 1-4: COMPLEET**
- **Groene border**
- Groen vinkje icoon + "Compleet"
- Ingeklapt (maar kunnen heropend worden als check nodig is)

⚠️ **Sectie 5: GEDEELTELIJK**
- **Oranje border**
- Oranje cirkel met stip + "2 van 3 verplicht"
- Uitklapt laat zien:
  - 2 ingevulde velden (met waarde)
  - 1 leeg verplicht veld
  - Oranje waarschuwing: "ONTBREKENDE VERPLICHTE VELDEN: Aantal deliverables"

❌ **Sectie 6-8: INCOMPLEET**
- Rode border
- Rode lege cirkel + "Incompleet"
- Ingeklapt

⚪ **Sectie 9: OPTIONEEL**
- Grijze border
- Nog steeds "Optioneel" status
- Telt niet mee voor de 50% voortgang

**Bottom status:**
- Nog steeds **oranje** (want niet compleet)
- Icoon: waarschuwing
- Titel: "Briefing is nog niet compleet"
- Tekst: "Vul alle verplichte secties in om de briefing verzendklaar te maken. Nog 50% te gaan."
- **Button: Grijs, disabled** - "Briefing verzenden"

### Gebruiker gedachte
_"Ik ben al halverwege! Ik zie precies welke secties al goed zijn (groen), waar ik bijna klaar ben (oranje), en wat ik nog moet doen (rood). De voortgang motiveert me om door te gaan."_

---

## 📱 Scherm 3: Volledig Compleet (100%)

### Wat zie je

**Header:**
- Voortgangsindicator: "8 van 8 secties compleet" + grote **"100%"** in blauw
- Progress bar: **volledig gevuld** met blauwe gradient
  - Continue shine animatie als visuele "beloning"

**Briefing secties:**

✅ **Alle verplichte secties (1-8): COMPLEET**
- **Groene border** op alle 8 secties
- Groen vinkje + "Compleet" op elke sectie
- Alle ingeklapt (overzichtelijk)
- Bij uitklappen: alle velden hebben content

⚪ **Sectie 9: OPTIONEEL**
- Grijze border (niet ingevuld, maar dat is ok)
- Of: als ingevuld → groene border + "Compleet"
  - Maar telt niet mee voor verzendklaar status

**Bottom status:** 🎉
- **GROEN border**, groene gradient achtergrond
- **Groen vinkje icoon** met subtiele **pulse animatie** (in/out breathing effect)
- Titel in **groen**: "Briefing is verzendklaar"
- Tekst: "Alle verplichte secties zijn ingevuld. Deze briefing bevat voldoende basisinformatie om mee verder te werken."
- **Button: BLAUW (#00ADE6), ENABLED** - "Briefing verzenden"
  - Bij hover: donkerder blauw + lift effect (omhoog)
  - Blauwe glow shadow

### Gebruiker gedachte
_"Perfect! Ik zie direct dat alles compleet is. Het groene vinkje en de actieve button geven me de zekerheid dat ik nu kan verzenden zonder me zorgen te maken over ontbrekende informatie. Ik kan met vertrouwen op 'Verzenden' klikken."_

---

## 🎨 Visuele Progressie Samenvatting

| Element | 0% | 50% | 100% |
|---------|-------|--------|---------|
| **Progress bar** | Leeg (grijs) | Half vol (blauw) | Vol (blauw) |
| **Secties** | Allemaal rood | Mix: groen/oranje/rood | Allemaal groen |
| **Completion box** | Oranje + waarschuwing | Oranje + waarschuwing | Groen + vinkje |
| **Button** | Grijs, disabled | Grijs, disabled | Blauw, enabled |
| **Percentage** | 0% | 50% | 100% |
| **Status icoon** | ⚠️ Waarschuwing | ⚠️ Waarschuwing | ✅ Vinkje (animated) |

---

## 🔄 Interactie Details

### Sectie uitklappen
**Trigger:** Klik op sectie header
**Effect:**
- Pijl roteert 180° (smooth)
- Content slide-down animatie (0.3s ease)
- Toon formuliervelden
- Toon ontbrekende velden waarschuwing (indien van toepassing)

### Veld invullen
**Trigger:** Type in input/textarea
**Effect:**
- Real-time update (geen save button nodig)
- Wanneer verplicht veld compleet:
  - Verdwijnt uit "ontbrekende velden" lijst
  - Als laatste veld → waarschuwing box verdwijnt
  - Sectie status update (rood → oranje → groen)
  - Sectie border wijzigt kleur (animatie 0.3s)
  - Progress bar update (smooth 0.6s cubic-bezier)
  - Percentage in header update
- Wanneer alle verplichte secties compleet:
  - Bottom status: oranje → groen (fade 0.3s)
  - Button: grijs → blauw (fade + enable)
  - Vinkje pulse animatie start

### Button klik (bij 100%)
**Trigger:** Klik op "Briefing verzenden"
**Effect (in prototype):**
- Alert popup: "Briefing verzonden! (Dit is een prototype - geen echte verzending)"
- In productie zou dit leiden tot:
  - Data opslaan
  - Notificaties verzenden
  - Navigatie naar bevestiging

---

## 🎯 States Vergelijking

### State: Incomplete
**Wanneer:** < 100% verplichte secties compleet
**Kleur:** Oranje (attentie, niet blocking)
**Boodschap:** "Nog X% te gaan"
**Button:** Disabled (grijs)
**Gevoel:** _"Werk in uitvoering, maar geen stress"_

### State: Complete
**Wanneer:** 100% verplichte secties compleet
**Kleur:** Groen (succes, permission)
**Boodschap:** "Verzendklaar"
**Button:** Enabled (blauw, prominent)
**Gevoel:** _"Klaar om te gaan, vol vertrouwen"_

---

## 🖼️ Design Details Per Scherm

### Typografie Hiërarchie
- **H1** (Briefing Agent): 28px, bold
- **H2** (Sectietitels): 18px, semi-bold
- **Body** (instructies): 15px
- **Labels**: 14px, semi-bold
- **Status text**: 14px

### Spacing
- Sectie margins: 16px
- Sectie padding: 24-28px
- Velden gap: 24px
- Header padding: 32px

### Kleurcodes Recap
- **Blauw (brand)**: #00ADE6
- **Groen (succes)**: #10b981
- **Oranje (attentie)**: #f59e0b
- **Rood (actie)**: #ef4444
- **Grijs (optioneel)**: #94a3b8
- **Donker tekst**: #1a2332

---

## 📝 Wat ontbreekt (bewust)

Dit prototype toont **niet**:
- ❌ Error messages voor ongeldige input
- ❌ Character limits
- ❌ Rich text editing
- ❌ File uploads
- ❌ Auto-save indicators
- ❌ Version history
- ❌ Collaboration (meerdere gebruikers)

**Waarom niet?**
Wave 1 focust op **compleetheid check**, niet op volledige briefing management. Deze features komen in latere waves.

---

## 🎬 Aanbevolen Demo Flow

Voor stakeholder presentatie:

1. **Start bij 0%**
   - "Dit is een lege briefing. Je ziet direct dat 8 secties verplicht zijn."

2. **Vul sectie 1 in**
   - "Kijk hoe de status real-time wijzigt van rood naar groen."
   - "De voortgang springt naar 12.5% (1 van 8)."

3. **Open sectie 5, vul gedeeltelijk in**
   - "Oranje betekent: begonnen, maar niet af."
   - "De waarschuwing toont exact wat ontbreekt."

4. **Vul resterende secties snel in**
   - "Bij elke voltooide sectie zie je de progress bar groeien."

5. **100% bereiken**
   - "Kijk: alles wordt groen, het vinkje pulseert, de button activeert."
   - "Nu heb je 100% zekerheid dat deze briefing compleet is."

6. **Klik "Verzenden"**
   - "In productie zou dit de briefing doorsturen naar je team."

**Key message:** _"Geen verrassingen meer achteraf over ontbrekende informatie."_

---

**Einde scherm documentatie**
