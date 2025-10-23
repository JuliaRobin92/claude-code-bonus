import OpenAI from 'openai';

/**
 * Vergelijkt marketinguiting met bonusfolder via AI
 * @param {string} bonusText - Tekst uit bonusfolder
 * @param {string} uitingText - Tekst uit marketinguiting
 * @returns {Promise<Array>} Array met vergelijkingsresultaten
 */
export async function compareWithAI(bonusText, uitingText) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY niet gevonden in environment variabelen. Voeg deze toe aan .env bestand.');
  }

  const openai = new OpenAI({ apiKey });

  const prompt = createComparisonPrompt(bonusText, uitingText);

  try {
    console.log('🤖 AI vergelijking gestart...');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Je bent een gespecialiseerde assistent voor Albert Heijn die marketinguitingen controleert op correctheid door ze te vergelijken met de officiële Bonusfolder. Je bent zeer nauwkeurig met prijzen en actievormen.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1, // Lage temperature voor consistente, feitelijke output
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    console.log('✅ AI vergelijking voltooid');

    // Parse JSON response
    const parsed = JSON.parse(content);

    // Verwacht format: { results: [...] } of direct een array
    const results = parsed.results || parsed;

    if (!Array.isArray(results)) {
      throw new Error('AI response is geen array');
    }

    return results;
  } catch (error) {
    console.error('❌ Fout bij AI vergelijking:', error);

    if (error.response) {
      throw new Error(`OpenAI API error: ${error.response.status} - ${error.response.data?.error?.message || 'Onbekende fout'}`);
    }

    throw new Error(`AI vergelijking mislukt: ${error.message}`);
  }
}

/**
 * Creëert de prompt voor AI vergelijking
 */
function createComparisonPrompt(bonusText, uitingText) {
  return `Je vergelijkt marketinguitingen met de officiële Bonusfolder van Albert Heijn.

**BONUSFOLDER:**
${bonusText}

**MARKETINGUITING:**
${uitingText}

**INSTRUCTIES:**
Controleer voor elke aanbieding uit de MARKETINGUITING of deze ook voorkomt in de BONUSFOLDER. Kijk naar:
- **Productnaam** (kleine semantische afwijkingen toegestaan, bijv. "AH Melk" vs "Albert Heijn Halfvolle Melk")
- **Actieprijs** (moet EXACT overeenkomen)
- **Actievorm** (zoals "1+1 gratis", "25% korting", "2e halve prijs", "van-voor" prijzen)

Geef per aanbieding een status:
- ✅ = Alles correct
- ❌ = Er is een afwijking

**OUTPUT FORMAT (JSON):**
Geef je antwoord als een JSON object met een "results" key die een array bevat:

{
  "results": [
    {
      "product": "Productnaam",
      "status": "✅",
      "opmerking": ""
    },
    {
      "product": "Ander product",
      "status": "❌",
      "opmerking": "Prijs wijkt af: folder = €1,79, uiting = €1,99"
    }
  ]
}

**BELANGRIJKE REGELS:**
1. Als een product NIET in de bonusfolder voorkomt, geef dan ❌ met opmerking "Product niet gevonden in bonusfolder"
2. Bij prijsverschillen, vermeld altijd beide prijzen
3. Bij actievorm verschillen, vermeld beide actievormen
4. Wees streng met prijzen (verschil van €0,01 is al een fout)
5. Wees tolerant met productnamen (semantische gelijkenis is ok)

Analyseer nu de marketinguiting en geef het resultaat in het gevraagde JSON format.`;
}

/**
 * Alternative: Compare using Claude/Anthropic API
 * Uncomment and modify if you prefer Claude
 */
/*
import Anthropic from '@anthropic-ai/sdk';

export async function compareWithAI(bonusText, uitingText) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY niet gevonden in environment variabelen.');
  }

  const anthropic = new Anthropic({ apiKey });

  const prompt = createComparisonPrompt(bonusText, uitingText);

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const content = response.content[0].text;
    const parsed = JSON.parse(content);
    return parsed.results || parsed;
  } catch (error) {
    throw new Error(`Claude API error: ${error.message}`);
  }
}
*/
