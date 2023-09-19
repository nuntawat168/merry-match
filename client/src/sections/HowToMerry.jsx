import smartFace from "../assets/icon/smartFace.png";
import starStruck from "../assets/icon/starStruck.png";
import partyingFace from "../assets/icon/partyingFace.png";
import blowingAKiss from "../assets/icon/blowingAKiss.png";

function HowToMerry () {
    const cards = [
        {id: 1, img: smartFace, alt: "smart face emoji", title: "Upload your cool picture", content: "Lorem ipsum is a placeholder text",},
        {id: 2, img: starStruck, alt: "star struck emoji", title: "Explore and find the one you like", content: "Lorem ipsum is a placeholder text",},
        {id: 3, img: partyingFace, alt: "partying face emoji", title: "Click ‘Merry’ for get to know!", content: "Lorem ipsum is a placeholder text",},
        {id: 4, img: blowingAKiss, alt: "blowing a kiss emoji", title: "Start chating and relationship ", content: "Lorem ipsum is a placeholder text",},
    ]

    const renderedCards = cards.map((card) => {
        return (
            <div key={card.id} className="flex flex-col items-center w-[262px] h-[348px] bg-purple-900 p-[32px] rounded-4xl text-center">
                <div className="bg-purple-800 w-[120px] h-[120px] p-[35px] rounded-[99px] mb-[40px]">
                    <img src={card.img} alt={card.alt}/>
                </div>
                <h2 className="text-white text-[24px] font-bold">{card.title}</h2>
                <p className="text-gray-500">{card.content}</p>
            </div>
        )
    })

    return (
        <section className="w-full bg flex justify-center">
            <main id="howToMerry" name="howToMerry" className="w-[1440px] flex justify-center pt-[80px] pb-[88px] bg">
                <div className="flex flex-col w-[1120px] font-nunito items-center"> 
                    <h1 className="text-purple-300 text-[46px] font-extrabold mb-[40px]">How to Merry</h1>
                    <section className="grid grid-cols-4 gap-[24px] text-[16px]">
                        {renderedCards}
                    </section>
                </div>
            </main>
        </section>
        
    )
}

export default HowToMerry;