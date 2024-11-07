import clsx from "clsx/lite";
import React, { useState } from "react";
import { RateState } from "./useRate";

export function Rate({ rate, updateRate }: RateState) {
  const [rateInput, setRateInput] = useState<string>(rate.toString());

  function handleRateFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  return (
    <div className={clsx("absolute", "top-0", "right-0", "p-2")}>
      <label>
        Current rate: $
        <input
          className={clsx(
            "bg-gray-50",
            "border",
            "border-gray-300",
            "text-gray-900",
            "text-sm",
            "rounded-lg",
            "focus:ring-blue-500",
            "focus:border-blue-500",
            "inline-block",
            "w-[50px]",
            "p-1"
          )}
          type="number"
          value={rateInput}
          onChange={(e) => setRateInput(e.target.value)}
          onFocus={handleRateFocus}
          onBlur={() => updateRate(parseInt(rateInput))}
        />{" "}
        / hr
      </label>
    </div>
  );
}
