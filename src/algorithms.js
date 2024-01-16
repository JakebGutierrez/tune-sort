export const bubbleSort = (
  bars,
  updateBars,
  setIsSorting,
  bpm,
  setIterations,
  setActiveNote,
) => {
  let n = bars.length
  let sortingRange = n
  let timeoutId

  const iterate = (i, end) => {
    if (i < end - 1) {
      setActiveNote(i) // Highlight the current note

      if (bars[i] > bars[i + 1]) {
        // Swap the elements using a temporary variable
        const temp = bars[i]
        ;[bars[i], bars[i + 1]] = [bars[i + 1], temp]
        updateBars([...bars])
      }

      timeoutId = setTimeout(() => iterate(i + 1, end), 60000 / bpm)
    } else {
      setActiveNote(i) // Ensure the last note is highlighted
      setIterations((prev) => prev + 1)

      setTimeout(() => {
        setActiveNote(null) // Reset the active note

        if (end === sortingRange) {
          sortingRange-- // Reduce the sorting range for the next pass
        }

        if (sortingRange > 1) {
          iterate(0, sortingRange) // Continue sorting with the reduced range
        } else {
          setIsSorting(false) // Sorting is completed
        }
      }, 60000 / bpm)
    }
  }

  iterate(0, sortingRange)

  // Return a function to clear the timeout
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
  }
}
