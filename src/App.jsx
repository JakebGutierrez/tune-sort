import React, { useState } from 'react';
import './App.css'
import { bubbleSort } from './algorithms';


function App() {
  const [isSorting, setIsSorting] = useState(false);
  const [bpm, setBpm] = useState(120); // Initial BPM
  const [iterations, setIterations] = useState(0);
  const [stopSorting, setStopSorting] = useState(null);
  const [activeNote, setActiveNote] = useState(null);


  const isSorted = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        return false;
      }
    }
    return true;
  };
  

  

  // Function to handle Play/Stop button click
  const handlePlayStop = () => {
    setIsSorting(!isSorting);
    if (!isSorting && !isSorted(bars)) {  // Check if the array is not already sorted
      const stopFunc = bubbleSort(bars, setBars, setIsSorting, bpm, setIterations, setActiveNote);
      setStopSorting(() => stopFunc); // Store the stop function
    } else if (isSorting && stopSorting) {
      stopSorting(); // Use the stop function to clear timeout
    }
  };
  
 

  

  // Function to handle BPM change
  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  };

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Define the scale and shuffle it for initial state
  const scale = Array.from({ length: 25 }, (_, i) => i + 1);
  const shuffledScale = shuffleArray([...scale]);

  // State to hold the bars
  const [bars, setBars] = useState(shuffledScale);


  // Shuffle function
  const handleShuffle = () => {
    if (stopSorting) stopSorting(); // Clear sorting timeout on shuffle
    const shuffled = shuffleArray([...scale]);
    setBars(shuffled);
    setIsSorting(false);
    setIterations(0);
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
            backgroundColor: index === activeNote ? 'orange' : 'blue', // Highlight active note
            display: 'inline-block' 
          }} />
        ))}
      </div>

    </div>
  );
}

export default App;
