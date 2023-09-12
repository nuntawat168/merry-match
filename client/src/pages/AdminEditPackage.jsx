import AdminSideBar from "../components/AdminSideBar";
import AdminAddPackageForm from "../components/AdminPackageForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminEditPackage() {
  const params = useParams();
  const obj = { title: "Edit Premium", button: "Edit" };

  const initialValues = {
    package_name: "",
    package_price: 0,
    package_limit: 0,
    package_icon: "",
    package_details: [""],
    created_by: null,
  };

  const [editPackage, setEditPackage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getPackageById(params.id);
  }, []);

  const getPackageById = async (id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(`http://localhost:4000/packages/${id}`);
      setEditPackage(...result.data.data);
      console.log("edit package", editPackage);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching package data:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <h1>load</h1>
  ) : (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminAddPackageForm
        {...obj}
        initialValues={editPackage}
        // isLoading={isLoading}
        // isError={isError}
      />
    </div>
  );
}

export default AdminEditPackage;
