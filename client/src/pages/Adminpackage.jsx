import Admindetail from "../components/Admindetail";
import AdminSideBar from "../components/AdminSideBar";

function AdminPackage() {
  return (
    <div className="flex w-full">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="w-full">
        <Admindetail />
      </div>
    </div>
  );
}
export default AdminPackage;
