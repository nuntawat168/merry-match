import AdminPackageDetail from "../components/admin_packages/AdminPackageDetail";
import AdminSideBar from "../components/admin_packages/AdminSideBar";

function AdminPackage() {
  return (
    <div className="flex w-full">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="w-full">
        <AdminPackageDetail />
      </div>
    </div>
  );
}
export default AdminPackage;
