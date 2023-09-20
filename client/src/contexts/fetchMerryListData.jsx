import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication";

export function fetchMatchListData() {
    const { isAuthenticated } = useAuth(); 
    const [matchList, setMatchList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated) {
                    const token = localStorage.getItem("token");
                    const user = jwtDecode(token);
                    const user_id = user.id;
                    const response = await axios.get(`http://localhost:4000/user/matchlist/${user_id}`);
                    setMatchList(response.data.data);
                    console.log(matchList)
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

export function fetchLikeListData() {
    const { isAuthenticated } = useAuth(); 
    const [likeList, setLikeList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated) {
                    const token = localStorage.getItem("token");
                    const user = jwtDecode(token);
                    const user_id = user.id;
                    const response = await axios.get(`http://localhost:4000/user/likelist/${user_id}`);
                    setLikeList(response.data.data);
                }
            } catch (error) {
                console.log("Error fetching like list data: ", error);
            }
        };  

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    return likeList;
}
