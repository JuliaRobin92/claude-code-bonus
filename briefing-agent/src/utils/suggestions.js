// Genereer intelligente verbetervoorstellen

export function generateSuggestions(questionId, answer, validation) {
  const suggestions = []

  // Alleen suggesties als er issues zijn
  if (!validation || validation.issues.length === 0) {
    return suggestions
  }

  // Vraag-specifieke suggesties
  switch (questionId) {
    case 'goal':
      generateGoalSuggestions(answer, validation, suggestions)
      break
    case 'target':
      generateTargetSuggestions(answer, validation, suggestions)
      break
    case 'message':
      generateMessageSuggestions(answer, validation, suggestions)
      break
    case 'scope':
      generateScopeSuggestions(answer, validation, suggestions)
      break
    case 'success':
      generateSuccessSuggestions(answer, validation, suggestions)
      break
    case 'assumptions':
      generateAssumptionsSuggestions(answer, validation, suggestions)
      break
  }

  return suggestions
}

function generateGoalSuggestions(answer, validation, suggestions) {
  const hasNumberIssue = validation.issues.some(i => i.title.includes('meetbare'))
  const hasTimeIssue = validation.issues.some(i => i.title.includes('tijdsframe'))

  if (hasNumberIssue && hasTimeIssue) {
    // Voeg specifieke cijfers en tijd toe
    const enhanced = enhanceWithMetrics(answer)
    suggestions.push({
      text: enhanced,
      reason: 'Toegevoegd: concrete cijfers en tijdsframe voor meetbaarheid'
    })
  } else if (hasNumberIssue) {
    const withNumbers = enhanceWithMetrics(answer, false)
    suggestions.push({
      text: withNumbers,
      reason: 'Toegevoegd: concrete doelstelling met meetbare cijfers'
    })
  } else if (hasTimeIssue) {
    suggestions.push({
      text: `${answer} te bereiken in Q2 2026`,
      reason: 'Toegevoegd: duidelijk tijdsframe'
    })
  }
}

function generateTargetSuggestions(answer, validation, suggestions) {
  const hasGenericIssue = validation.issues.some(i => i.title.includes('algemene'))

  if (hasGenericIssue) {
    // Maak specifieker
    let improved = answer

    // Vervang generieke termen
    improved = improved.replace(/iedereen|alle mensen|consumenten/gi, 'gezinnen met kinderen (30-45 jaar)')
    improved = improved.replace(/breed publiek/gi, 'bewuste consumenten die waarde hechten aan duurzaamheid')

    if (improved !== answer) {
      suggestions.push({
        text: improved,
        reason: 'Specifieker gemaakt met concrete kenmerken en leeftijd'
      })
    }
  }

  // Voeg detail toe als het kort is
  if (answer.length < 50) {
    suggestions.push({
      text: `${answer}, specifiek degenen die waarde hechten aan kwaliteit en bereid zijn iets meer te betalen voor duurzame producten`,
      reason: 'Uitgebreid met psychografische kenmerken'
    })
  }
}

function generateMessageSuggestions(answer, validation, suggestions) {
  const tooLongIssue = validation.issues.some(i => i.title.includes('te lang'))

  if (tooLongIssue) {
    // Verkort tot kernboodschap
    const words = answer.split(' ')
    if (words.length > 15) {
      const shortened = words.slice(0, 12).join(' ')
      suggestions.push({
        text: shortened,
        reason: 'Ingekort tot een krachtige, memorabele kernboodschap'
      })
    }
  }

  // Maak punchier als het veel vage termen bevat
  const vagueIssue = validation.issues.some(i => i.title.includes('vage'))
  if (vagueIssue) {
    const concrete = makeMoreConcrete(answer)
    if (concrete !== answer) {
      suggestions.push({
        text: concrete,
        reason: 'Vage termen vervangen door concrete beweringen'
      })
    }
  }
}

function generateScopeSuggestions(answer, validation, suggestions) {
  const notCompleteIssue = validation.issues.some(i => i.title.includes('niet volledig'))

  if (notCompleteIssue) {
    let improved = answer

    // Voeg structuur toe als die ontbreekt
    if (!answer.toLowerCase().includes('binnen')) {
      improved = `Binnen scope:\n- ${answer}\n\nBuiten scope:\n- [Specificeer wat uitgesloten is]`
    } else if (!answer.toLowerCase().includes('buiten')) {
      improved = `${answer}\n\nBuiten scope:\n- TV en radio\n- Print advertenties\n- Offline activaties`
    }

    if (improved !== answer) {
      suggestions.push({
        text: improved,
        reason: 'Gestructureerd met duidelijke in- en exclusies'
      })
    }
  }
}

function generateSuccessSuggestions(answer, validation, suggestions) {
  const noMetricsIssue = validation.issues.some(i => i.title.includes('meetbare'))

  if (noMetricsIssue) {
    // Voeg concrete metrics toe
    const withMetrics = `${answer}

Concrete targets:
- 10.000 nieuwe klanten
- Conversie rate > 3.5%
- NPS score > 8
- Omzetstijging van 15%`

    suggestions.push({
      text: withMetrics,
      reason: 'Toegevoegd: specifieke, meetbare KPI\'s met targets'
    })
  }

  // Als het kort is maar wel metrics heeft
  if (answer.length < 40 && /\d+/.test(answer)) {
    suggestions.push({
      text: `${answer}, gemeten via Google Analytics en CRM data, gerapporteerd per maand`,
      reason: 'Uitgebreid met meetmethode en rapportage frequentie'
    })
  }
}

function generateAssumptionsSuggestions(answer, validation, suggestions) {
  const fewAssumptions = validation.issues.some(i => i.title.includes('Weinig'))

  if (fewAssumptions) {
    suggestions.push({
      text: `${answer}

Aanvullende aannames:
- Budget blijft gedurende de campagne stabiel
- Geen nieuwe concurrenten treden toe tot de markt
- Leveranciers kunnen de vraag aan
- Marktomstandigheden blijven stabiel
- Team capaciteit is voldoende`,
      reason: 'Aangevuld met veelvoorkomende project-aannames'
    })
  }
}

// Helper functies
function enhanceWithMetrics(text, includeTime = true) {
  const timeframe = includeTime ? ' in Q2 2026' : ''

  // Als er al iets van een doel in zit, probeer te enhancen
  if (/verkoop|omzet|revenue/i.test(text)) {
    return `${text} met 15% verhogen${timeframe}, resulterend in €2M extra omzet`
  }

  if (/klant|customer|gebruiker/i.test(text)) {
    return `${text}: 10.000 nieuwe klanten werven${timeframe}`
  }

  if (/bereik|reach|awareness/i.test(text)) {
    return `${text}: 50.000 unieke bezoekers bereiken${timeframe}`
  }

  // Default: voeg generieke metrics toe
  return `${text} met een stijging van 20%${timeframe}`
}

function makeMoreConcrete(text) {
  let concrete = text

  // Vervang vage termen door concrete alternatieven
  const replacements = {
    'verbeteren': 'verhogen met 15%',
    'verhogen': 'verhogen met 20%',
    'meer': '25% meer',
    'beter': 'met hogere kwaliteitsscore',
    'optimaliseren': 'verhogen naar 95% efficiency',
    'awareness': 'naamsbekendheid van 60%',
    'engagement': 'interactie rate van 5%',
    'betrokkenheid': 'actieve participatie van 40%'
  }

  Object.entries(replacements).forEach(([vague, concrete_alt]) => {
    const regex = new RegExp(`\\b${vague}\\b`, 'gi')
    concrete = concrete.replace(regex, concrete_alt)
  })

  return concrete
}
