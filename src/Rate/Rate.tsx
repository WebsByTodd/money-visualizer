import React, { useState } from "react";
import { RateState } from "./useRate";

export function Rate({ rate, updateRate }: RateState) {
  const [rateInput, setRateInput] = useState<string>(rate.toString());

  function handleRateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateRate(parseInt(rateInput));
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
