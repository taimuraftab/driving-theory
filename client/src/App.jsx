import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategorySelector from './components/CategorySelector';
import QuestionCard from './components/QuestionCard';
import ResultPage from './components/ResultPage';
import Spinner from './components/Spinner';
import './App.css';

const Header = () => (
  <header className="app-header">
    <h2 style={{ margin: 0 }}>🚗 Driving Theory Prep</h2>
  </header>
);

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://driving-theory-backend.onrender.com/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false); 
      })
      .catch(error => {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      });
  }, []);

  const startQuiz = (category) => {
    navigate(`/quiz/${encodeURIComponent(category)}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <section className="hero-section">
        <h1 className="hero-title">🚗 Master the UK Driving Theory Test</h1>
        <p className="hero-subtitle">Practice with real exam questions. Learn fast. Pass confidently.</p>
        <button className="start-button" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
          Start Now
        </button>
      </section>

      <section className="features-section">
        <div className="feature">✅ 700+ Practice Questions</div>
        <div className="feature">📈 Track Your Progress</div>
      </section>

      <section className="categories-wrapper">
        <h2 className="section-title">Choose a Category</h2>
        <div className="random-card" onClick={() => navigate('/quiz/random')}>
          Take 50 Random Questions
        </div>
        <CategorySelector categories={categories} onSelect={startQuiz} />
      </section>

    </div>

    
  );
}

function QuizPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://driving-theory-backend.onrender.com/api/questions/${category}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const selected = decodedCategory.toLowerCase() === 'random' ? shuffled.slice(0, 50) : shuffled;
        setQuizQuestions(selected);
        setCurrent(0);
        setSelected(null);
        setShowExplanation(false);
        setResults([]);
      });
  }, [category]);

  const score = results.filter(r => r === 'correct').length;
  const isLast = current === quizQuestions.length - 1;

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    const q = quizQuestions[current];
    const isCorrect = option.label === q.correct_answer || option.image === q.correct_answer;
    setResults(prev => [...prev, isCorrect ? 'correct' : 'wrong']);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setCurrent(prev => prev + 1);
    setSelected(null);
    setShowExplanation(false);
  };

  const handleRetake = () => {
    navigate(`/quiz/${category}`, { replace: true });
  };

  const handleBack = () => {
    if (results.length === 0) {
      navigate('/');
    } else {
      const confirmLeave = window.confirm(
        `Your current score: ${score} / ${quizQuestions.length}\n\nAre you sure you want to go back? Your progress will be lost.`
      );
      if (confirmLeave) {
        navigate('/');
      }
    }
  };

  if (quizQuestions.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (current >= quizQuestions.length) {
    return (
      <ResultPage
        results={results}
        questions={quizQuestions}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">
        {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)} Questions
      </h1>

      <p className="quiz-progress">
        Question <strong>{current + 1}</strong> of <strong>{quizQuestions.length}</strong>
      </p>

      <div className="progress-bar">
        {quizQuestions.map((_, index) => {
          const status = results[index];
          const bgColor =
            status === 'correct' ? '#28a745' :
            status === 'wrong' ? '#dc3545' : 'transparent';

          return (
            <div
              key={index}
              className="progress-segment"
              style={{
                backgroundColor: bgColor,
                borderRight: index < quizQuestions.length - 1 ? '1px solid #e0e0e0' : 'none'
              }}
            />
          );
        })}
      </div>

      {quizQuestions.length > 0 && quizQuestions[current] && (
        <QuestionCard
          questionData={quizQuestions[current]}
          selected={selected}
          onAnswer={handleAnswer}
        />
      )}

      {showExplanation && (
        <div className="explanation-box">
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            <strong>Explanation:</strong> {quizQuestions[current].explanation}
          </p>

          <button
            onClick={handleNext}
            className="action-button"
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            {isLast ? 'Finish' : 'Next Question'}
          </button>
        </div>
      )}

      <button
        onClick={handleBack}
        className="nav-button"
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ffe5e5')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff5f5')}
      >
        Back to Categories
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;
