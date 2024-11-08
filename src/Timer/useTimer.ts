import { useEffect, useRef, useState } from "react";

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
  const [isRunning, setIsRunning] = useState<boolean>(() => {
    return !!localStorage.getItem(TIMER_START_KEY);
  });
  const [totalElapsedTime, setTotalElapsedTime] = useState(() => {
    const storedElapsedTime = localStorage.getItem(TOTAL_ELAPSED_TIME_KEY);
    const startTime = parseInt(localStorage.getItem(TIMER_START_KEY) || "0");
    if (startTime && storedElapsedTime) {
      const newElapsed = Math.floor(Date.now() / 1000 - startTime);
      return parseInt(storedElapsedTime) + newElapsed;
    } else if (startTime) {
      return Math.floor(Date.now() / 1000 - startTime);
    } else {
      return storedElapsedTime ? parseInt(storedElapsedTime) : 0;
    }
  });

  const [dailyElapsedTime, setDailyElapsedTime] = useState(() => {
    const storedDailyElapsedTime = localStorage.getItem(DAILY_ELAPSED_TIME_KEY);
    const startTime = parseInt(localStorage.getItem(TIMER_START_KEY) || "0");
    if (startTime && storedDailyElapsedTime) {
      const newElapsed = Math.floor(Date.now() / 1000 - startTime);
      return parseInt(storedDailyElapsedTime) + newElapsed;
    } else if (startTime) {
      return Math.floor(Date.now() / 1000 - startTime);
    } else {
      return storedDailyElapsedTime ? parseInt(storedDailyElapsedTime) : 0;
    }
  });

  const intervalRef = useRef<number | null>(null);
  const lastUpdatedRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      lastUpdatedRef.current = Math.floor(Date.now() / 1000);

      intervalRef.current = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const newElapsed = now - (lastUpdatedRef.current || now);

        setTotalElapsedTime((prev) => prev + newElapsed);
        setDailyElapsedTime((prev) => prev + newElapsed);

        lastUpdatedRef.current = now;
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  function startTimer() {
    if (isRunning) return;
    const startTime = Math.floor(Date.now() / 1000);
    localStorage.setItem(TIMER_START_KEY, startTime.toString());
    setIsRunning(true);
  }

  function stopTimer() {
    if (!isRunning) return;
    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - (lastUpdatedRef.current || now);
    setTotalElapsedTime((prev) => {
      const newElapsed = prev + elapsed;
      localStorage.setItem(TOTAL_ELAPSED_TIME_KEY, newElapsed.toString());
      return newElapsed;
    });
    setDailyElapsedTime((prev) => {
      const newElapsed = prev + elapsed;
      localStorage.setItem(DAILY_ELAPSED_TIME_KEY, newElapsed.toString());
      return newElapsed;
    });
    localStorage.removeItem(TIMER_START_KEY);
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
