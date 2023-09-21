import AdminSideBar from "../components/AdminSideBar";

function AdminComplaintSeeDetailPage() {
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

export default AdminComplaintSeeDetailPage;
