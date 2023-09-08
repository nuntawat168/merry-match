import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [dataAgain, setDataAgain] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);
  return (
    <UserContext.Provider
      value={{
        dataAgain,
        setDataAgain,
        dataPackage,
        setDataPackage,
        dataAdmin,
        setDataAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UseGlobalContext = () => {
  return useContext(UserContext);
};
// callback
export { ContextProvider, UseGlobalContext };
