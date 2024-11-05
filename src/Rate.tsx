import React, { useState } from "react";
import { ReactState } from "./types";

interface RateProps {
  rateState: ReactState<number>;
}
export function Rate({ rateState }: RateProps) {
  const [rate, setRate] = rateState;
  const [rateInput, setRateInput] = useState<string>(rate.toString());

  function handleRateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRate(parseInt(rateInput));
  }

  function handleRateFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  return (
    <>
      <form onSubmit={handleRateSubmit}>
        <input
          type="number"
          value={rateInput}
          onChange={(e) => setRateInput(e.target.value)}
          onFocus={handleRateFocus}
        />
        <button type="submit">Set Rate</button>
      </form>
      <p>
        Current rate: <strong>{rate}</strong>
      </p>
    </>
  );
}
