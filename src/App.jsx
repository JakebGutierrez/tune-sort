import React, { useState } from 'react';
import './App.css'

function App() {
  const [isSorting, setIsSorting] = useState(false);
  const [bpm, setBpm] = useState(120); // Initial BPM
  const [iterations, setIterations] = useState(0);

  // Function to handle Play/Stop button click
  const handlePlayStop = () => {
    setIsSorting(!isSorting);
    // Reset iterations when starting
    if (!isSorting) setIterations(0);
  };

  // Function to handle BPM change
  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  };

  return (
    <div className="App">
      <h1>Sorting Visualizer with Music</h1>
      <button onClick={handlePlayStop}>
        {isSorting ? 'Stop' : 'Play'}
      </button>
      <div>
        BPM: <input type="range" min="60" max="240" value={bpm} onChange={handleBpmChange} />
      </div>
      <div>Iterations: {iterations}</div>
      {/* Visualization area will go here */}
    </div>
  );
}

export default App;
