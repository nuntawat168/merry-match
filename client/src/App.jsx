import { useState } from "react";
import "./App.css";
import Content from "./components/Content";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <Content />
      {/* <Footer /> */}
    </>
  );
}

export default App;
