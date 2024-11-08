import { Fragment, useState } from "react";
import { MilestonesState } from "./useMilestones";
import {
  StreamBendLeft,
  StreamBendRight,
  StreamVertical,
} from "../Tiles/Streams";
import clsx from "clsx/lite";
import { Pool } from "../Tiles/Pools";

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
      <div className={clsx("grid", "grid-cols-3", "gap-0", "w-[300px]")}>
        <StreamVertical />
        <StreamBendLeft isDry={false} />
        {/* {milestones.map((milestone, idx) => {
          const isLeft = idx % 2 === 0;
          const isLast = idx === milestones.length - 1;
          let poolState: "empty" | "low" | "full";
          if (milestone.progress === 0) {
            poolState = "empty";
          } else if (milestone.progress === milestone.amount) {
            poolState = "full";
          } else {
            poolState = "low";
          }
          const isDry = poolState !== "full";
          return (
            <Fragment key={milestone.name}>
              {isLeft && <Pool state={poolState} />}
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
              {!isLeft && <Pool state={poolState} />}
              {!isLast &&
                (isLeft ? (
                  <StreamBendRight isDry={isDry} />
                ) : (
                  <StreamBendLeft isDry={isDry} />
                ))}
            </Fragment>
          );
        })} */}
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
