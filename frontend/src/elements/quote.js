import React, { useState, useEffect } from 'react';

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
    <div>
      <blockquote>
        <p>{quote}</p>
        <footer>- {author}</footer>
      </blockquote>
      <button onClick={handleRefreshClick}>Refresh Quote</button>
    </div>
  );
};

export default RandomQuote;
