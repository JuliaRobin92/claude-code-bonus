import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import QuestionCard from './components/QuestionCard'
import ValidationFeedback from './components/ValidationFeedback'
import InterpretationPreview from './components/InterpretationPreview'
import ProgressIndicator from './components/ProgressIndicator'
import BriefingSummary from './components/BriefingSummary'
import { validateAnswer } from './utils/validation'
import { generateSuggestions } from './utils/suggestions'

const QUESTIONS = [
  {
    id: 'goal',
    title: 'Wat is het doel van deze campagne?',
    subtitle: 'Wees specifiek. Vermijd vage termen als "awareness" of "engagement".',
    placeholder: 'Bijv: Verhoog online verkoop van biologische producten met 15% in Q2',
    type: 'textarea',
    required: true
  },
  {
    id: 'target',
    title: 'Voor wie is deze campagne bedoeld?',
    subtitle: 'Beschrijf je doelgroep concreet. Wat maakt hen uniek?',
    placeholder: 'Bijv: Gezinnen met kinderen (25-45 jaar) die waarde hechten aan duurzaamheid',
    type: 'textarea',
    required: true
  },
  {
    id: 'message',
    title: 'Wat is de kernboodschap?',
    subtitle: 'De ene zin die blijft hangen. Wat moet de ontvanger onthouden?',
    placeholder: 'Bijv: Bij AH vind je het grootste assortiment biologisch voor de laagste prijs',
    type: 'textarea',
    required: true
  },
  {
    id: 'scope',
    title: 'Wat valt binnen scope, wat niet?',
    subtitle: 'Helderheid over grenzen voorkomt misverstanden.',
    placeholder: 'Binnen scope: Online kanalen, biologisch assortiment\nBuiten scope: TV, reguliere producten',
    type: 'textarea',
    required: true
  },
  {
    id: 'success',
    title: 'Waaraan meet je succes?',
    subtitle: 'Concrete, meetbare criteria.',
    placeholder: 'Bijv: 10.000 nieuwe klanten, NPS > 8, 15% omzetstijging',
    type: 'textarea',
    required: true
  },
  {
    id: 'assumptions',
    title: 'Welke aannames doe je?',
    subtitle: 'Wat neem je aan dat waar is? Wat zijn de risico\'s?',
    placeholder: 'Bijv: Budget blijft stabiel, leveranciers leveren op tijd, geen nieuwe concurrent',
    type: 'textarea',
    required: false
  }
]

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [validations, setValidations] = useState({})
  const [suggestions, setSuggestions] = useState({})
  const [showPreview, setShowPreview] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const currentQuestion = QUESTIONS[currentStep]

  // Realtime validatie wanneer antwoord wijzigt
  useEffect(() => {
    if (currentQuestion && answers[currentQuestion.id]) {
      const validation = validateAnswer(
        currentQuestion.id,
        answers[currentQuestion.id],
        answers
      )
      setValidations(prev => ({
        ...prev,
        [currentQuestion.id]: validation
      }))

      // Genereer suggesties als er issues zijn
      if (validation.issues.length > 0) {
        const newSuggestions = generateSuggestions(
          currentQuestion.id,
          answers[currentQuestion.id],
          validation
        )
        setSuggestions(prev => ({
          ...prev,
          [currentQuestion.id]: newSuggestions
        }))
      }
    }
  }, [answers, currentQuestion])

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleAcceptSuggestion = (suggestionText) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: suggestionText
    }))
    // Clear suggestions voor deze vraag
    setSuggestions(prev => ({
      ...prev,
      [currentQuestion.id]: []
    }))
  }

  const canProceed = () => {
    if (!currentQuestion.required) return true
    const answer = answers[currentQuestion.id]
    if (!answer || answer.trim().length === 0) return false

    const validation = validations[currentQuestion.id]
    if (!validation) return true

    // Alleen blokkerende issues voorkomen verder gaan
    return !validation.issues.some(issue => issue.severity === 'error')
  }

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setValidations({})
    setSuggestions({})
    setIsComplete(false)
    setShowPreview(false)
  }

  if (isComplete) {
    return (
      <div className="app">
        <Header />
        <BriefingSummary
          questions={QUESTIONS}
          answers={answers}
          onRestart={handleRestart}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />

      <div className="container">
        <ProgressIndicator
          current={currentStep + 1}
          total={QUESTIONS.length}
        />

        <div className="content-grid">
          <div className="main-content">
            <QuestionCard
              question={currentQuestion}
              value={answers[currentQuestion.id] || ''}
              onChange={handleAnswerChange}
            />

            {validations[currentQuestion.id] && (
              <ValidationFeedback
                validation={validations[currentQuestion.id]}
                suggestions={suggestions[currentQuestion.id] || []}
                onAcceptSuggestion={handleAcceptSuggestion}
              />
            )}

            <div className="navigation">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="btn-secondary"
              >
                Vorige
              </button>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-ghost"
              >
                {showPreview ? 'Verberg' : 'Toon'} interpretatie
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary"
              >
                {currentStep === QUESTIONS.length - 1 ? 'Afronden' : 'Volgende'}
              </button>
            </div>
          </div>

          {showPreview && (
            <div className="side-panel">
              <InterpretationPreview
                questions={QUESTIONS}
                answers={answers}
                currentStep={currentStep}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
