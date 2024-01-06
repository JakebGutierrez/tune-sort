export const bubbleSort = (bars, updateBars, setIsSorting, bpm, setIterations) => {
  let n = bars.length;
  let isSorted = false;
  let timeoutId;

  const sortOnce = () => {
    let swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (bars[i] > bars[i + 1]) {
        [bars[i], bars[i + 1]] = [bars[i + 1], bars[i]];
        swapped = true;
        updateBars([...bars]);
      }
    }

    setIterations(prev => prev + 1);

    if (!swapped) {
      if (!isSorted) {
        isSorted = true;
        timeoutId = setTimeout(sortOnce, 60000 / bpm); // One last pass for musical completion
      } else {
        setIsSorting(false); // Sorting is completed
      }
    } else {
      timeoutId = setTimeout(sortOnce, 60000 / bpm);
    }
  };

  sortOnce();

  // Return a function to clear the timeout
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
};
