import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = ({ results, questions, onRetake }) => {
  const navigate = useNavigate();

  const score = results.filter(r => r === 'correct').length;
  const wrongQuestions = questions.filter((_, i) => results[i] === 'wrong');

  return (
    <div className="result-container">
      <h1 className="result-heading">🎉 Test Completed</h1>
      <p className="result-summary">
        You scored <strong>{score}</strong> out of <strong>{questions.length}</strong><br />
        ❌ Incorrect Answers: {wrongQuestions.length}
      </p>

      <div className="result-buttons">
        <button onClick={onRetake} className="result-button retake">
          🔁 Retake Test
        </button>

        <button onClick={() => navigate('/')} className="result-button back">
          🧭 Choose Another Category
        </button>
      </div>

      {wrongQuestions.length > 0 && (
        <div className="review-section">
          <h2>Review Incorrect Questions</h2>
          {wrongQuestions.map((q, i) => (
            <div key={i} className="review-box">
              <p><strong>Q:</strong> {q.question}</p>
              <p><strong>✔ Correct Answer:</strong> {q.correct_answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
