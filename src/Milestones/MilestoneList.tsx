import { useState } from "react";
import { MilestonesState } from "./useMilestones";

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
      {milestones.map((milestone) => (
        <div key={milestone.name}>
          <strong>{milestone.name}</strong>: {milestone.amount} /{" "}
          {milestone.progress}
        </div>
      ))}
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
    </>
  );
}
