import { MilestoneList } from "./Milestones/MilestoneList";
import { useMilestones } from "./Milestones/useMilestones";
import { Rate } from "./Rate/Rate";
import { useRate } from "./Rate/useRate";
import { Timer } from "./Timer/Timer";
import { useTimer } from "./Timer/useTimer";

function App() {
  const rateState = useRate();
  const timerState = useTimer();
  const milestoneState = useMilestones({
    rate: rateState.rate,
    elapsedTime: timerState.totalElapsedTime,
  });

  return (
    <>
      <MilestoneList {...milestoneState} />
      <Rate {...rateState} />
      <Timer {...timerState} />
    </>
  );
}

export default App;
