import { useEffect, useRef } from 'react'
import './QuestionCard.css'

function QuestionCard({ question, value, onChange }) {
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [value])

  // Focus op mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [question.id])

  return (
    <div className="question-card">
      <div className="question-header">
        <h2 className="question-title">{question.title}</h2>
        {question.required && (
          <span className="required-badge">Verplicht</span>
        )}
      </div>

      <p className="question-subtitle">{question.subtitle}</p>

      <textarea
        ref={textareaRef}
        className="question-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={4}
      />

      <div className="question-meta">
        <span className="character-count">
          {value.length} karakters
        </span>
      </div>
    </div>
  )
}

export default QuestionCard
