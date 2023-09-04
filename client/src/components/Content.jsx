import React from "react";
import loveicon from "../assets/icon/basic.svg";
import platinumicon from "../assets/icon/platinum.svg";
import premiumicon from "../assets/icon/premium.svg";
import correcticon from "../assets/icon/success.svg";
import { useState } from "react";

const Content = () => {
  return (
    <div className=" w-full font-nunito">
      <div className="flex flex-start text-[14px] text-beige-700 font-semibold  ">
        MERRY MEMBERSHIP
      </div>
      <div className="grid grid-rows-2 text-start text-[46px] text-purple-500 font-bold">
        <div>Be part of Merry Membership</div>
        <div>to make more Merry!</div>
      </div>

      <div className="grid grid-cols-3 mt-14 ">
        {/* box1 */}
        <div className="w-[357px] h-[438px] grid grid-row-4 text-start border border-gray-400  rounded-3xl  shadow-xl   ">
          <div className="w-[60px] h-[60px] ml-12 mt-12   bg-gray100 border-gray-100 flex justify-center items-center border rounded-xl ">
            <img
              className=" w-[36px] h-[36px]"
              src={loveicon}
              alt="Love Icon"
            />
          </div>

          <div className="font-nunito ml-12">
            <div className="text-[32px] font-bold text-purple-800">Basic</div>
            <span className="text-[20px] font-semibold text-gray-900">
              THB 59.00{" "}
            </span>
            <span className="text-gray-600 font-semibold text-[16px]">
              /Month
            </span>
          </div>
          <div className="w-[277px] h-[100px] ml-12 gap-12  ">
            <div className="flex gap-2 ">
              <img
                className="w-[24px] h-[24px]"
                src={correcticon}
                alt="Corrct Icon"
              />
              <span className="text-[16px]  font-bold text-gray-800">
                'Merry' more than a daily limited
              </span>
            </div>
            <div className="flex gap-2 mt-3 ">
              <img
                className="w-[24px] h-[24px] "
                src={correcticon}
                alt="Corrct Icon"
              />
              <span className="text-[16px] font-bold text-gray-800">
                Up to 25 Merry per day
              </span>
            </div>
            <hr className="mt-10 ml-2 mr-6 border border-gray-300" />
          </div>

          <div className="flex justify-center ">
            <button class="w-[277px] h-[48px] border font-bold  border-red-100 rounded-full p-2 font-nunito text-[16px]  bg-red-100 text-red-600 shadow-red-100 shadow-sm-sm-sm-sm hover:text-red-100 hover:bg-red-400 duration-1000    ">
              Choose Package
            </button>
          </div>
        </div>
        {/* box2 */}
        <div className="w-[357px] h-[438px] grid grid-row-4 text-start border border-gray-400  rounded-3xl  shadow-xl   ">
          <div className="w-[60px] h-[60px] ml-12 mt-12   bg-gray-100 border-gray-100 flex justify-center items-center border rounded-xl ">
            <img
              className=" w-[36px] h-[36px] "
              src={platinumicon}
              alt="platinum Icon"
            />
          </div>

          <div className="font-nunito ml-12">
            <div className="text-[32px] font-bold text-purple-800">
              Platinum
            </div>
            <span className="text-[20px] font-semibold text-gray-900">
              THB 99.00{" "}
            </span>
            <span className="text-gray-600 font-semibold text-[16px]">
              /Month
            </span>
          </div>
          <div className="w-[277px] h-[100px] ml-12 gap-12  ">
            <div className="flex gap-2 ">
              <img
                className="w-[24px] h-[24px]"
                src={correcticon}
                alt="Corrct Icon"
              />
              <span className="text-[16px]  font-bold text-gray-800">
                'Merry' more than a daily limited
              </span>
            </div>
            <div className="flex gap-2 mt-3 ">
              <img
                className="w-[24px] h-[24px]"
                src={correcticon}
                alt="Corrct Icon"
              />
              <span className="text-[16px] font-bold text-gray-800">
                Up to 45 Merry per day
              </span>
            </div>
            <hr className="mt-10 ml-2 mr-6 border border-gray-300" />
          </div>

          <div className="flex justify-center ">
            <button class="w-[277px] h-[48px] border font-bold  border-red-100 rounded-full p-2 font-nunito text-[16px]  bg-red-100 text-red-600 shadow-red-100 shadow-sm-sm-sm-sm hover:text-red-100 hover:bg-red-400 duration-1000    ">
              Choose Package
            </button>
          </div>
        </div>

        {/* box3 */}
        <div className="w-[357px] h-[438cdpx] grid grid-row-4 text-start border border-gray-400  rounded-3xl  shadow-xl   ">
          <div className="w-[60px] h-[60px] ml-12 mt-12   bg-gray-100 border-gray-100 flex justify-center items-center border rounded-xl ">
            <img
              className=" w-[36px] h-[36px] "
              src={premiumicon}
              alt="Premiun Icon"
            />
          </div>

          <div className="font-nunito ml-12">
            <div className="text-[32px] font-bold text-purple-800  ">
              Premium
            </div>
            <span className="text-[20px] font-semibold text-gray-900">
              THB 149.00{" "}
            </span>
            <span className="text-gray-600 font-semibold text-[16px]">
              /Month
            </span>
          </div>
          <div className="w-[277px] h-[100px] ml-12 gap-12  ">
            <div className="flex gap-2 ">
              <img
                className="w-[24px] h-[24px]"
                src={correcticon}
                alt="Corrct Icon"
              />
              <span className="text-[16px]  font-bold text-gray-800">
                'Merry' more than a daily limited
              </span>
            </div>
            <div className="flex gap-2 mt-3 ">
              <img
                className="w-[24px] h-[24px]"
                src={correcticon}
                alt="Corrct Icon"
              />
              <span className="text-[16px] font-bold text-gray-800">
                Up to 70 Merry per day
              </span>
            </div>
            <hr className="mt-10 ml-2 mr-6 border border-gray-300" />
          </div>

          <div className="flex justify-center ">
            <button class="w-[277px] h-[48px] border font-bold  border-red-100 rounded-full p-2 font-nunito text-[16px]  bg-red-100 text-red-600 shadow-red-100 shadow-sm-sm-sm-sm hover:text-red-100 hover:bg-red-400 duration-1000    ">
              Choose Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
