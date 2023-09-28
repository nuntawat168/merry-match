const UserCheckPayment = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] flex justify-center ml-24">
        <div className="w-[1119px] font-nunito">
          <div className="flex flex-start text-[14px] text-beige-700 font-semibold mt-20">
            MERRY MEMBERSHIP
          </div>
          <div className="grid grid-rows-2 text-start text-[46px] text-purple-500 font-bold">
            <div>Manage your membership</div>
            <div>and payment method</div>
            {/* para 1 */}
            <div className="mt-10">
              <div className="text-[24px] font-nunito font-bold ">
                Merry Membership Package
              </div>
              <div className="grid grid-cols-[10%_30%_30%_30%] mt-3 h-[222px]  w-[930px] border rounded-3xl bg-linear">
                <div className="ml-[36px] h-[78px] mt-[36px]  w-[78px] border border-gray-100 rounded-3xl ">
                  1
                </div>
                <div className="grid grid-rows-[30%_70%]">
                  <div className="ml-10 w-[225px] h-[40px] mt-10  text-[32px] flex items-center font-nunito font-bold text-white ">
                    Premium
                  </div>
                  <div className="ml-10 mt-8   text-[20px] text-purple-200">
                    THB 149.00<span>/Month</span>
                  </div>
                </div>
                <div className="grid grid-rows-[30%_70%]  text-[16px] text-white font-thin">
                  <div className="flex items-center mt-16">
                    ‘Merry’ more than a daily limited{" "}
                  </div>
                  <div className="flex mt-8 ">Up to 50 Merry per day</div>
                </div>
                <div className="font-bold flex justify-center align-middle items-center font-nunito ml-40 w-[80px] h-[32px] border rounded-3xl bg-beige-200 text-[16px] text-beige-600 mt-8 ">
                  Active
                </div>
                <hr className="ml-8 w-[866px]  border-purple-300" />{" "}
                <div className=" flex w-[800px]  justify-end  text-white text-[16px]">
                  <button className=" font-semibold">Cancel Package</button>
                </div>
              </div>
            </div>
            {/* para2 */}
            <div className="mt-20">
              <div className="text-[24px] font-nunito font-bold ">
                Payment Method
              </div>
              <div className="grid grid-cols-[10%_30%_30%_30%] mt-3 h-[222px]  w-[930px] border rounded-3xl ">
                <div className="ml-[16px] h-[78px] mt-[16px]  w-[78px] border border-gray-100 rounded-3xl ">
                  1
                </div>
                <div className="grid grid-rows-[30%_70%]">
                  <div className="ml-5 w-[225px] h-[40px] mt-5  text-[24px] flex items-center font-nunito font-bold  text-purple-600 ">
                    Visa ending *9899
                  </div>
                  <div className="ml-5 mt-4   text-[16px] text-gray-700">
                    THB 149.00<span>/Month</span>
                  </div>
                </div>
                <div className="grid grid-rows-[30%_70%]  text-[16px] text-white font-thin">
                  <div className="flex items-center mt-10">
                    ‘Merry’ more than a daily limited{" "}
                  </div>
                  <div className="flex mt-3 ">Up to 50 Merry per day</div>
                </div>
                <div className="font-bold flex justify-center align-middle items-center font-nunito ml-44 w-[80px] h-[32px]   text-[16px] "></div>
                <hr className="ml-8 w-[866px]  border-gray-300" />{" "}
                <div className=" flex w-[800px]  justify-end  text-white text-[16px]">
                  <button className="text-red-500 font-bold">
                    Edit Payment Method
                  </button>
                </div>
              </div>
            </div>
            {/* para 3 */}
            <div className="mt-20">
              <div className="text-[24px] font-nunito font-bold ">
                Billing History
              </div>
              <div className="grid grid-rows-[10%_5%_85%] w-[930px] h-[1000px] border rounded-3xl border-gray-400 mb-28">
                <div className="ml-10 mt-14 text-[20px] text-gray-700">
                  Next billing : 01/09/2022{" "}
                </div>
                <hr className="mr-10 ml-10" />
                <div>
                  <div className="grid grid-cols-2 mr-10 ml-10  ">
                    <div className="flex text-[16px]">01/08/2022</div>
                    <div className="flex justify-end text-[16px]">
                      THB 149.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCheckPayment;
