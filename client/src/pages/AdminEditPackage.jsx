import AdminSideBar from "../components/AdminSideBar";
import AdminAddPackageForm from "../components/AdminPackageForm";

function AdminEditPackage() {
  const obj = { title: "Edit Premium", button: "Edit" };
  return (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminAddPackageForm {...obj} />
    </div>
  );
}

export default AdminEditPackage;
