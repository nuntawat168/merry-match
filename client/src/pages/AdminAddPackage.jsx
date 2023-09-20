import "../App.css";
import AdminSideBar from "../components/admin_packages/AdminSideBar";
import AdminPackageForm from "../components/admin_packages/AdminPackageForm";

function AdminAddPackage() {
  const obj = { title: "Add Package", button: "Create" };

  const initialValues = {
    package_name: "",
    package_price: 0,
    package_limit: 0,
    package_icon: "",
    package_details: [{ detail: "" }],
    created_by: null,
  };

  return (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminPackageForm {...obj} initialValues={initialValues} />
    </div>
  );
}

export default AdminAddPackage;
