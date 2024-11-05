import { Rate } from "./Rate/Rate";
import { Timer } from "./Timer/Timer";
import { useTimer } from "./Timer/useTimer";
import { useRate } from "./Rate/useRate";

function App() {
  const rateState = useRate();
  const timerState = useTimer();

  return (
    <>
      <Rate {...rateState} />
      <Timer {...timerState} />
    </>
  );
}

export default App;
