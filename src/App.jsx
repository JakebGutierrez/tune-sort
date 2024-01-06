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

  // Define the scale (you can adjust the values to match the pitch)
  const scale = Array.from({ length: 25 }, (_, i) => i + 1);

  // State to hold the bars
  const [bars, setBars] = useState([...scale]);

  // Shuffle function
  const handleShuffle = () => {
    const shuffled = [...bars].sort(() => Math.random() - 0.5);
    setBars(shuffled);
  };
    

  return (
    <div className="App">
      <h1>Tune Sort</h1>
      <button onClick={handlePlayStop}>
        {isSorting ? 'Stop' : 'Play'}
      </button>
      <div>
        BPM: <input type="range" min="60" max="240" value={bpm} onChange={handleBpmChange} />
      </div>
      <div>Iterations: {iterations}</div>
      <button onClick={handleShuffle}>Shuffle</button>
      <div className="visualization-container">
        {bars.map((value, index) => (
          <div key={index} style={{ 
            height: `${value * 4}px`, 
            width: '20px', 
            margin: '0 2px', 
            backgroundColor: 'blue', 
            display: 'inline-block' 
          }} />
        ))}
      </div>
    </div>
  );
}

export default App;
