import React, { useState } from "react";
import { UseGlobalContext } from "../contexts/usecontexts";
import { useEffect } from "react";
import box from "../assets/icon/package.svg";
import visa from "../assets/icon/visa.svg";
import mastercard from "../assets/icon/MasterCard.svg";

const PaymentFirst = () => {
  const {
    dataPackage,
    setDataPackage,
    fetchData,
    savePackage,
    numberCard,
    setNumberCard,
    nameCard,
    setNameCard,
    dateExp,
    setDateExp,
    cvc,
    setCvc,
  } = UseGlobalContext();

  const [errorCase, setErrorCase] = useState(false);

  const [errorNumberCard, setErrorNumberCard] = useState(false);
  const [errorNameCard, setErrorNameCard] = useState(false);
  const [errorDateExp, setErrorDateExp] = useState(false);
  const [errorCvc, setErrorCvc] = useState(false);
  const handleValidate = () => {
    if (!numberCard) {
      setErrorNumberCard(true);
      setErrorCase(true);
    }
    if (!nameCard) {
      setErrorNameCard(true);
      setErrorCase(true);
    }
    if (!dateExp) {
      setErrorDateExp(true);
      setErrorCase(true);
    }
    if (!cvc) {
      setErrorCvc(true);
      setErrorCase(true);
    }
    if (!errorCase) {
      console.log("OK");
    }
  };

  return (
    <div>
      <div className="font font-nunito flex w-[1440px]  justify-center space-x-10 ml-10   mt-16   ">
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
          <div className=" grid grid-cols-2 font-bold    ">
            <div>{dataPackage[savePackage].package_name}</div>
            <div className="flex justify-end ">
              THB {dataPackage[savePackage].package_price}.00
            </div>
          </div>
        </div>

        {/* second box */}

        <div className=" w-[548px] h-[554px] rounded-3xl border border-gray-400  ">
          <div className="grid grid-rows-4 ">
            <div className="w-full h-[78px] pr-10 pl-10   flex justify-between  bg-gray-100 rounded-t-3xl  items-center  ">
              {/* first paragraph */}
              <div className="">Credit Card</div>

              <div className="grid grid-cols-2  ">
                <div>
                  <img src={visa} className="w-[40px] h-[28px]" />
                </div>
                <div>
                  <img src={mastercard} className="" />
                </div>
              </div>
            </div>
            {/* second */}

            <div className="pr-10 pl-10 pt-4 pb-4 grid justify-items-start  ">
              <div>
                <label htmlFor="cardNumber">
                  Card Number<span className="ml-2 text-red-500">*</span>
                </label>
                {errorNumberCard && (
                  <span className="ml-2 text-red-500 ">
                    Card Number is required
                  </span>
                )}
              </div>
              <input
                className={`border rounded-lg h-[48px] w-[460px] pl-2 ${
                  errorNumberCard ? "border-red-500" : "border-gray-400"
                } `}
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Number Of Card"
                maxLength={19}
                value={numberCard
                  .replace(/[^0-9]/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim()}
                onChange={(e) => {
                  setNumberCard(e.target.value);
                  setErrorNumberCard(false);
                }}
              />
            </div>
            <div className="pr-10 pl-10 pt-4  grid justify-items-start">
              <div className="flex">
                <label className="grid grid-cols-[90%10%] " htmlFor="cardOwner">
                  Card Owner
                  <span className="w-[2px] flex ml-2 text-red-500">*</span>
                </label>
                {errorNameCard && (
                  <span className="ml-4 text-red-500 ">is required</span>
                )}
              </div>
              <input
                className={`border  rounded-lg h-[48px] w-[460px] pl-2 ${
                  errorNameCard ? "border-red-500" : "border-gray-400"
                } `}
                type="text"
                id="cardOwner"
                name="cardOwner"
                placeholder="Holder of card"
                value={nameCard.replace(/[^A-Za-z ]/g, "").toUpperCase()}
                onChange={(e) => {
                  setNameCard(e.target.value);
                  setErrorNameCard(false);
                }}
              />
            </div>
            <div className="pr-10 pl-10 flex pb-6 pt-4  items-center grid-cols-2 justify-between">
              <div className="grid justify-items-start ">
                <div className="flex justify-between">
                  <label htmlFor="expiryDate">
                    Expiry Date<span className="ml-2 text-red-500">*</span>
                  </label>{" "}
                  {errorDateExp && (
                    <span className="ml-2 text-red-500 ">is required</span>
                  )}
                </div>
                <input
                  className={` w-[215px] h-[48px] border rounded-md  pl-2 ${
                    errorDateExp ? "border-red-500" : "border-gray-400"
                  }`}
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={dateExp
                    .replace(/[^0-9]/g, "")
                    .replace(/(\d{2})(\d{2})/, "$1/$2")}
                  maxLength={5}
                  onChange={(e) => {
                    setDateExp(e.target.value);
                    setErrorDateExp(false);
                  }}
                />
              </div>
              <div className="grid justify-items-start mr-1.5">
                <div>
                  <label htmlFor="cvc">
                    CVC/CVV<span className="ml-2 text-red-500">*</span>
                  </label>
                  {errorCvc && (
                    <span className="ml-2 text-red-500 ">is required</span>
                  )}
                </div>
                <input
                  className={`w-[215px] h-[48px] border rounded-md  pl-2 ${
                    errorCvc ? "border-red-500" : "border-gray-400"
                  }`}
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="x x x"
                  maxLength={3}
                  value={cvc
                    .replace(/[^0-9]/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()}
                  onChange={(e) => {
                    setCvc(e.target.value);
                    setErrorCvc(false);
                  }}
                />
              </div>
            </div>

            <hr />
            <div className="flex justify-between pr-10 pl-10   items-center">
              <button className="flex mt-6 font-nunito text-[16px] font-bold text-red-500 hover:text-red-800 relative duration-1000 after:content-[''] after:bg-red-300 after:h-[3px] after:w-[0%] after:absolute after:-bottom-[2px] after:rounded-xl after:duration-1000 hover:after:w-[100%] ">
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleValidate();
                }}
                className="font-nunito text-[16px] mt-6 font-bold border bg-red-500 text-white w-[177px] h-[48px] items-center rounded-3xl flex justify-center duration-500 hover:bg-red-100 hover:text-red-300 "
              >
                Payment Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentFirst;
