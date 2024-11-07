import clsx from "clsx/lite";

export function PoolFull() {
  return (
    <div
      className={clsx(
        "w-[100px]",
        "h-[100px]",
        "bg-blue-500",
        "rounded-full",
        "border",
        "border-gray-400"
      )}
    />
  );
}

export function PoolLow() {
  return (
    <div
      className={clsx(
        "relative",
        "w-[100px]",
        "h-[100px]",
        "bg-white",
        "rounded-full",
        "overflow-hidden",
        "border",
        "border-gray-400"
      )}
    >
      <div
        className={clsx(
          "absolute",
          "bottom-0",
          "w-full",
          "h-1/3",
          "bg-blue-500"
        )}
      ></div>
    </div>
  );
}
