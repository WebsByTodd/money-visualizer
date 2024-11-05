import { useState } from "react";
import { Rate } from "./Rate";

function App() {
  const rateState = useState<number>(0);

  return (
    <>
      <Rate rateState={rateState} />
    </>
  );
}

export default App;
