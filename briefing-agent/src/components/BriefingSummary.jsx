import './BriefingSummary.css'

function BriefingSummary({ questions, answers, onRestart }) {
  const handleExport = () => {
    let briefingText = '# CAMPAGNE BRIEFING\n\n'
    briefingText += `Aangemaakt op: ${new Date().toLocaleDateString('nl-NL')}\n\n`
    briefingText += '---\n\n'

    questions.forEach(question => {
      if (answers[question.id]) {
        briefingText += `## ${question.title}\n\n`
        briefingText += `${answers[question.id]}\n\n`
      }
    })

    const blob = new Blob([briefingText], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `briefing-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    let briefingText = ''

    questions.forEach(question => {
      if (answers[question.id]) {
        briefingText += `${question.title}\n`
        briefingText += `${answers[question.id]}\n\n`
      }
    })

    navigator.clipboard.writeText(briefingText)
    alert('Briefing gekopieerd naar klembord!')
  }

  return (
    <div className="briefing-summary">
      <div className="summary-header">
        <div className="summary-title-section">
          <h2 className="summary-title">Jouw briefing is klaar</h2>
          <p className="summary-subtitle">
            Gestructureerd, concreet en helder
          </p>
        </div>

        <div className="summary-actions">
          <button onClick={handleCopy} className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 2h-8A1.5 1.5 0 0 0 4 3.5V11h1.5V3.5h8V2zm2 3h-7A1.5 1.5 0 0 0 7 6.5v8A1.5 1.5 0 0 0 8.5 16h7a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 15.5 5z" fill="currentColor"/>
            </svg>
            Kopiëren
          </button>
          <button onClick={handleExport} className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12L3 7l1.41-1.41L7 8.17V0h2v8.17l2.59-2.58L13 7l-5 5zm-7 2h14v2H1v-2z" fill="currentColor"/>
            </svg>
            Exporteren
          </button>
        </div>
      </div>

      <div className="summary-content">
        {questions.map(question => {
          const answer = answers[question.id]
          if (!answer) return null

          return (
            <div key={question.id} className="summary-section">
              <h3 className="summary-question">{question.title}</h3>
              <p className="summary-answer">{answer}</p>
            </div>
          )
        })}
      </div>

      <div className="summary-footer">
        <button onClick={onRestart} className="btn-ghost">
          Nieuwe briefing starten
        </button>
      </div>
    </div>
  )
}

export default BriefingSummary
