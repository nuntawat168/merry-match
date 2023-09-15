import { createContext, useState, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [dataPackage, setDataPackage] = useState([]);
  const [dataAgain, setDataAgain] = useState([]);

  const [dataAdmin, setDataAdmin] = useState([]);
  const [savePackage, setSavePackage] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/packages");
      setDataPackage(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        fetchData,
        dataAgain,
        setDataAgain,
        dataPackage,
        setDataPackage,
        dataAdmin,
        setDataAdmin,
        savePackage,
        setSavePackage,
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
