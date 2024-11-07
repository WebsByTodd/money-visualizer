import clsx from "clsx/lite";
import { useState } from "react";
import { TimerState } from "./useTimer";

export function Timer({
  totalElapsedTime,
  dailyElapsedTime,
  isRunning,
  startTimer,
  stopTimer,
  resetTimer,
  updateTime,
}: TimerState) {
  const totalElapsed = formatTime(totalElapsedTime);
  const dailyElapsed = formatTime(dailyElapsedTime);

  const [totalHoursInput, setTotalHoursInput] = useState<string>(
    totalElapsed.hh
  );
  const [totalMinutesInput, setTotalMinutesInput] = useState<string>(
    totalElapsed.mm
  );
  const [dailyHoursInput, setDailyHoursInput] = useState<string>(
    dailyElapsed.hh
  );
  const [dailyMinutesInput, setDailyMinutesInput] = useState<string>(
    dailyElapsed.mm
  );

  return (
    <div className={clsx("flex", "flex-col", "items-start", "gap-2")}>
      <span className={clsx("bg-blue-400", "p-2")}>
        <span className={clsx("text-white")}>Hours worked</span>
      </span>
      <div className={clsx("flex")}>
        <input
          className={clsx("block", "w-[20px]")}
          type="text"
          value={totalHoursInput}
          onChange={(e) => setTotalHoursInput(e.target.value)}
          onBlur={() => {
            updateTime("total", "hours", parseInt(totalHoursInput));
            setTotalHoursInput((prev) => prev.padStart(2, "0"));
          }}
        />
        <span>:</span>
        <input
          className={clsx("block", "w-[20px]")}
          type="text"
          value={totalMinutesInput}
          onChange={(e) => setTotalMinutesInput(e.target.value)}
          onBlur={() => {
            updateTime("total", "minutes", parseInt(totalMinutesInput));
            setTotalMinutesInput((prev) => prev.padStart(2, "0"));
          }}
        />
      </div>
      <span className={clsx("bg-blue-400", "p-2")}>
        <span className={clsx("text-white")}>Hours worked today</span>
      </span>
      <div className={clsx("flex")}>
        <input
          className={clsx("block", "w-[20px]")}
          type="text"
          value={dailyHoursInput}
          onChange={(e) => setDailyHoursInput(e.target.value)}
          onBlur={() => {
            updateTime("daily", "hours", parseInt(dailyHoursInput));
            setDailyHoursInput((prev) => prev.padStart(2, "0"));
          }}
        />
        <span>:</span>
        <input
          className={clsx("block", "w-[20px]")}
          type="text"
          value={dailyMinutesInput}
          onChange={(e) => setDailyMinutesInput(e.target.value)}
          onBlur={() => {
            updateTime("daily", "minutes", parseInt(dailyMinutesInput));
            setDailyMinutesInput((prev) => prev.padStart(2, "0"));
          }}
        />
        <span>:{dailyElapsed.ss}</span>
      </div>
      <div className={clsx("flex", "gap-2")}>
        <button
          className={clsx(
            "text-white",
            "bg-blue-700",
            "hover:bg-blue-800",
            "focus:ring-4",
            "focus:outline-none",
            "focus:ring-blue-300",
            "font-medium",
            "rounded-lg",
            "text-sm",
            "w-full",
            "sm:w-auto",
            "px-5",
            "py-2.5",
            "text-center"
          )}
          onClick={startTimer}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className={clsx(
            "text-white",
            "bg-blue-700",
            "hover:bg-blue-800",
            "focus:ring-4",
            "focus:outline-none",
            "focus:ring-blue-300",
            "font-medium",
            "rounded-lg",
            "text-sm",
            "w-full",
            "sm:w-auto",
            "px-5",
            "py-2.5",
            "text-center"
          )}
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          className={clsx(
            "text-white",
            "bg-blue-700",
            "hover:bg-blue-800",
            "focus:ring-4",
            "focus:outline-none",
            "focus:ring-blue-300",
            "font-medium",
            "rounded-lg",
            "text-sm",
            "w-full",
            "sm:w-auto",
            "px-5",
            "py-2.5",
            "text-center"
          )}
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Format elapsed time in hh:mm:ss
interface Time {
  hh: string;
  mm: string;
  ss: string;
}
function formatTime(time: number): Time {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hh: hours.toString().padStart(2, "0"),
    mm: minutes.toString().padStart(2, "0"),
    ss: seconds.toString().padStart(2, "0"),
  };
}
