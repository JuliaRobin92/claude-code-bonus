import './InterpretationPreview.css'

function InterpretationPreview({ questions, answers, currentStep }) {
  const answeredQuestions = questions.filter(q => answers[q.id] && answers[q.id].trim())

  if (answeredQuestions.length === 0) {
    return (
      <div className="interpretation-preview">
        <div className="preview-header">
          <h3>Interpretatie-inzicht</h3>
          <p className="preview-subtitle">
            Zie hoe je briefing gelezen wordt
          </p>
        </div>
        <div className="preview-empty">
          <p>Begin met het beantwoorden van vragen om te zien hoe je briefing wordt geïnterpreteerd.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="interpretation-preview">
      <div className="preview-header">
        <h3>Interpretatie-inzicht</h3>
        <p className="preview-subtitle">
          Zo leest de ontvanger jouw briefing
        </p>
      </div>

      <div className="preview-content">
        {answeredQuestions.map((question) => {
          const answer = answers[question.id]
          const interpretation = generateInterpretation(question.id, answer)

          return (
            <div key={question.id} className="preview-section">
              <h4 className="preview-question-title">{question.title}</h4>

              <div className="preview-answer">
                <div className="preview-label">Jouw antwoord:</div>
                <p className="preview-text user-text">{answer}</p>
              </div>

              <div className="preview-interpretation">
                <div className="preview-label">Waarschijnlijke interpretatie:</div>
                <p className="preview-text interpretation-text">{interpretation.text}</p>

                {interpretation.clarity !== 'high' && (
                  <div className={`clarity-indicator ${interpretation.clarity}`}>
                    <span className="clarity-label">Helderheid:</span>
                    <span className="clarity-value">
                      {interpretation.clarity === 'medium' ? 'Gemiddeld' : 'Laag'}
                    </span>
                  </div>
                )}
              </div>

              {interpretation.risks && interpretation.risks.length > 0 && (
                <div className="preview-risks">
                  <div className="risks-label">Interpretatierisico's:</div>
                  <ul className="risks-list">
                    {interpretation.risks.map((risk, i) => (
                      <li key={i}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Genereer interpretatie op basis van het antwoord
function generateInterpretation(questionId, answer) {
  const vagueness = detectVagueness(answer)
  const hasNumbers = /\d+/.test(answer)
  const hasSpecifics = answer.length > 50 && hasNumbers

  const interpretations = {
    goal: () => {
      if (vagueness.score > 0.5) {
        return {
          text: `"We moeten iets met ${answer.toLowerCase().substring(0, 50)}... maar de precieze definitie van succes blijft onduidelijk."`,
          clarity: 'low',
          risks: [
            'Onduidelijk wat precies bereikt moet worden',
            'Geen meetbare doelstelling',
            'Ruimte voor verschillende interpretaties'
          ]
        }
      }
      if (hasSpecifics) {
        return {
          text: `"We willen specifiek: ${answer.substring(0, 80)}... Dit is concreet en meetbaar."`,
          clarity: 'high',
          risks: []
        }
      }
      return {
        text: `"Het doel is ${answer.substring(0, 80)}... maar exacte targets ontbreken."`,
        clarity: 'medium',
        risks: ['Geen concrete cijfers genoemd', 'Moeilijk te meten']
      }
    },

    target: () => {
      const hasAge = /\d+[-\s]?\d*\s?(jaar|j)/i.test(answer)
      const hasCharacteristics = answer.split(',').length > 1 || answer.split('die').length > 1

      if (hasAge && hasCharacteristics) {
        return {
          text: `"De doelgroep is duidelijk afgebakend: ${answer.substring(0, 100)}."`,
          clarity: 'high',
          risks: []
        }
      }
      return {
        text: `"We richten ons op ${answer.substring(0, 80)}... maar de exacte kenmerken blijven breed."`,
        clarity: 'medium',
        risks: ['Brede doelgroep', 'Mogelijk te algemeen voor effectieve targeting']
      }
    },

    message: () => {
      if (answer.length < 30) {
        return {
          text: `"${answer}" - Kort en krachtig, maar mogelijk te beknopt.`,
          clarity: 'medium',
          risks: ['Mogelijk te weinig context', 'Kan verschillende kanten op geïnterpreteerd worden']
        }
      }
      if (vagueness.score > 0.4) {
        return {
          text: `"${answer.substring(0, 100)}..." - De boodschap is breed en kan op meerdere manieren worden begrepen.`,
          clarity: 'low',
          risks: ['Geen scherpe propositie', 'Weinig onderscheidend']
        }
      }
      return {
        text: `"${answer}" - Heldere en concrete boodschap die goed te onthouden is.`,
        clarity: 'high',
        risks: []
      }
    },

    scope: () => {
      const hasBothInOut = answer.toLowerCase().includes('binnen') && answer.toLowerCase().includes('buiten')

      if (hasBothInOut) {
        return {
          text: `Grenzen zijn duidelijk: ${answer.substring(0, 100)}`,
          clarity: 'high',
          risks: []
        }
      }
      return {
        text: `Scope: ${answer.substring(0, 100)}... maar onduidelijk wat expliciet uitgesloten is.`,
        clarity: 'medium',
        risks: ['Mogelijk scope creep', 'Onduidelijk wat niet gedaan wordt']
      }
    },

    success: () => {
      if (hasNumbers && (answer.includes('%') || answer.includes('euro') || /\d+/.test(answer))) {
        return {
          text: `Succes wordt gemeten aan: ${answer.substring(0, 100)}. Duidelijk meetbaar.`,
          clarity: 'high',
          risks: []
        }
      }
      return {
        text: `Succescriteria: ${answer.substring(0, 100)}... maar meetbaarheid is beperkt.`,
        clarity: 'low',
        risks: ['Moeilijk objectief te meten', 'Geen harde KPI\'s']
      }
    },

    assumptions: () => {
      const assumptionCount = answer.split(/[,\n]/).filter(a => a.trim()).length

      if (assumptionCount >= 3) {
        return {
          text: `Er zijn ${assumptionCount} aannames geïdentificeerd, wat helpt bij risicomanagement.`,
          clarity: 'high',
          risks: []
        }
      }
      return {
        text: `Beperkte aannames benoemd: ${answer.substring(0, 80)}...`,
        clarity: 'medium',
        risks: ['Mogelijk blinde vlekken', 'Risico\'s niet volledig in kaart']
      }
    }
  }

  const generator = interpretations[questionId]
  return generator ? generator() : {
    text: answer.substring(0, 150),
    clarity: 'medium',
    risks: []
  }
}

// Detecteer vage termen
function detectVagueness(text) {
  const vagueTerms = [
    'awareness', 'engagement', 'betrokkenheid', 'bekend', 'bereik',
    'verbeteren', 'verhogen', 'optimaliseren', 'maximaliseren',
    'meer', 'beter', 'groter', 'effectiever', 'succesvoller',
    'mogelijk', 'waarschijnlijk', 'ongeveer', 'redelijk', 'voldoende'
  ]

  const words = text.toLowerCase().split(/\s+/)
  const vagueCount = words.filter(word =>
    vagueTerms.some(term => word.includes(term))
  ).length

  return {
    score: vagueCount / Math.max(words.length, 1),
    count: vagueCount
  }
}

export default InterpretationPreview
