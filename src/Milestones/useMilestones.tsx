import { useEffect, useState } from "react";
import { Milestone } from "./milestoneTypes";

const MILESTONES_KEY = "milestones";

interface MilestonesProps {
  rate: number;
  elapsedTime: number;
}

export interface MilestonesState {
  milestones: Milestone[];
  addMilestone: (newMilestone: Omit<Milestone, "progress">) => void;
  deleteAllMilestones: () => void;
}

export function useMilestones({
  rate,
  elapsedTime,
}: MilestonesProps): MilestonesState {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const storedMilestones = localStorage.getItem(MILESTONES_KEY);
    return storedMilestones ? JSON.parse(storedMilestones) : [];
  });

  useEffect(() => {
    const totalEarned = calculateTotalEarned(rate, elapsedTime);
    let totalLeft = totalEarned;
    const updatedMilestones: Milestone[] = [];
    for (let i = 0; i < milestones.length; i++) {
      const m = milestones[i];
      if (totalLeft >= m.amount) {
        totalLeft -= m.amount;
        m.progress = Math.round(m.amount * 100) / 100;
      } else {
        m.progress = Math.round(totalLeft * 100) / 100;
      }
      updatedMilestones.push(m);
    }
    setMilestones(updatedMilestones);
  }, [rate, elapsedTime]);

  function addMilestone(newMilestone: Omit<Milestone, "progress">) {
    const updatedMilestones = [...milestones, { ...newMilestone, progress: 0 }];
    const filteredMilestones = updatedMilestones.map((m) => ({
      name: m.name,
      amount: m.amount,
    }));
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(filteredMilestones));
    setMilestones(updatedMilestones);
  }

  function deleteAllMilestones() {
    const confirmReset = window.confirm(
      "Are you sure you want to delete all milestones?"
    );
    if (!confirmReset) return;
    localStorage.removeItem(MILESTONES_KEY);
    setMilestones([]);
  }

  return { milestones, addMilestone, deleteAllMilestones };
}

function calculateTotalEarned(rate: number, elapsedTime: number) {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return rate * hours + (rate / 60) * minutes + (rate / 3600) * seconds;
}
