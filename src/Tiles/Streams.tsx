import clsx from "clsx/lite";
import waterStraight from "../assets/water-straight.png";
import waterBend from "../assets/water-bend.png";

export function StreamVertical() {
  return (
    <>
      <Space />
      <Space />
      <WaterStraight rotate={90} />
    </>
  );
}

interface StreamProps {
  isDry: boolean;
}

export function StreamBendLeft({ isDry }: StreamProps) {
  if (isDry) {
    return <> </>;
  }
  return (
    <>
      <WaterBend rotate={180} />
      <WaterStraight />
      <WaterBend />
    </>
  );
}

export function StreamBendRight({ isDry }: StreamProps) {
  if (isDry) {
    return <> </>;
  }
  return (
    <>
      <WaterBend rotate={90} />
      <WaterStraight />
      <WaterBend rotate={180} flip={true} />
    </>
  );
}

function Space() {
  return <div className={clsx("w-[100px]", "h-[100px]")}></div>;
}

interface OrientationProps {
  flip?: boolean;
  rotate?: 90 | 180;
}

function WaterStraight({ rotate }: OrientationProps) {
  return (
    <div className={clsx("w-[100px]", "h-[100px]")}>
      <img
        src={waterStraight}
        className={clsx(
          "w-full",
          "h-full",
          rotate === 90 && clsx("rotate-90", "scale-y-[-1]")
        )}
      />
    </div>
  );
}

function WaterBend({ flip, rotate }: OrientationProps) {
  return (
    <div className={clsx("w-[100px]", "h-[100px]")}>
      <img
        src={waterBend}
        className={clsx(
          "w-full",
          "h-full",
          rotate === 180 && clsx("rotate-180"),
          rotate === 90 && clsx("rotate-90"),
          flip && clsx("scale-x-[-1]")
        )}
      />
    </div>
  );
}

function Dirt() {
  return <div className={clsx("w-[100px]", "h-[100px]", "bg-yellow-500")} />;
}
