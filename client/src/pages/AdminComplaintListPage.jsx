import AdminSideBar from "../components/admin_packages/AdminSideBar";
import AdminComplaintList from "../components/AdminComplaintList";

function AdminComplaintListPage() {
  return (
    <div className="flex w-full">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="w-full">
        <AdminComplaintList />
      </div>
    </div>
  );
}
export default AdminComplaintListPage;
