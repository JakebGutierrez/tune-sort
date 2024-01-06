export const bubbleSort = (bars, updateBars, setIsSorting, bpm, setIterations, setActiveNote) => {
  let n = bars.length;
  let isSorted = false;
  let timeoutId;

  const sortOnce = (i = 0) => {
    if (i < n - 1) {
      setActiveNote(i); // Update the active note

      if (bars[i] > bars[i + 1]) {
        [bars[i], bars[i + 1]] = [bars[i + 1], bars[i]];
        updateBars([...bars]);
      }

      // Delay for the next comparison
      timeoutId = setTimeout(() => sortOnce(i + 1), 60000 / bpm);
    } else {
      // Proceed to next iteration or finish sorting
      setIterations(prev => prev + 1);

      if (isSorted) {
        setIsSorting(false); // Sorting is completed
        setActiveNote(null); // Reset active note
      } else {
        isSorted = true;
        timeoutId = setTimeout(() => sortOnce(0), 60000 / bpm);
      }
    }
  };

  sortOnce();

  // Return a function to clear the timeout
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
};
