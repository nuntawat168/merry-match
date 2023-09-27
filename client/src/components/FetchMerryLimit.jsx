import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const fetchMerryLimit = async () => {
    try {
        const token = localStorage.getItem("token");
        const user = jwtDecode(token);
        const user_id = user.id;
        const response = await axios.get(
        `http://localhost:4000/user-package/${user_id}`
        );
        const result = response.data.packageResult[0].package_limit
        return result ? result : 20;
    } catch (error) {
        console.log("Error fetching match list data: ", error);
    }
};