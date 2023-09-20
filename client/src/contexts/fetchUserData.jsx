import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication";

export function fetchUserData() {
    const { isAuthenticated } = useAuth(); 
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated) {
                    const token = localStorage.getItem("token");
                    const user = jwtDecode(token);
                    const user_id = user.id;
                    const response = await axios.get(`http://localhost:4000/user-profile/${user_id}`);
                    setUserData(response.data.data);
                    // console.log("ค่าที่ได้คือ ", userData);
                }
            } catch (error) {
                console.log("Error fetching user data: ", error);
            }
        };  

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    return userData;
}