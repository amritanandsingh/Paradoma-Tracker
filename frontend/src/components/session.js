import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
  
    useEffect(() => {
      let timer;
  
      // Update the timer every second
      const updateTimer = () => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            // Timer has reached 0
            // You can add additional logic here, like displaying a message or triggering another action
            clearInterval(timer);
          }
        }
      };
  
      // Start the timer when the component mounts
      timer = setInterval(updateTimer, 1000);
  
      // Clean up the timer when the component unmounts
      return () => clearInterval(timer);
    }, [minutes, seconds]);
  
    return (
      <div>
        <p>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
    );
};

export default PomodoroTimer;
