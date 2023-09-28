import React from "react";

const success = () => {
  return (
    <div className=" font-nunito">
      <div className="grid grid-cols-[50%_50%] mt-28 ml-40">
        <div className="grid grid-rows-[20%_3%_10%_10%_57%] gap-y-5">
          <div className="mt-10 w-[64px] h-[64px] rounded-full border border-red-300">
            1
          </div>
          <div className="mt-10 h-[21px] font-extrabold text-beige-700 text-[14px]">
            PAYMENT SUCCESS
          </div>
          <div className="font-nunito font-extrabold mt-6 text-[46px] text-purple-500">
            Welcome Merry Membership!
          </div>
          <div className="font-nunito font-extrabold mt-6 text-[46px] text-purple-500">
            Thank you for joining us
          </div>
          {/* button */}
          <div className="flex justify-start mt-20 gap-10">
            <button className="flex items-center justify-center rounded-3xl border bg-red-100 w-[150px] h-[48px] text-[16px] font-extrabold text-red-600 relative duration-1000 after:content-[''] after:bg-red-300 after:h-[3px] after:w-[0%] after:absolute after:bottom-[10px] after:rounded-xl after:duration-500 hover:scale-110   hover:after:w-[70%] ">
              Back to home
            </button>
            <button className="flex items-center justify-center w-[190px] h-[48px] border bg-red-500 rounded-3xl text-white relative duration-1000 after:content-[''] after:bg-red-300 after:h-[3px] after:w-[0%] after:absolute after:bottom-[10px] after:rounded-xl after:duration-500 hover:scale-110   hover:after:w-[70%]">
              Check Membership
            </button>
          </div>
        </div>
        <div className="text-white w-[357px] h-[454px] border rounded-3xl bg-linear ml-28  border-gray-200 grid grid-rows-[25%_20%_20%_10%_1%_24%]">
          <div className="ml-10 mt-10 w-[60px] h-[60px] border rounded-2xl border-gray-100">
            1
          </div>
          <div className="ml-10  text-[32px]">
            Premium
            <div className="text-[20px]">
              THB 149.00<span className="text-[16px]">/Month</span>
            </div>
          </div>
          <div className="ml-10 ">‘Merry’ more than a daily limited</div>
          <div className="ml-10 -mt-14 ">Up to 50 Merry per day</div>
          <hr className=" border-gray-300 ml-10 mr-10 -mt-10 " />
          <div className="ml-10 mt-10 grid-cols-2">
            <div className="flex justify-between -mt-10 ">
              <div className="flex  ">Start Membership</div>
              <div className="flex mr-10 ">01/04/2022</div>
            </div>
            <div className="flex justify-between mt-2  ">
              <div className="flex">Next billing</div>
              <div className="flex mr-10">01/05/2022</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default success;
