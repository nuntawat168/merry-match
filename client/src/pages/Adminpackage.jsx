import AdminAddPackageForm from "../components/AdminPackageForm";
import AdminSideBar from "../components/AdminSideBar";

function AdminPackage() {
  return (
    <div className="flex w-full">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="w-full">
        <AdminAddPackageForm />
      </div>
    </div>
  );
}
export default AdminPackage;
