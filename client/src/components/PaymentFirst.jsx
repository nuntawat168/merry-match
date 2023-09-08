import React from "react";

const PaymentFirst = () => {
  return (
    <div>
      <div className="font font-nunito flex w-[1440px] justify-evenly  mt-16  gap-10 ">
        {/* first box */}
        <div className="grid grid-rows-2 p-5  bg-gray-100  h-[244px] rounded-3xl w-[358px] border border-gray-400">
          <div>1</div>
          <div>2</div>
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
