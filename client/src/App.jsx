import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl underline text-red600 font-nunito font-bold">
        Basic Information
      </h1>
      <br />
    </>
  );
}

export default App;
