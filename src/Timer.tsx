import { useState, useEffect } from "react";

export function Timer() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState(() => {
    // Initialize elapsed time from localStorage, or start at 0 if no value is stored
    const storedElapsedTime = localStorage.getItem("elapsedTime");
    return storedElapsedTime ? parseInt(storedElapsedTime) : 0;
  });

  useEffect(() => {
    // Load the start time from localStorage
    const storedStartTime = localStorage.getItem("timerStart");
    const storedElapsedTime = localStorage.getItem("elapsedTime");

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
        const start = localStorage.getItem("timerStart");
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
    localStorage.setItem("timerStart", Date.now().toString());
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (!isRunning) return;
    localStorage.removeItem("timerStart");
    localStorage.setItem("elapsedTime", elapsedTime.toString());
    setIsRunning(false);
  };

  const resetTimer = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the timer?"
    );
    if (!confirmReset) return;
    localStorage.removeItem("timerStart");
    localStorage.removeItem("elapsedTime");
    setElapsedTime(0);
    setIsRunning(false);
  };

  // Format elapsed time in hh:mm:ss
  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
