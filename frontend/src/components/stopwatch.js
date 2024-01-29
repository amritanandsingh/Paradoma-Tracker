import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(1500); // Initial time for focus (25 minutes in seconds)
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState('Focus');
  const [count, setCount] = useState(); // Variable to count completed cycles

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_COUNT_API);
      setCount(response.data.data.count);

      // Assuming you want to initialize the timer based on the fetched count
      setSeconds((prevSeconds) => (timerType === 'Focus' ? 300 : 1500));
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  useEffect(() => {
    // Call fetchData once when the component mounts
    fetchData();
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      handleCompletion();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, timerType]);

  useEffect(() => {
    if (count > 0) {
      fetchData();
    }
  }, [count]);

  const handleCompletion = () => {
    setIsActive(false);
    setCount((prevCount) => prevCount + 1);

    // Toggle between Focus and Break
    setTimerType((prevType) => (prevType === 'Focus' ? 'Break' : 'Focus'));

    // Set the next timer duration based on the type
    setSeconds((prevSeconds) => (timerType === 'Focus' ? 300 : 1500));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Stopwatch</h1>
      <p className="display-2">{formatTime(seconds)}</p>
      <p>{timerType} Timer</p>
      <div>
        <h5>Total Focus Unit : {count} </h5>
      </div>
      <button className="btn btn-primary btn-lg" onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default Stopwatch;
