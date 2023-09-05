import "../App.css";
import AdminSideBar from "../components/AdminSideBar";
import AdminNavBar from "../components/AdminNavBar";
import { AdminAddPackageForm } from "../components/AdminAddPackageForm";

function AdminAddPackage() {
  return (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <div className="w-screen h-screen">
        <AdminNavBar />
        <AdminAddPackageForm />
      </div>
    </div>
  );
}

export default AdminAddPackage;
