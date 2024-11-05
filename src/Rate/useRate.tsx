import { useState } from "react";

const RATE_KEY = "rate";

export interface RateState {
  rate: number;
  updateRate: (newRate: number) => void;
}

export function useRate(): RateState {
  const [rate, setRate] = useState<number>(() => {
    const storedRate = localStorage.getItem(RATE_KEY);
    return storedRate ? parseInt(storedRate) : 0;
  });

  function updateRate(newRate: number) {
    localStorage.setItem(RATE_KEY, newRate.toString());
    setRate(newRate);
  }

  return { rate, updateRate };
}
