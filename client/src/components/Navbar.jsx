import logo from "../assets/icon/logo.svg";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import notiIcon from "../assets/icon/noti.svg";

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);

    
    // ตรง start matching กับ merry membership ยังไม่ได้แก้ตัว destination ว่าจะกดแล้วไปไหน
    const anchors = [
        { id: 1, destination: "whyMerryMatch", text: loggedIn ? "Start Matching!" : "Why Merry Match?" },
        { id: 2, destination: "howToMerry", text: loggedIn ? "Merry Membership" : "How to Merry" },
    ];


    const renderAnchor = anchors.map((anchor) => {
        return (
            <li key={anchor.id} className="text-purple-800 px-[24px] py-[32px] hover:cursor-pointer">
                <ScrollLink to={anchor.destination} smooth={true} duration={500}>{anchor.text}</ScrollLink>
            </li>          
        )
    }) 

    return (
        <header className="w-full bg-white h-[88px] shadow-nav flex justify-center">
            <div className="w-[1440px] h-[88px] bg-white px-[160px] flex justify-between items-center">
                <section>
                    <img src={logo} alt="Merry Match Logo" className="h-[56px]"/>
                </section>
                <section className="flex items-center font-nunito font-bold">
                    <ul className="flex">{renderAnchor}</ul>
                    { loggedIn ?
                    (<div className="flex justify-between ml-[24px]">
                        <div className="w-[48px] h-[48px] bg-gray-100 rounded-full flex justify-center items-center">
                            <img src={notiIcon} alt="notification" className="w-[24px] h-[24px]"/>
                        </div>
                        <div className="ml-[12px] w-[48px] h-[48px] rounded-full bg"></div>
                    </div>) :
                    (<RouterLink to="/auth/login">
                        <button className="bg-red-500 text-white py-[12px] px-[24px] rounded-[99px] ml-[32px] shadow-login h-[48px]">Login</button>
                    </RouterLink>) }
                </section>
            </div>
        </header>  
    )
}

export default Navbar;