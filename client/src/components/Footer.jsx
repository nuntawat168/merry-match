import logo from "../assets/icon/logo.svg";
import fbLogo from "../assets/icon/fb.svg";
import igLogo from "../assets/icon/ig.svg";
import twLogo from "../assets/icon/tw.svg";

function Footer() {
    const links = [
        {id: 1, img: fbLogo, alt: "Fackbook", link: "https://www.google.com/"},
        {id: 2, img: igLogo, alt: "Instagram", link: "https://www.google.com/"},
        {id: 3, img: twLogo, alt: "Twitter", link: "https://www.google.com/"},
    ]

    const renderedLinks = links.map((item) => {
        return (
            <a key={item.id} href={item.link}>
                <img src={item.img} alt={item.alt} className={item.id === 2? "ml-[16px] mr-[16px]": ""}/>
            </a>)
    })

    return (
        <footer className="w-full flex justify-center bg-gray-100">
            <main className="w-[1440px] h-[371px] font-nunito py-[48px] px-[160px] bg-gray-100">
                <div className="flex flex-col justify-between h-[275px] text-center">
                    <section className="flex flex-col justify-center">
                        <img src={logo} alt="Merry Match Logo" className="h-[80px]"/>
                        <p className="text-[20px] text-gray-700 font-semibold">New generation of online dating website for everyone</p>
                    </section>
                    <section className="border-solid border-t-[1px] border-gray-300">
                        <p className="text-[14px] text-gray-600 py-[24px]">copyright ©2022 merrymatch.com  All rights reserved</p>
                        <div className="flex justify-center">{renderedLinks}</div>
                    </section>
                </div>
            </main>
        </footer>
    )
}

export default Footer;