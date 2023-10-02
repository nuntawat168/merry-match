import AdminSideBar from "../components/admin_packages/AdminSideBar";
import AdminPackageForm from "../components/admin_packages/AdminPackageForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminEditPackage() {
  const params = useParams();
  const obj = {
    title: "Edit Premium",
    button: "Edit",
    remove: "Delete Package",
  };

  const initialValues = {
    package_name: "",
    package_price: 0,
    package_limit: 0,
    package_icon: "",
    package_details: [{}],
    created_by: null,
  };

  const [editPackage, setEditPackage] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getPackageById(params.id);
  }, []);

  const getPackageById = async (id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `https://merry-match.onrender.com/packages/${id}`
      );
      setEditPackage(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminPackageForm {...obj} initialValues={editPackage} />
    </div>
  );
}

export default AdminEditPackage;
