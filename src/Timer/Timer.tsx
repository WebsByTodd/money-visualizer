import { useTimer } from "./useTimer";

export function Timer() {
  const { elapsedTime, isRunning, startTimer, stopTimer, resetTimer } =
    useTimer();

  return (
    <div>
      <h1>Timer</h1>
      <p>{formatTime(elapsedTime)}</p>
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
function formatTime(time: number) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
