import clsx from "clsx/lite";

export function StreamVertical() {
  return (
    <>
      <Space />
      <Space />
      <Water />
      <Space />
      <Space />
      <Space />
    </>
  );
}

export function StreamBendLeftHalf() {
  return (
    <>
      <div
        className={clsx(
          "relative",
          "w-[100px]",
          "h-[100px]",
          "bg-white",
          "after:content-['']",
          "after:absolute",
          "after:inset-0",
          "after:bg-blue-500",
          "after:rounded-tl-full",
          "after:w-full",
          "after:h-full",
          "after:clip-circle-[50%_at_0_0]"
        )}
      />
      <Water />
      <div
        className={clsx(
          "relative",
          "w-[100px]",
          "h-[100px]",
          "bg-white",
          "after:content-['']",
          "after:absolute",
          "after:inset-0",
          "after:bg-blue-500",
          "after:rounded-br-full",
          "after:w-full",
          "after:h-full",
          "after:clip-circle-[50%_at_100%_100%]"
        )}
      />
      <Space />
      <Space />
      <Space />
    </>
  );
}

interface StreamProps {
  isDry: boolean;
}

export function StreamBendLeft({ isDry }: StreamProps) {
  return (
    <>
      <div
        className={clsx(
          "relative",
          "w-[100px]",
          "h-[100px]",
          "bg-white",
          "after:content-['']",
          "after:absolute",
          "after:inset-0",
          isDry ? "after:bg-yellow-500" : "after:bg-blue-500",
          "after:rounded-tl-full",
          "after:w-full",
          "after:h-full",
          "after:clip-circle-[50%_at_0_0]"
        )}
      />
      {isDry ? (
        <>
          <Dirt />
          <Dirt />
          <Dirt />
          <Dirt />
        </>
      ) : (
        <>
          <Water />
          <Water />
          <Water />
          <Water />
        </>
      )}
      <div
        className={clsx(
          "relative",
          "w-[100px]",
          "h-[100px]",
          "bg-white",
          "after:content-['']",
          "after:absolute",
          "after:inset-0",
          isDry ? "after:bg-yellow-500" : "after:bg-blue-500",
          "after:rounded-br-full",
          "after:w-full",
          "after:h-full",
          "after:clip-circle-[50%_at_100%_100%]"
        )}
      />
    </>
  );
}

export function StreamBendRight({ isDry }: StreamProps) {
  return (
    <>
      <div
        className={clsx(
          "relative",
          "w-[100px]",
          "h-[100px]",
          "bg-white",
          "after:content-['']",
          "after:absolute",
          "after:inset-0",
          isDry ? "after:bg-yellow-500" : "after:bg-blue-500",
          "after:rounded-bl-full",
          "after:w-full",
          "after:h-full",
          "after:clip-circle-[50%_at_0_100%]"
        )}
      />
      {isDry ? (
        <>
          <Dirt />
          <Dirt />
          <Dirt />
          <Dirt />
        </>
      ) : (
        <>
          <Water />
          <Water />
          <Water />
          <Water />
        </>
      )}
      <div
        className={clsx(
          "relative",
          "w-[100px]",
          "h-[100px]",
          "bg-white",
          "after:content-['']",
          "after:absolute",
          "after:inset-0",
          isDry ? "after:bg-yellow-500" : "after:bg-blue-500",
          "after:rounded-tr-full",
          "after:w-full",
          "after:h-full",
          "after:clip-circle-[50%_at_100%_0]"
        )}
      />
    </>
  );
}

function Space() {
  return <div className={clsx("w-[100px]", "h-[100px]")}></div>;
}

function Water() {
  return <div className={clsx("w-[100px]", "h-[100px]", "bg-blue-500")} />;
}

function Dirt() {
  return <div className={clsx("w-[100px]", "h-[100px]", "bg-yellow-500")} />;
}
