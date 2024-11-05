import { useState } from "react";
import { Rate } from "./Rate";
import { Timer } from "./Timer/Timer";
import { useTimer } from "./Timer/useTimer";

function App() {
  const rateState = useState<number>(0);
  const timerState = useTimer();

  return (
    <>
      <Rate rateState={rateState} />
      <Timer {...timerState} />
    </>
  );
}

export default App;
