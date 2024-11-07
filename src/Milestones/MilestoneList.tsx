import { Fragment, useState } from "react";
import { MilestonesState } from "./useMilestones";
import {
  StreamBendLeft,
  StreamBendLeftHalf,
  StreamBendRight,
  StreamVertical,
} from "../Tiles/Streams";
import clsx from "clsx/lite";
import { PoolFull, PoolLow } from "../Tiles/Pools";

export function MilestoneList({
  milestones,
  addMilestone,
  deleteAllMilestones,
}: MilestonesState) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addMilestone({ name, amount });
    setName("");
    setAmount(0);
  }

  function handleAmountFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
  }
  return (
    <>
      <div className={clsx("grid", "grid-cols-6", "gap-0", "w-[600px]")}>
        <StreamVertical />
        <StreamBendLeftHalf />
        {milestones.map((milestone, idx) => {
          const isLeft = idx % 2 === 0;
          const isLast = idx === milestones.length - 1;
          return (
            <Fragment key={milestone.name}>
              {isLeft && <PoolLow />}
              <div
                className={clsx(
                  "col-span-5",
                  "flex",
                  "flex-col",
                  "justify-center",
                  "px-4",
                  !isLeft && "text-right"
                )}
              >
                <strong>{milestone.name}:</strong>
                <span>
                  {milestone.progress} / {milestone.amount}
                </span>
              </div>
              {!isLeft && <PoolLow />}
              {!isLast && (isLeft ? <StreamBendRight /> : <StreamBendLeft />)}
            </Fragment>
          );
        })}
      </div>

      <div>
        <form onSubmit={handleAddSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            onFocus={handleAmountFocus}
          />
          <button type="submit">Add Milestone</button>
        </form>
        <button onClick={deleteAllMilestones}>Reset milestones</button>
      </div>
    </>
  );
}
