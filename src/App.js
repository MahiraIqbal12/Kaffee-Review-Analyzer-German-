import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://mahira12-german-review-backend.hf.space').replace(/\/$/, '');
const CLASSIFY_ENDPOINT = `${API_BASE_URL}/classify`;

function App() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedReview = review.trim();

    if (!trimmedReview) {
      setError('Bitte geben Sie zuerst eine Bewertung ein.');
      setResult('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(CLASSIFY_ENDPOINT, { review: trimmedReview });
      setResult(response.data.result);
    } catch (error) {
      console.error('Fehler bei der Klassifizierung:', error);
      setResult('');
      setError('Fehler bei der Klassifizierung. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      textAlign: 'center', 
      minHeight: '100vh',
      overflowX: 'hidden',
      background: 'linear-gradient(135deg, #136a8a 0%, #267871 100%)', // Darker blue background
      padding: 'clamp(20px, 5vw, 50px) 12px',
      color: 'white',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{
        fontSize: 'clamp(1.6rem, 6vw, 2.5rem)',
        lineHeight: 1.2,
        marginBottom: '30px',
        animation: 'fadeIn 1s ease-in'
      }}>Rezensionsklassifizierer</h1>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        padding: 'clamp(16px, 4vw, 30px)',
        width: '100%',
        maxWidth: '600px',
        boxSizing: 'border-box',
        margin: '0 auto',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease'
      }}>
        <textarea
          placeholder="Bewertung hier eingeben"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '15px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '20px',
            minHeight: '100px',
            resize: 'vertical',
            fontSize: 'clamp(14px, 2.8vw, 16px)',
            transition: 'all 0.3s ease',
            display: 'block',
            margin: '0 0 20px'
          }}
        />
        <button 
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '260px',
            backgroundColor: '#000000', // Changed to match theme
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
            ':hover': {
              backgroundColor: '#00000',
              transform: 'scale(1.05)'
            }
          }}
        >
          {loading ? 'Wird verarbeitet...' : 'Absenden'}
        </button>
        {error && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'rgba(255, 87, 87, 0.2)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 87, 87, 0.4)',
            wordBreak: 'break-word'
          }}>
            <h3 style={{ margin: 0 }}>{error}</h3>
          </div>
        )}
        {result && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            animation: 'slideUp 0.5s ease-out',
            wordBreak: 'break-word'
          }}>
            <h2 style={{ margin: 0 }}>{result}</h2>
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          button:hover {
            background-color: #303f9f !important;
            transform: scale(1.05);
          }
          
          textarea:focus {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            outline: none;
          }

          @media (max-width: 480px) {
            h1 {
              margin-bottom: 20px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
