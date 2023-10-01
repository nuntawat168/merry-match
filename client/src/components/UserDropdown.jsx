import premiumIcon from "../assets/icon/premium.svg";
import profileIcon from "../assets/icon/profile.svg";
import merryListIcon from "../assets/icon/merry light.svg";
import packageIcon from "../assets/icon/package.svg";
import complaintIcon from "../assets/icon/complaint.svg";
import logoutIcon from "../assets/icon/logout.svg";
import { useAuth } from "../contexts/authentication";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMerryLimit } from "./FetchMerryLimit";

function UserDropdown() {
  const { logout } = useAuth();
  const { userRole } = useAuth();
  const [isMember, setIsMember] = useState(false);


  // check package status
    const getPackageDetail = async () => {
      const { userPackageDetail } = await fetchMerryLimit();    
      let end_date_string = userPackageDetail[0].end_date.split('T')[0]
      const end_date = new Date(end_date_string);
      console.log("วันหมดอายุคือ ", end_date)
      const today = new Date();
      console.log('วันนี้คือวันที่', today)
      today <= end_date ? setIsMember(true) : setIsMember(false);  
      console.log("subscribe status", isMember);
  }
  
  useEffect(() => {   
    getPackageDetail()
  }, []);

  // const sectionHeight = userRole === "admin" ? "h-[2px]" : "h-[258px]";

  // เหลือเพิ่ม link ไปแต่ละหน้า
  let lists = [];

  if (userRole === "admin") {
    lists = [
      {
        icon: packageIcon,
        alt: "package icon",
        title: "Package",
        link: "/package",
      },
      {
        icon: complaintIcon,
        alt: "complaint icon",
        title: "Complaint",
        link: "/complaint",
      },
    ];
  } else {
    lists = [
      {
        icon: profileIcon,
        alt: "profile icon",
        title: "Profile",
        link: "/user-profile",
      },
      {
        icon: merryListIcon,
        alt: "merry list icon",
        title: "Merry list",
        link: "/merry-list",
      },
      {
        icon: packageIcon,
        alt: "package icon",
        title: "Merry Membership",
        link: isMember ? "/merry-list" : "/packages",
      },
      {
        icon: complaintIcon,
        alt: "complaint icon",
        title: "Complaint",
        link: "/complaint",
      },
    ];
  }

  const renderedLists = lists.map((list, index) => (
    <Link to={list.link} key={index}>
      <div className="flex py-[8px] mr-4 items-center hover:cursor-pointer">
        <img
          src={list.icon}
          alt={list.alt}
          className="ml-[16px] w-[16px] h-[16px] mr-[12px]"
        />
        <p>{list.title}</p>
      </div>
    </Link>
  ));

  return (
    <section className="flex flex-col z-20 w-[198px] bg-white rounded-2xl absolute top-[60px] right-[0px] font-nunito text-[14px] font-normal text-gray-700 shadow-userDropdown">
      {/* <div className="flex justify-center items-center mt-[10px] mb-[7px]">
        <div className="flex w-[179px] h-[41px] py-[10px] px-[24px] bg-linear rounded-[99px] cursor-pointer">
          <img
            src={premiumIcon}
            alt="premium icon"
            className="w-[16px] h-[16px] mr-[6px]"
          />
          <p className="text-white">More limit Merry!</p>
        </div>
      </div> */}
      <div>{renderedLists}</div>
      <div
        onClick={logout}
        className="flex items-center border-t-[1px] border-gray-300 mt-[7px] py-[8px] cursor-pointer"
      >
        <img
          src={logoutIcon}
          alt="logout icon"
          className="ml-[16px] w-[16px] h-[16px] mr-[12px]"
        />
        <p>Log out</p>
      </div>
    </section>
  );
}

export default UserDropdown;
