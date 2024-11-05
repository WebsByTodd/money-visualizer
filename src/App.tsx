import { useState } from "react";
import { Rate } from "./Rate";
import { Timer } from "./Timer";

function App() {
  const rateState = useState<number>(0);

  return (
    <>
      <Rate rateState={rateState} />
      <Timer />
    </>
  );
}

export default App;
