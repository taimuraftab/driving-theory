import React from 'react';
import './QuestionCard.css';


const QuestionCard = ({ questionData, selected, onAnswer }) => {
  if (!questionData) return null;

  const getOptionLetter = (index) =>
    index >= 0 ? String.fromCharCode(65 + index) : '?';

  const normalize = (val) => (val ? val.trim().toLowerCase() : '');

  const correctIndex = questionData.options.findIndex((opt) =>
  normalize(opt.label) === normalize(questionData.correct_answer)
);

  const selectedIndex = questionData.options.findIndex(opt =>
  normalize(opt.label) === normalize(selected?.label)
);

  return (
    <div
      className="question-card"
      style={{
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        maxWidth: '900px',
        margin: '0 auto'
      }}
    >
      {/* ⬇ Image above question */}
  {questionData.image && (
     <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
    <img
      src={`/images/${questionData.image}`}
      alt="question visual"
      className="question-image"
    />
    </div>
  )}
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>{questionData.question}</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {questionData.options.map((opt, index) => (
          <li
            key={index}
            onClick={() => !selected && onAnswer(opt)}
            className={`option-item ${selected && opt === selected ? 'selected' : ''}`}
          >
            <span className="option-letter">{getOptionLetter(index)}</span>
            {/\.png|\.jpg|\.jpeg|\.gif$/i.test(opt.label) ? (
    <img src={`/images/${opt.label}`} alt="option" className="option-image" />
  ) : (
    <span className="option-text">{opt.label}</span>
  )}
</li>
        ))}
      </ul>

      {selected && (
        <div className={`feedback-box ${selectedIndex === correctIndex ? 'correct' : 'wrong'}`}>
  <span className="feedback-icon">
    {selectedIndex === correctIndex ? '✅' : '❌'}
  </span>
  {selectedIndex === correctIndex ? (
    <span>You selected <strong>{getOptionLetter(selectedIndex)}</strong>.</span>
  ) : (
    <span>You selected <strong>{getOptionLetter(selectedIndex)}</strong>, but the correct answer is <strong>{getOptionLetter(correctIndex)}</strong>.</span>
  )}
</div>
      )}
    </div>
  );
};

export default QuestionCard;
