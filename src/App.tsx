import clsx from "clsx/lite";
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
    <div className={clsx("flex", "justify-around")}>
      <div>
        <MilestoneList {...milestoneState} />
      </div>
      <div>
        <Rate {...rateState} />
        <Timer {...timerState} />
      </div>
    </div>
  );
}

export default App;
