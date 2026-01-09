// Validatie logica voor briefing antwoorden

const VAGUE_TERMS = [
  'awareness', 'engagement', 'betrokkenheid', 'bekend', 'bereik',
  'verbeteren', 'verhogen', 'optimaliseren', 'maximaliseren',
  'meer', 'beter', 'groter', 'effectiever', 'succesvoller',
  'mogelijk', 'waarschijnlijk', 'ongeveer', 'redelijk', 'voldoende',
  'aandacht', 'focus', 'impact', 'waarde', 'kwaliteit',
  'inspireren', 'motiveren', 'activeren', 'stimuleren'
]

const GENERIC_TERMS = [
  'iedereen', 'mensen', 'consumenten', 'klanten', 'gebruikers',
  'alle', 'breed', 'algemeen', 'divers', 'verschillende'
]

export function validateAnswer(questionId, answer, allAnswers = {}) {
  const issues = []

  // Basis check: te kort
  if (answer.trim().length < 20) {
    issues.push({
      severity: 'warning',
      title: 'Te kort antwoord',
      message: 'Dit antwoord is erg beknopt. Meer detail helpt om misverstanden te voorkomen.'
    })
  }

  // Vraag-specifieke validatie
  switch (questionId) {
    case 'goal':
      validateGoal(answer, issues)
      break
    case 'target':
      validateTarget(answer, issues)
      break
    case 'message':
      validateMessage(answer, issues)
      break
    case 'scope':
      validateScope(answer, issues)
      break
    case 'success':
      validateSuccess(answer, issues)
      break
    case 'assumptions':
      validateAssumptions(answer, issues)
      break
  }

  // Algemene validatie: vaagheid
  checkVagueness(answer, issues)

  // Check tegenstrijdigheden met andere antwoorden
  checkContradictions(questionId, answer, allAnswers, issues)

  return {
    isValid: issues.filter(i => i.severity === 'error').length === 0,
    issues
  }
}

function validateGoal(answer, issues) {
  const hasNumber = /\d+/.test(answer)
  const hasPercentage = /%/.test(answer)
  const hasTimeframe = /(Q[1-4]|kwartaal|maand|jaar|week|2024|2025|2026)/i.test(answer)

  if (!hasNumber && !hasPercentage) {
    issues.push({
      severity: 'warning',
      title: 'Geen meetbare doelen',
      message: 'Het doel bevat geen concrete cijfers. Dit maakt het lastig om succes te meten.',
      examples: []
    })
  }

  if (!hasTimeframe) {
    issues.push({
      severity: 'warning',
      title: 'Geen tijdsframe',
      message: 'Wanneer moet dit doel bereikt zijn? Voeg een deadline of periode toe.'
    })
  }
}

function validateTarget(answer, issues) {
  const hasAge = /\d+[-\s]?\d*\s?(jaar|j)/i.test(answer)
  const genericCount = GENERIC_TERMS.filter(term =>
    answer.toLowerCase().includes(term)
  ).length

  if (genericCount > 2) {
    issues.push({
      severity: 'warning',
      title: 'Te algemene doelgroep',
      message: 'De doelgroep is breed omschreven. Specifiekere kenmerken helpen bij gerichte communicatie.',
      examples: GENERIC_TERMS.filter(term => answer.toLowerCase().includes(term))
    })
  }

  if (!hasAge) {
    issues.push({
      severity: 'info',
      title: 'Geen leeftijdsindicatie',
      message: 'Overweeg een leeftijdsrange toe te voegen voor nauwkeurigere targeting.'
    })
  }
}

function validateMessage(answer, issues) {
  if (answer.length > 150) {
    issues.push({
      severity: 'warning',
      title: 'Boodschap is te lang',
      message: 'Een kernboodschap moet kort en pakkend zijn. Probeer het in één krachtige zin samen te vatten.'
    })
  }

  // Check of het een vraag is
  if (answer.includes('?')) {
    issues.push({
      severity: 'info',
      title: 'Boodschap als vraag',
      message: 'Een vragende vorm kan effectief zijn, maar zorg dat het antwoord duidelijk is.'
    })
  }
}

function validateScope(answer, issues) {
  const hasBinnen = /binnen scope|binnen|inclusief|wel:/i.test(answer)
  const hasBuiten = /buiten scope|buiten|exclusief|niet:/i.test(answer)

  if (!hasBinnen || !hasBuiten) {
    issues.push({
      severity: 'warning',
      title: 'Scope niet volledig afgebakend',
      message: 'Maak expliciet wat WEL en wat NIET binnen scope valt om misverstanden te voorkomen.'
    })
  }
}

function validateSuccess(answer, issues) {
  const hasMetrics = /\d+/.test(answer)
  const hasKPI = /(KPI|metric|meting|score|rate|percentage|aantal|omzet|conversie)/i.test(answer)

  if (!hasMetrics) {
    issues.push({
      severity: 'error',
      title: 'Geen meetbare criteria',
      message: 'Succescriteria moeten meetbaar zijn. Voeg concrete cijfers, percentages of targets toe.',
      examples: []
    })
  }

  if (!hasKPI && hasMetrics) {
    issues.push({
      severity: 'info',
      title: 'Specificeer metrics',
      message: 'Welke KPI\'s gebruik je precies? (conversie, NPS, omzet, etc.)'
    })
  }
}

function validateAssumptions(answer, issues) {
  const assumptionCount = answer.split(/[,\n]/).filter(a => a.trim().length > 5).length

  if (assumptionCount < 2) {
    issues.push({
      severity: 'info',
      title: 'Weinig aannames benoemd',
      message: 'Elk project heeft aannames. Probeer minstens 3-5 belangrijke aannames te identificeren.'
    })
  }
}

function checkVagueness(answer, issues) {
  const words = answer.toLowerCase().split(/\s+/)
  const vagueFound = []

  VAGUE_TERMS.forEach(term => {
    if (words.some(word => word.includes(term))) {
      vagueFound.push(term)
    }
  })

  if (vagueFound.length > 2) {
    issues.push({
      severity: 'warning',
      title: 'Veel vage termen',
      message: 'Je antwoord bevat veel vage termen die verschillende interpretaties mogelijk maken. Probeer specifieker te zijn.',
      examples: vagueFound.slice(0, 5)
    })
  }
}

function checkContradictions(questionId, answer, allAnswers, issues) {
  // Check specifieke tegenstrijdigheden
  if (questionId === 'message' && allAnswers.goal) {
    const goalHasPrice = /prijs|korting|goedkoop|budget/i.test(allAnswers.goal)
    const messageHasQuality = /kwaliteit|premium|luxe|hoogwaardig/i.test(answer)

    if (goalHasPrice && messageHasQuality) {
      issues.push({
        severity: 'warning',
        title: 'Mogelijk tegenstrijdig',
        message: 'Je doel focust op prijs, maar je boodschap benadrukt kwaliteit. Is dit de bedoeling?'
      })
    }
  }

  // Check scope vs goal conflicts
  if (questionId === 'scope' && allAnswers.goal) {
    const goalMentionsChannel = /online|offline|tv|radio|social|print/i.test(allAnswers.goal)
    const scopeExcludesIt = /buiten.*?(online|offline|tv|radio|social|print)/i.test(answer)

    if (goalMentionsChannel && scopeExcludesIt) {
      issues.push({
        severity: 'error',
        title: 'Tegenstrijdigheid met doel',
        message: 'Je scope sluit iets uit dat in je doel wordt genoemd. Check je antwoorden.'
      })
    }
  }
}
