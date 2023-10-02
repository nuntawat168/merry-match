import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/authentication";

function fetchMatchListData() {
  const { isAuthenticated } = useAuth();
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const token = localStorage.getItem("token");
          const user = jwtDecode(token);
          const user_id = user.id;
          const response = await axios.get(
            `https://merry-match.onrender.com/matchlist/v2/${user_id}`
          );
          setMatchList(response.data.matchData);
        }
      } catch (error) {
        console.log("Error fetching match list data: ", error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  return matchList;
}

export { fetchMatchListData };
