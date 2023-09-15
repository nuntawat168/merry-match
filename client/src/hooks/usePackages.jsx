import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const usePackages = () => {
  const navigate = useNavigate();
  const params = useParams();

  const createPackage = async (values) => {
    console.log("createPackage", values);
    try {
      await axios.post("http://localhost:4000/packages", values);
      navigate("/admin");
    } catch (error) {
      console.log("Request error:", error);
    }
  };

  const updatePackage = async (values) => {
    try {
      await axios.put(`http://localhost:4000/packages/${params.id}`, values);
      navigate("/admin");
    } catch (error) {
      console.log("Request error:", error);
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/packages/${id}`);
      navigate("/admin");
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
