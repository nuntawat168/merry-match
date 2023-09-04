import logo from "../assets/icon/logo.svg";
import { Link } from "react-scroll";

function Navbar() {
    const anchors = [
        {id: 1, destination: "whyMerryMatch", text: "Why Merry Match?", },
        {id: 2, destination: "howToMerry", text: "How to Merry", },
    ];

    const renderAnchor = anchors.map((anchor) => {
        return (
            <li key={anchor.id} className="text-purple-800 px-[24px] py-[32px] hover:cursor-pointer">
                <Link to={anchor.destination} smooth={true} duration={500}>{anchor.text}</Link>
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
                    <button className="bg-red-500 text-white py-[12px] px-[24px] rounded-[99px] ml-[32px] shadow-login h-[48px]">Login</button>
                </section>
            </div>
        </header>  
    )
}

export default Navbar;