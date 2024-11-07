import clsx from "clsx/lite";
import { TimerState } from "./useTimer";
import { useState } from "react";

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
    <div>
      <h1>Total Time</h1>
      <div className={clsx("flex")}>
        <input
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
          type="text"
          value={totalMinutesInput}
          onChange={(e) => setTotalMinutesInput(e.target.value)}
          onBlur={() => {
            updateTime("total", "minutes", parseInt(totalMinutesInput));
            setTotalMinutesInput((prev) => prev.padStart(2, "0"));
          }}
        />
      </div>
      <h1>Today</h1>
      <div className={clsx("flex")}>
        <input
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
