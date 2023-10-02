import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const usePackages = () => {
  const navigate = useNavigate();
  const params = useParams();

  const createPackage = async (values) => {
    console.log("createPackage", values);
    try {
      await axios.post("https://merry-match.onrender.com/packages", values);
      navigate("/package");
    } catch (error) {
      console.log("Request error:", error);
    }
  };

  const updatePackage = async (values) => {
    try {
      await axios.put(
        `https://merry-match.onrender.com/packages/${params.id}`,
        values
      );
      navigate("/package");
    } catch (error) {
      console.log("Request error:", error);
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`https://merry-match.onrender.com/packages/${id}`);
      navigate("/package");
    } catch (error) {
      console.log("Request error:", error);
    }
  };
  return {
    createPackage,
    updatePackage,
    deletePackage,
  };
};

export default usePackages;
