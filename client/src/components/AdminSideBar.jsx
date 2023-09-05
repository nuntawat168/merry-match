import logo from "../assets/icon/logo.svg";
import box from "../assets/icon/package.svg";
import complaint from "../assets/icon/complaint.svg";
import logOut from "../assets/icon/logout.svg";

function AdminSideBar() {
  return (
    <aside className="flex flex-col justify-start w-[240px] h-screen border border-gray-200">
      <div className="flex flex-col p-6 h-1/4">
        <img className=" w-[187px] h-[63px]" src={logo} alt="merryMatchLogo" />
        <div className="flex justify-center text-gray-700 text-sm ">
          Admin Panel Control
        </div>
      </div>

      <div className=" h-2/4 border border-gray-200">
        <div className=" flex justify-center p-6 hover:bg-gray-200">
          <img src={box} alt="box" className=" w-6" />
          <a href="#" className=" flex pl-2 w-[152px] text-gray-800 font-bold ">
            Merry Package
          </a>
        </div>
        <div className=" flex justify-center p-6 hover:bg-gray-200">
          <img src={complaint} alt="box" className="w-6" />
          <a
            href="#"
            className=" flex pl-2 items-center w-[152px] text-gray-800 font-bold"
          >
            Complaints
          </a>
        </div>
      </div>

      <div className=" h-1/4 border border-gray-200">
        <div className=" flex justify-center p-6 hover:bg-gray-200">
          <img src={logOut} alt="box" className=" w-6" />
          <a
            href="#"
            className=" flex pl-2 items-center w-[152px] text-gray-800 font-bold"
          >
            Log out
          </a>
        </div>
      </div>
    </aside>
  );
}

export default AdminSideBar;
