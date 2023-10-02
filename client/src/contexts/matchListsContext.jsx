import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/authentication";

const MatchListsContext = React.createContext();

function MatchListsProvider(props) {
  const { isAuthenticated } = useAuth();
  const [matchLists, setMatchLists] = useState([]);

  const fetchData = async () => {
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem("token");
        const user = jwtDecode(token);
        const user_id = user.id;
        const response = await axios.get(
          `https://merry-match.onrender.com/matchlist/v2/${user_id}`
        );
        setMatchLists(response.data.matchData);
      }
    } catch (error) {
      console.log("Error fetching match list data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MatchListsContext.Provider
      value={{ fetchData, matchLists, setMatchLists }}
    >
      {props.children}
    </MatchListsContext.Provider>
  );
}

const useMatchLists = () => React.useContext(MatchListsContext);

export { MatchListsProvider, useMatchLists };
