import premiumIcon from "../assets/icon/premium.svg";
import profileIcon from "../assets/icon/profile.svg";
import merryListIcon from "../assets/icon/merry light.svg";
import packageIcon from "../assets/icon/package.svg";
import complaintIcon from "../assets/icon/complaint.svg";
import logoutIcon from "../assets/icon/logout.svg";


function UserDropdown() {
    const lists = [
        {icon: profileIcon, alt: "profile icon", title: "Profile" },
        {icon: merryListIcon, alt: "merry list icon", title: "Merry list" },
        {icon: packageIcon, alt: "package icon", title: "Merry Membership" },
        {icon: complaintIcon, alt: "complaint icon", title: "Compliant" },
        {icon: logoutIcon, alt: "log out icon", title: "Log out"}
    ]

    const renderedLists = lists.map((list, index) => {
        
        return (
            <div key={index} className={`flex py-[8px] mr-4 items-center ${list.title === "Log out" ? "mt-2 border-t-[1px] border-gray-300" : "" }`}>
                <img src={list.icon} alt={list.alt} className="w-[16px] h-[16px] mr-[12px]"/>
                <p>{list.title}</p>
            </div>
        )
    })

    return (
        <section className="z-20 w-[198px] h-[258px] bg-white rounded-2xl absolute top-[70px] flex flex-col justify-center items-center font-nunito text-[14px] font-light text-gray-700">
            <div className="flex w-[179px] h-[41px] py-[10px] px-[24px] bg-linear rounded-[99px]">
                <img src={premiumIcon} alt="premium icon" className="w-[16px] h-[16px] mr-[6px]"/>
                <p className="text-white">More limit Merry!</p>
            </div>
            <div className="mt-[10px]">
                {renderedLists}
            </div> 
            <div>
                <img src={premiumIcon} alt="premium icon" className="w-[16px] h-[16px] mr-[6px]"/>
                <p className="text-white">More limit Merry!</p>
            </div>         
        </section>
    )
}

export default UserDropdown;