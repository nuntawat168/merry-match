import xIcon from "../assets/icon/x.svg";

function Modal({ title, confirmText, btn1, btn2 }) {
    const btnYesStyle = "py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn";
    const btnNoStyle = "py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login";

    return (
        <div className="w-[528px] bg-white font-nunito rounded-2xl shadow-login">
            <section className="flex justify-between items-center border-b-[1px] border-gray-300 h-[56px]">
                <p className="pl-[24px] text-[20px] font-semibold">{title}</p>
                <img src={xIcon} alt="cancel icon" className="w-[20px] mr-[24px]"/>
            </section>
            <section className="h-[144px] pt-[24px] px-[24px]">
                <p className="text-[16px] text-gray-700">{confirmText}</p>
                <div className="pt-[24px]">
                    <button className={`${title === "Resolve Complaint" ? btnNoStyle : btnYesStyle} mr-[16px]`}>{btn1}</button>
                    <button className={title === "Resolve Complaint" ? btnYesStyle : btnNoStyle}>{btn2}</button>
                </div>
            </section>
        </div>
    )
}

export default Modal;