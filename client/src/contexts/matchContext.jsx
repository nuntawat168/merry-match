import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const MatchContext = React.createContext();

function MatchProvider(props) {
  const [contentToRender, setContentToRender] = useState("Matching");
  return (
    <MatchContext.Provider value={{ contentToRender, setContentToRender }}>
      {props.children}
    </MatchContext.Provider>
  );
}

const useMatch = () => React.useContext(MatchContext);

export { MatchProvider, useMatch };
