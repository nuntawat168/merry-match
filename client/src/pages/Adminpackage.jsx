import AdminPackageList from "../components/admin_packages/AdminPackageList";
import AdminSideBar from "../components/admin_packages/AdminSideBar";

function AdminPackage() {
  return (
    <div className="flex w-full">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="w-full">
        <AdminPackageList />
      </div>
    </div>
  );
}
export default AdminPackage;
