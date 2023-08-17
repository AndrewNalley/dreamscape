import React from 'react';
import AudioPlayer from 'react-audio-player';

const AudioPlayerComponent = ({ audioUrl }) => {
  return (
    <div>
      <h1>MP3 Player Example</h1>
      <AudioPlayer
        src={audioUrl}
        controls // Show native controls (play, pause, volume, etc.)
        autoPlay // Automatically start playing when the component is rendered
      />
    </div>
  );
};

export default AudioPlayerComponent;
