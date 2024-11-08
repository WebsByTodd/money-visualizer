import clsx from "clsx/lite";
import waterStraight from "../assets/water-straight.png";
import waterBend from "../assets/water-bend.png";
import dryStraight from "../assets/dry-straight.png";
import dryBend from "../assets/dry-bend.png";

export function StreamVertical() {
  return (
    <>
      <Space />
      <Space />
      <StreamStraight rotate={90} isDry={false} />
    </>
  );
}

interface StreamProps {
  isDry: boolean;
}

export function StreamBendLeft({ isDry }: StreamProps) {
  return (
    <>
      <StreamBend isDry={isDry} rotate={180} />
      <StreamStraight isDry={isDry} />
      <StreamBend isDry={isDry} />
    </>
  );
}

export function StreamBendRight({ isDry }: StreamProps) {
  return (
    <>
      <StreamBend isDry={isDry} rotate={90} />
      <StreamStraight isDry={isDry} />
      <StreamBend isDry={isDry} rotate={180} flip={true} />
    </>
  );
}

function Space() {
  return <div className={clsx("w-[100px]", "h-[100px]")}></div>;
}

interface StreamProps {
  isDry: boolean;
  flip?: boolean;
  rotate?: 90 | 180;
}

function StreamStraight({ isDry, rotate }: StreamProps) {
  return (
    <div className={clsx("w-[100px]", "h-[100px]")}>
      <img
        src={isDry ? dryStraight : waterStraight}
        className={clsx(
          "w-full",
          "h-full",
          rotate === 90 && clsx("rotate-90", "scale-y-[-1]")
        )}
      />
    </div>
  );
}

function StreamBend({ isDry, flip, rotate }: StreamProps) {
  return (
    <div className={clsx("w-[100px]", "h-[100px]")}>
      <img
        src={isDry ? dryBend : waterBend}
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
