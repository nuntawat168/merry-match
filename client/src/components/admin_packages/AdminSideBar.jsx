<<<<<<< HEAD:client/src/components/admin_packages/AdminSideBar.jsx
import logo from "../../assets/icon/logo.svg";
import box from "../../assets/icon/package.svg";
import complaint from "../../assets/icon/complaint.svg";
import logOut from "../../assets/icon/logout.svg";
import { useAuth } from "../../contexts/authentication";
=======
import logo from "../assets/icon/logo.svg";
import box from "../assets/icon/package.svg";
import complaint from "../assets/icon/complaint.svg";
import logOut from "../assets/icon/logout.svg";
import { useAuth } from "../contexts/authentication";
>>>>>>> e2b2948 (bambam:complete-packageAdminPage-finish):client/src/components/AdminSideBar.jsx
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AdminSideBar() {
  const { logout } = useAuth();
  const location = useLocation();
  return (
    <aside className="flex flex-col justify-start w-[240px] h-screen border border-gray-200">
      <div className="flex flex-col p-6 h-1/4">
        <img className=" w-[187px] h-[63px]" src={logo} alt="merryMatchLogo" />
        <div className="flex justify-center text-gray-700 text-sm ">
          Admin Panel Control
        </div>
      </div>

      <div className=" h-2/4 border border-gray-200">
        <div
          className={` flex justify-center p-6 ${
            location.pathname === "/package" ? "bg-gray-200" : ""
          }`}
        >
          <img src={box} alt="box" className=" w-6" />
          <Link
            to="/package"
            className=" flex pl-2 w-[152px] text-gray-800 font-bold "
          >
            Merry Package
          </Link>
        </div>
        <div
          className={` flex justify-center p-6 ${
            location.pathname === "/Complaint" ? "bg-gray-200" : ""
          }`}
        >
          <img src={complaint} alt="box" className="w-6" />
          <Link
            to="/Complaint"
            className=" flex pl-2 items-center w-[152px] text-gray-800 font-bold "
          >
            Complaints
          </Link>
        </div>
      </div>

      <div className=" h-1/4 border border-gray-200">
        <div className=" flex justify-center p-6 hover:bg-gray-200">
          <img src={logOut} alt="box" className=" w-6" />
          <button
            onClick={logout}
            className=" flex pl-2 items-center w-[152px] text-gray-800 font-bold"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSideBar;
