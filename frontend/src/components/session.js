import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;

    const updateTimer = () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
          setIsRunning(false);
          handleTimerCompletion();
        }
      }
    };

    if (isRunning) {
      timer = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(timer);
  }, [minutes, seconds, isRunning]);

  const handleTimerCompletion = () => {
    // If the timer completes, toggle between 25 and 5 minutes
    if (minutes === 0 && seconds === 0) {
      if (isRunning) {
        setMinutes(5);
      } else {
        setMinutes(25);
      }
      setIsRunning(true);
    }
  };

  const handlePauseResumeClick = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </h1>
        <button
          className={`btn btn-${isRunning ? 'danger' : 'success'}`}
          onClick={handlePauseResumeClick}
        >
          {isRunning ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
