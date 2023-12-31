import { useNavigate } from "react-router-dom";

function CTA() {
    const navigate = useNavigate();

    return (
        <section className="w-full bg flex justify-center">
            <div className="w-[1440px] bg pt-[80px] pb-[121px] flex justify-center">
                <main className="w-[1120px] h-[369px] rounded-[32px] flex flex-col justify-center items-center font-nunito relative bg-linear" >
                    <div
                        className="z-0 w-[1120px] h-[369px] absolute top-10 left-0 bg-no-repeat bg-cta">
                    </div>
                    <p className="text-[46px] font-bold text-white px-[266px]">Let’s start finding</p>
                    <p className="text-[46px] font-bold text-white mb-[40px]">and matching someone new</p>
                    <button 
                        className="z-10 py-[12px] px-[24px] bg-red-100 rounded-[99px] text-red-600 font-bold text-[16px]"
                        onClick={() => navigate("/login")} 
                    >
                        Start Matching!
                    </button>
                </main>
            </div>
        </section>
    )
}

export default CTA;