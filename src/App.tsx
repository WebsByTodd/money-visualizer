import { Rate } from "./Rate/Rate";
import { Timer } from "./Timer/Timer";
import { useTimer } from "./Timer/useTimer";
import { useRate } from "./Rate/useRate";
import { MilestoneList } from "./Milestones/MilestoneList";
import { useMilestones } from "./Milestones/useMilestones";

function App() {
  const rateState = useRate();
  const timerState = useTimer();
  const milestoneState = useMilestones({
    rate: rateState.rate,
    elapsedTime: timerState.elapsedTime,
  });

  return (
    <>
      <Rate {...rateState} />
      <Timer {...timerState} />
      <MilestoneList {...milestoneState} />
    </>
  );
}

export default App;
