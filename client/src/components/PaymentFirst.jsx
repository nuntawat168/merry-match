import React from "react";
import { UseGlobalContext } from "../contexts/usecontexts";
import { useEffect } from "react";
import box from "../assets/icon/package.svg";

const PaymentFirst = () => {
  const { dataPackage, setDataPackage, fetchData, savePackage } =
    UseGlobalContext();

  return (
    <div>
      <div className="font font-nunito flex w-[1440px]  justify-center space-x-10   mt-16   ">
        {/* first box */}
        <div className="grid items-center p-5   bg-gray-100  h-[244px] rounded-3xl w-[358px] border border-gray-400">
          <div className=" grid grid-rows-2 gap-10 ">
            <div>
              <div className=" flex justify-start  hover:bg-gray-200">
                <img
                  className=" w-6  mr-4 flex justify-start  justify-items-start   text-gray-800 font-bold "
                  src={box}
                  alt="box"
                />
                Merry Membership
              </div>
            </div>
            {/* second paragraph */}
            <div className="grid grid-cols-2 text-gray-700 font-nunito  ">
              <div className="flex">Package</div>
              <div className="flex justify-end">
                Price
                <span className=" flex  justify-items-start">(Monthly)</span>
              </div>
            </div>
          </div>
          <hr className="border border-gray-400  " />
          <div className=" grid grid-cols-2    ">
            <div>{dataPackage[savePackage].package_name}</div>
            <div className="flex justify-end">
              {dataPackage[savePackage].package_price}
            </div>
          </div>
        </div>

        {/* second box */}

        <div className=" w-[548px] h-[554px] rounded-3xl border border-gray-400  ">
          <div className="grid grid-rows-5 ">
            <div className="w-full h-[78px] pr-10 pl-10   flex justify-between  bg-gray-100 rounded-t-3xl border items-center  ">
              {/* first paragraph */}
              <div className="">Credit Card</div>

              <div className="">visa logo</div>
            </div>
            {/* second */}
            <div className="pr-10 pl-10 flex  items-center">Card Number</div>
            <div className="pr-10 pl-10 flex  items-center">3</div>
            <div className="pr-10 pl-10 flex  items-center">4</div>
            <hr />
            <div className="flex justify-between pr-10 pl-10  items-center">
              <div>1</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentFirst;
