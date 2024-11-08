import clsx from "clsx/lite";
import { TimerState } from "./useTimer";

export function Timer({
  totalElapsedTime,
  dailyElapsedTime,
  isRunning,
  startTimer,
  stopTimer,
  resetTimer,
}: TimerState) {
  const totalElapsed = formatTime(totalElapsedTime);
  const dailyElapsed = formatTime(dailyElapsedTime);

  return (
    <div className={clsx("flex", "flex-col", "items-start", "gap-2")}>
      <span className={clsx("bg-blue-400", "p-2")}>
        <span className={clsx("text-white")}>Hours worked</span>
      </span>
      <div className={clsx("flex")}>
        <span>
          {totalElapsed.hh}:{totalElapsed.mm}:{totalElapsed.ss}
        </span>
      </div>
      <span className={clsx("bg-blue-400", "p-2")}>
        <span className={clsx("text-white")}>Hours worked today</span>
      </span>
      <div className={clsx("flex")}>
        <span>
          {dailyElapsed.hh}:{dailyElapsed.mm}:{dailyElapsed.ss}
        </span>
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
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return {
    hh: hours.toString().padStart(2, "0"),
    mm: minutes.toString().padStart(2, "0"),
    ss: seconds.toString().padStart(2, "0"),
  };
}
