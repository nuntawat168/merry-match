import axios from "axios";
import jwtDecode from "jwt-decode";

export const fetchMerryLimit = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const user_id = user.id;
    const response = await axios.get(
      `http://localhost:4000/user-package/${user_id}`
    );
    const userPackageLimit = response.data.packageResult[0].package_limit;
    const userMerryLimit = response.data.packageResult[0].merry_limit;
    const userPackageDetail = response.data.packageResult;
    return {
      userPackageLimit: userPackageLimit ? userPackageLimit : 10,
      userMerryLimit: userMerryLimit ? userMerryLimit : 10,
      userPackageDetail,
    };
  } catch (error) {
    console.log("Error fetching match list data: ", error);
  }
};
