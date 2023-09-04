import whyMerryMatchImg from "../assets/image/whyMerryMatch.svg";

function WhyMerrryMatch() {
    return (
        <main name="whyMerryMatch" className="w-full bg pt-[105px] pb-[80px] px-[160px] grid grid-cols-2 gap-[25px]">
            <section className="font-nunito text-gray-100 text-[16px] text-start pr-[25px]">
                <h1 className="text-purple-300 text-[46px] font-extrabold mb-[40px]">Why Merry Match?</h1>
                <h2 className="text-white font-medium text-[20px]">Merry Match is a new generation of online dating website for everyone</h2>
                <p className="py-[20px] font-thin">Whether you’re committed to dating, meeting new people, expanding your social network, meeting locals while traveling, or even just making a small chat with strangers.</p>
                <p className="font-thin">This site allows you to make your own dating profile, discover new people, save favorite profiles, and let them know that you’re interested</p>
            </section>
            <section>
                <img src={whyMerryMatchImg} alt="fast-secure-easy"/>
            </section>            
        </main>
    )
}

export default WhyMerrryMatch;