import AdminSideBar from "../components/AdminSideBar";
import AdminPackageForm from "../components/AdminPackageForm";
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
    package_details: [""],
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
      const result = await axios.get(`http://localhost:4000/packages/${id}`);
      const image = await axios.get(
        `https://gacngpsoekbrifxahpkg.supabase.co/storage/v1/object/public/Files/${result.data.data.package_icon}`
      );
      const blob = new Blob([image.data], {
        type: ["image/svg+xml"],
      });

      // const iconName = result.data.data.package_icon.split("/").pop();
      // const blob = {
      //   name: iconName,
      //   blob: new Blob([image.data], { type: "image/svg+xml" }),
      //   isUpload: true,
      // };

      setEditPackage({ ...result.data.data, package_icon: blob });
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
