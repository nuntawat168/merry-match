import AdminSideBar from "../components/AdminSideBar";
import AdminAddPackageForm from "../components/AdminPackageForm";

function AdminEditPackage() {
  return (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminAddPackageForm add="Add Package" edit="Edit Package" />
    </div>
  );
}

export default AdminEditPackage;
