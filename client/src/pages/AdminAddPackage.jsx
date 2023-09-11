import "../App.css";
import AdminSideBar from "../components/AdminSideBar";
// import AdminNavBar from "../components/AdminNavBar";
import AdminAddPackageForm from "../components/AdminPackageForm";

function AdminAddPackage() {
  const obj = { title: "Add Package", button: "Create" };
  return (
    <div className="flex flex-row h-screen">
      <AdminSideBar />
      <AdminAddPackageForm {...obj} />
    </div>
  );
}

export default AdminAddPackage;
