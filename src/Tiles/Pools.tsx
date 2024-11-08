import clsx from "clsx/lite";
import plantDead from "../assets/plant-dead.png";
import plantLow from "../assets/plant-low.png";
import plantMedium from "../assets/plant-medium.png";
import plantHigh from "../assets/plant-high.png";

interface PoolProps {
  state: "empty" | "low" | "medium" | "high";
}
export function Pool({ state }: PoolProps) {
  let src: string;
  if (state === "empty") {
    src = plantDead;
  } else if (state === "low") {
    src = plantLow;
  } else if (state === "medium") {
    src = plantMedium;
  } else {
    src = plantHigh;
  }
  return (
    <div className={clsx("w-[100px]", "h-[100px]")}>
      <img src={src} className={clsx("w-full", "h-full")} />
    </div>
  );
}
