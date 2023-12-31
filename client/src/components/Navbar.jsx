import logo from "../assets/icon/logo.svg";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import notiIcon from "../assets/icon/noti.svg";
import UserDropdown from "./UserDropdown";
import Notification from "./Notification";
import { useAuth } from "../contexts/authentication";
import { HashLink } from "react-router-hash-link";
import { fetchUserData } from "../contexts/fetchUserData";
import NotificationBadge from "./NotificationBadge";
import { useSocket } from "../contexts/socketContext";
import { fetchMerryLimit } from "./FetchMerryLimit";

function Navbar() {
  const { isAuthenticated } = useAuth(); // get authen value
  const [subscribed, setSubscribed] = useState(false); // รอใส่สถานะว่าสมัครแพคเกจแล้วยัง
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  // const { notifications } = useSocket();

  if (isAuthenticated) {
    var { notifications } = useSocket();
  }

  const userData = fetchUserData();

  const toggleUserDropdown = () => {
    setNotificationDropdown(false);
    setUserDropdown(!userDropdown);
  };

  const toggleNotificationDropdown = () => {
    setUserDropdown(false);
    setNotificationDropdown(!notificationDropdown);
  };

  // check package status
  const getPackageDetail = async () => {
    const { userPackageDetail } = await fetchMerryLimit();    
    let end_date_string = userPackageDetail[0].end_date.split('T')[0]
    const end_date = new Date(end_date_string);
    const today = new Date();
    today <= end_date ? setSubscribed(true) : setSubscribed(false);  
    console.log("subscribe status", subscribed)
  }

  useEffect(() => {   
    getPackageDetail()
  }, []);

  // create a rendering condition for each list
  const anchors = [
    {
      id: 1,
      destination: isAuthenticated ? "/match" : "whyMerryMatch",
      text: isAuthenticated ? "Start Matching!" : "Why Merry Match?",
    },
    {
      id: 2,
      destination: isAuthenticated
        ? subscribed
          ? "/merry-list"
          : "/packages"
        : "howToMerry",
      text: isAuthenticated ? "Merry Membership" : "How to Merry",
    },
  ];

  const location = useLocation(); // to check current page

  // render each list
  const renderAnchor = anchors.map((anchor) => {
    return (
      <li
        key={anchor.id}
        className="text-purple-800 px-[24px] py-[32px] hover:cursor-pointer"
      >
        {isAuthenticated ? (
          <RouterLink to={anchor.destination}>{anchor.text}</RouterLink>
        ) : location.pathname !== "/" ? (
          <HashLink smooth to={`/#${anchor.destination}`}>
            {anchor.text}
          </HashLink>
        ) : (
          <ScrollLink to={anchor.destination}>{anchor.text}</ScrollLink>
        )}
      </li>
    );
  });

  // render navbar
  return (
    <header className="z-20 w-full bg-white h-[88px] shadow-nav flex justify-center">
      <div className="w-[1440px] h-[88px] bg-white px-[160px] flex justify-between items-center">
        <section>
          <RouterLink to={isAuthenticated ? "/match" : "/"}>
            <img
              src={logo}
              alt="Merry Match Logo"
              className="h-[56px] hover:cursor-pointer"
            />
          </RouterLink>
        </section>
        <section className="flex items-center font-nunito font-bold">
          {/* render each list */}
          <ul className="flex">{renderAnchor}</ul>
          {/* if logged in show user noti and profile img, else show login btn*/}
          {isAuthenticated ? (
            <div className="flex justify-between ml-[24px]">
              <div
                className="w-[48px] h-[48px] bg-gray-100 rounded-full flex justify-center items-center relative hover:cursor-pointer"
                onClick={toggleNotificationDropdown}
              >
                <img
                  src={notiIcon}
                  alt="notification"
                  className="w-[24px] h-[24px]"
                />
                <NotificationBadge
                  className="absolute top-[-3px] right-[-3px]"
                  count={notifications.length}
                />
                {notificationDropdown && <Notification />}
              </div>
              <div
                className="ml-[12px] w-[48px] h-[48px] rounded-full bg relative hover:cursor-pointer"
                onClick={toggleUserDropdown}
                style={
                  userData
                    ? {
                        backgroundImage: `url(${userData.image[0].url})`,
                        backgroundSize: "cover",
                      }
                    : {}
                }
              >
                {userDropdown && <UserDropdown />}
              </div>
            </div>
          ) : (
            <RouterLink to="/login">
              <button className="bg-red-500 text-white py-[12px] px-[24px] rounded-[99px] ml-[32px] shadow-login h-[48px]">
                Login
              </button>
            </RouterLink>
          )}
        </section>
      </div>
    </header>
  );
}

export default Navbar;
