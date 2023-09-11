import logo from "../assets/icon/logo.svg";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import notiIcon from "../assets/icon/noti.svg";
import UserDropdown from "./UserDropdown";
import Notification from "./Notification";

function Navbar() {
    // แก้ เอา hard code ออก ดึงสถานะจริงมาเช็ค
    const [loggedIn, setLoggedIn] = useState(true);
    const [subscribed, setSubscribed] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);

    const toggleUserDropdown = () => {
        setNotificationDropdown(false)
        setUserDropdown(!userDropdown);
    }
    
    const toggleNotificationDropdown = () => {
        setUserDropdown(false)
        setNotificationDropdown(!notificationDropdown);
    }

    // create a rendering condition for each list
    const anchors = [
        { id: 1, destination: loggedIn? "/match" : "whyMerryMatch", text: loggedIn ? "Start Matching!" : "Why Merry Match?" },
        { id: 2, destination: loggedIn ? (subscribed ? "/merry-list" : "/packages") : "howToMerry", text: loggedIn ? "Merry Membership" : "How to Merry" },
    ];

    // render each list
    const renderAnchor = anchors.map((anchor) => {
        return (
            <li key={anchor.id} className="text-purple-800 px-[24px] py-[32px] hover:cursor-pointer">
                { loggedIn ? (
                    <RouterLink to={anchor.destination}>{anchor.text}</RouterLink>
                ) : (
                    <ScrollLink to={anchor.destination}>{anchor.text}</ScrollLink>
                )}
            </li>          
        )
    }) 

    // render navbar
    return (
        <header className="w-full bg-white h-[88px] shadow-nav flex justify-center">
            <div className="w-[1440px] h-[88px] bg-white px-[160px] flex justify-between items-center">
                <section>
                    <img src={logo} alt="Merry Match Logo" className="h-[56px]"/>
                </section>
                <section className="flex items-center font-nunito font-bold">
                    {/* render each list */}
                    <ul className="flex">{renderAnchor}</ul>
                    {/* if logged in show user noti and profile img, else show login btn*/}
                    { loggedIn ? (
                        <div className="flex justify-between ml-[24px]">
                            <div 
                                className="w-[48px] h-[48px] bg-gray-100 rounded-full flex justify-center items-center relative"
                                onClick={toggleNotificationDropdown}
                            >
                                <img src={notiIcon} alt="notification" className="w-[24px] h-[24px]"/>
                                {notificationDropdown && <Notification />}
                            </div>
                            <div 
                                className="ml-[12px] w-[48px] h-[48px] rounded-full bg relative"
                                onClick={toggleUserDropdown}
                            > 
                                {userDropdown && <UserDropdown />}
                            </div>
                        </div>
                    ) : (
                    <RouterLink to="/login">
                        <button className="bg-red-500 text-white py-[12px] px-[24px] rounded-[99px] ml-[32px] shadow-login h-[48px]">Login</button>
                    </RouterLink>
                    )}
                </section>
            </div>
        </header>  
    )
}

export default Navbar;