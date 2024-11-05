import { useState, useEffect } from "react";

const ELAPSED_TIME_KEY = "elapsedTime";
const TIMER_START_KEY = "timerStartedAt";

export interface TimerState {
  elapsedTime: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export function useTimer(): TimerState {
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

  return { elapsedTime, isRunning, startTimer, stopTimer, resetTimer };
}
