import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RandomQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const handleRefreshClick = () => {
    fetchRandomQuote();
  };

  return (
    <div className="container mt-5">
      <blockquote className="blockquote">
        <p className="mb-3">{quote}</p>
        <footer className="blockquote-footer">- {author}</footer>
      </blockquote>
      <button className="btn btn-primary" onClick={handleRefreshClick}>
        Refresh Quote
      </button>
    </div>
  );
};

export default RandomQuote;
