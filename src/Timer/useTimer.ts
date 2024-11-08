import { useState, useEffect } from "react";

const TOTAL_ELAPSED_TIME_KEY = "totalElapsedTime";
const TIMER_START_KEY = "timerStartedAt";
const DAILY_ELAPSED_TIME_KEY = "dailyElapsedTime";
const LAST_UPDATE_DATE_KEY = "lastUpdateDate";

export interface TimerState {
  dailyElapsedTime: number;
  totalElapsedTime: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  updateTime: (
    type: "daily" | "total",
    unit: "hours" | "minutes",
    value: number
  ) => void;
}

export function useTimer(): TimerState {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(() => {
    const storedElapsedTime = localStorage.getItem(TOTAL_ELAPSED_TIME_KEY);
    return storedElapsedTime ? parseInt(storedElapsedTime) : 0;
  });
  const [dailyElapsedTime, setDailyElapsedTime] = useState(() => {
    const storedDailyElapsedTime = localStorage.getItem(DAILY_ELAPSED_TIME_KEY);
    const lastUpdateDate = localStorage.getItem(LAST_UPDATE_DATE_KEY);
    const today = new Date().toDateString();

    if (lastUpdateDate !== today) {
      localStorage.setItem(LAST_UPDATE_DATE_KEY, today);
      localStorage.setItem(DAILY_ELAPSED_TIME_KEY, "0");
      return 0;
    }
    return storedDailyElapsedTime ? parseInt(storedDailyElapsedTime) : 0;
  });

  useEffect(() => {
    const storedStartTime = localStorage.getItem(TIMER_START_KEY);
    const storedElapsedTime = localStorage.getItem(TOTAL_ELAPSED_TIME_KEY);
    const storedDailyElapsedTime = localStorage.getItem(DAILY_ELAPSED_TIME_KEY);

    if (storedStartTime && !isRunning) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(storedStartTime)) / 1000
      );
      setTotalElapsedTime(
        elapsed + (storedElapsedTime ? parseInt(storedElapsedTime) : 0)
      );
      setDailyElapsedTime(
        elapsed +
          (storedDailyElapsedTime ? parseInt(storedDailyElapsedTime) : 0)
      );
      setIsRunning(true);
    }

    let interval: number | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        const start = localStorage.getItem(TIMER_START_KEY);
        if (start) {
          const newElapsed = Math.floor((Date.now() - parseInt(start)) / 1000);
          setTotalElapsedTime(
            newElapsed + (storedElapsedTime ? parseInt(storedElapsedTime) : 0)
          );
          setDailyElapsedTime(
            newElapsed +
              (storedDailyElapsedTime ? parseInt(storedDailyElapsedTime) : 0)
          );
        }
      }, 1000);
    } else if (!isRunning && totalElapsedTime) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function startTimer() {
    if (isRunning) return;
    localStorage.setItem(TIMER_START_KEY, Date.now().toString());
    setIsRunning(true);
  }

  function stopTimer() {
    if (!isRunning) return;
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.setItem(TOTAL_ELAPSED_TIME_KEY, totalElapsedTime.toString());
    localStorage.setItem(DAILY_ELAPSED_TIME_KEY, dailyElapsedTime.toString());
    setIsRunning(false);
  }

  function resetTimer() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the timer?"
    );
    if (!confirmReset) return;
    localStorage.removeItem(TIMER_START_KEY);
    localStorage.removeItem(TOTAL_ELAPSED_TIME_KEY);
    localStorage.removeItem(DAILY_ELAPSED_TIME_KEY);
    localStorage.removeItem(LAST_UPDATE_DATE_KEY);
    setTotalElapsedTime(0);
    setDailyElapsedTime(0);
    setIsRunning(false);
  }

  function updateTime(
    type: "daily" | "total",
    unit: "hours" | "minutes",
    value: number
  ) {
    const multiplier = unit === "hours" ? 60 * 60 : 60;
    const adjustedValue = value * multiplier;
    if (type === "daily") {
      const updatedDailyElapsedTime = adjustedValue + dailyElapsedTime;
      setDailyElapsedTime(updatedDailyElapsedTime);
      localStorage.setItem(
        DAILY_ELAPSED_TIME_KEY,
        updatedDailyElapsedTime.toString()
      );
    } else {
      const updatedTotalElapsedTime = adjustedValue + totalElapsedTime;
      setTotalElapsedTime(updatedTotalElapsedTime);
      localStorage.setItem(
        TOTAL_ELAPSED_TIME_KEY,
        updatedTotalElapsedTime.toString()
      );
    }
  }

  return {
    dailyElapsedTime,
    totalElapsedTime,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    updateTime,
  };
}
