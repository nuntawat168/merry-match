import "../App.css";
import AdminSideBar from "../components/AdminSideBar";
// import AdminNavBar from "../components/AdminNavBar";
import AdminAddPackageForm from "../components/AdminPackageForm";

function AdminAddPackage() {
  return (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminAddPackageForm />
    </div>
  );
}

export default AdminAddPackage;
