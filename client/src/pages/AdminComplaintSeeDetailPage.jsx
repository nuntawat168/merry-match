import AdminSideBar from "../components/admin_packages/AdminSideBar"
import AdminComplaintList from "../components/AdminComplaintList";
import AdminComplaintDetail from "../components/AdminComplaintDetail";

function AdminComplaintSeeDetailPage() {
  return (
    <div className="flex w-full">
      <div className="flex ">
        <AdminSideBar />
      </div>
      <div className="w-full">
        <AdminComplaintDetail />
      </div>
    </div>
  );
}

export default AdminComplaintSeeDetailPage;
