import heroImg1 from "../assets/image/heroImg1.png";
import heroImg2 from "../assets/image/heroImg2.png";
import littleWhiteHeart from "../assets/image/littleWhiteHeart.svg";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="w-full bg flex justify-center">
            <main className="bg w-[1440px] flex justify-center relative font-nunito">            
                <div className="z-2 w-[1381px] h-[489px] absolute top-[72px] left-0 bg-no-repeat bg-hero"></div>
                <img src={heroImg1} alt="photo1" className="absolute right-[203px] bottom-[402px]"/>
                <p className="text-white text-[12px] bg-red-700 w-[148px] h-[41px] rounded-tl-full rounded-tr-full rounded-br-full flex justify-center items-center absolute right-[160px] bottom-[463px]">
                    Hi! Nice to meet you
                </p>            

                <div className="z-10 text-white font-semibold w-[358px] h-[360px] mt-[175px] mb-[223px] flex flex-col items-center text-center">
                    <h1 className="text-[60px] font-extrabold pb-[24px]">Make the first ‘Merry’</h1>
                    <p className="text-[20px]">If you feel lonely, let’s start meeting new people in your area!</p>
                    <p className="text-[20px]">Dont’t forget to get Merry with us</p>
                    <button 
                        className="text-[16px] py-[12px] px-[24px] bg-red-500 rounded-[99px] mt-[60px]"
                        onClick={() => navigate("/login")}
                    >
                        Start matching!
                    </button>
                </div>

                <img src={heroImg2} alt="photo2" className="absolute left-[203px] top-[258px]"/>
                <img src={littleWhiteHeart} alt="little white heart" className="absolute top-[344px] left-[169px] z-10"/>
                <p className="text-white text-[12px] bg-red-700 w-[153px] h-[41px] rounded-tl-full rounded-tr-full rounded-bl-full absolute top-[336px] left-[160px] flex justify-center items-center">Nice to meet you too!</p>            
            </main>
        </section>
    )
}

export default Hero;