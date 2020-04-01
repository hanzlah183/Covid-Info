import React, { useState, useEffect } from "react";

import App from "./App";
import Mobile from "./components/mobile/Mobile";

const Main = () => {
  const [state, setState] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => setState(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return <div>{state <= 1000? <Mobile /> : <App />}</div>;
};

export default Main;
