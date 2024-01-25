import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(15); // Initial time for focus (25 minutes in seconds)
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState('Focus');
  const [count, setCount] = useState(0); // Variable to count completed cycles

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
  }, [isActive, seconds]);

  const handleCompletion = () => {
    setIsActive(false);
    setCount((prevCount) => prevCount + 1);

    // Toggle between Focus and Break
    setTimerType((prevType) => (prevType === 'Focus' ? 'Break' : 'Focus'));

    // Set the next timer duration based on the type
    setSeconds((prevSeconds) => (timerType === 'Focus' ? 3 : 15));

    // Assuming you have an API endpoint to update the count variable
    updateCountToAPI(count + 1);
  };

  const updateCountToAPI = (newCount) => {
    // Assuming you have logic to update the count to your API here
    fetchData();
    console.log(newCount);
    console.log(`Updating count to API: ${newCount}`);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_COUNT_API);
      console.log(response);
      setCount(count+1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      <div> <h5>Total Focus Unit : {count} </h5> </div>
      <button className="btn btn-primary btn-lg" onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default Stopwatch;
