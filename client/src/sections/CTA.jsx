function CTA() {
    return (
        <section className="w-full bg pt-[80px] pb-[121px] px-[160px]">
            <main className="w-[1120px] h-[369px] rounded-[32px] flex flex-col justify-center items-center font-nunito relative bg-linear" >
                <div
                    className="z-0 w-[1120px] h-[369px] absolute top-10 left-0 bg-no-repeat bg-cta">
                </div>
                <p className="text-[46px] font-bold text-white px-[266px]">Let’s start finding</p>
                <p className="text-[46px] font-bold text-white mb-[40px]">and matching someone new</p>
                <button className="z-10 py-[12px] px-[24px] bg-red-100 rounded-[99px] text-red-600 font-bold text-[16px]">Start Matching!</button>
            </main>
        </section>
    )
}

export default CTA;