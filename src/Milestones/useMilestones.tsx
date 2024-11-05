import { useState } from "react";
import { Milestone } from "./milestoneTypes";

const MILESTONES_KEY = "milestones";

export interface MilestoneState {
  milestones: Milestone[];
  addMilestone: (newMilestone: Milestone) => void;
}

export function useMilestones(): MilestoneState {
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const storedMilestones = localStorage.getItem(MILESTONES_KEY);
    return storedMilestones ? JSON.parse(storedMilestones) : [];
  });

  function addMilestone(newMilestone: Milestone) {
    const updatedMilestones = [...milestones, newMilestone];
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(updatedMilestones));
    setMilestones(updatedMilestones);
  }

  return { milestones, addMilestone };
}
