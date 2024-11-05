import { useState, useEffect } from "react";

const ELAPSED_TIME_KEY = "elapsedTime";
const TIMER_START_KEY = "timerStartedAt";

export function Timer() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(() => {
    // Initialize elapsed time from localStorage, or start at 0 if no value is stored
    const storedElapsedTime = localStorage.getItem(ELAPSED_TIME_KEY);
    return storedElapsedTime ? parseInt(storedElapsedTime) : 0;
  });

  useEffect(() => {
    // Load the start time from localStorage
    const storedStartTime = localStorage.getItem(TIMER_START_KEY);
    const storedElapsedTime = localStorage.getItem(ELAPSED_TIME_KEY);

    if (storedStartTime && !isRunning) {
      const elapsed = Date.now() - parseInt(storedStartTime);
      setElapsedTime(
        elapsed + (storedElapsedTime ? parseInt(storedElapsedTime) : 0)
      );
      setIsRunning(true);
    }

    // Interval to update elapsed time
    let interval: number | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        const start = localStorage.getItem(TIMER_START_KEY);
        if (start) {
          const newElapsed = Date.now() - parseInt(start);
          setElapsedTime(
            newElapsed + (storedElapsedTime ? parseInt(storedElapsedTime) : 0)
          );
        }
      }, 1000);
    } else if (!isRunning && elapsedTime) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    if (isRunning) return;
    localStorage.setItem(TIMER_START_KEY, Date.now().toString());
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (!isRunning) return;
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.setItem(ELAPSED_TIME_KEY, elapsedTime.toString());
    setIsRunning(false);
  };

  const resetTimer = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the timer?"
    );
    if (!confirmReset) return;
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.removeItem(ELAPSED_TIME_KEY);
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(elapsedTime)}</p>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

// Format elapsed time in hh:mm:ss
function formatTime(time: number) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
