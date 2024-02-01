import React from 'react';

const AudioAlertOnRender = () => {
  return (
    <>
      <audio controls autoPlay>
        <source src="./notification.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioAlertOnRender;
