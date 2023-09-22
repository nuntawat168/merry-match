import React, { useEffect, useState } from "react";
import loveicon from "../assets/icon/basic.svg";
import platinumicon from "../assets/icon/platinum.svg";
import premiumicon from "../assets/icon/premium.svg";
import correcticon from "../assets/icon/success.svg";
import axios from "axios";
import { UseGlobalContext } from "../contexts/usecontexts";
import hearticon from "../assets/icon/merry red.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../assets/variants";

const Content = () => {
  const {
    dataPackage,
    setDataPackage,
    fetchData,
    savePackage,
    setSavePackage,
  } = UseGlobalContext();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const displayNextBox = () => {
    if (currentIndex < 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      displayNextBox();
    }, 600);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] flex justify-center">
        <div className="w-[1119px] font-nunito">
          <div className="flex flex-start text-[14px] text-beige-700 font-semibold mt-20">
            MERRY MEMBERSHIP
          </div>
          <div className="grid grid-rows-2 text-start text-[46px] text-purple-500 font-bold">
            <div>Be part of Merry Membership</div>
            <div>to make more Merry!</div>
          </div>

          <div className="grid grid-cols-3 mt-14 mb-14 ">
            {dataPackage.map((e, index) => {
              if (index < 3) {
                return (
                  <motion.div
                    key={e.package_id}
                    variants={fadeIn("down")}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                    className={`w-[357px] h-[438px] grid grid-row-4 text-start border group-hover:scale-125 border-gray-400 
                    rounded-3xl shadow-xl hover:border hover:bg-red-400/5 hover:border-purple-500 duration-500 mt-10 hover:shadow-userDropdown
                    ${index < currentIndex ? "" : "hidden"}`}
                  >
                    <div className="w-[60px] h-[60px] ml-12 mt-12 bg-gray100 border-gray-100 flex justify-center items-center border rounded-xl">
                      <img
                        className="w-[36px] h-[36px]"
                        src={e.package_icon}
                        alt="Love Icon"
                      />
                    </div>

                    <div className="font-nunito ml-12">
                      <div className="text-[32px] font-bold text-purple-800">
                        {e.package_name}
                      </div>
                      <span className="text-[20px] font-semibold text-gray-900">
                        {e.package_price}
                      </span>
                      <span className="text-gray-600 font-semibold text-[16px]">
                        /Month
                      </span>
                    </div>
                    <div className="w-[277px] h-[100px] ml-12 gap-12">
                      <div className="flex gap-2">
                        <img
                          className="w-[24px] h-[24px]"
                          src={correcticon}
                          alt="Correct Icon"
                        />
                        <span className="text-[16px] font-bold text-gray-800">
                          'Merry' more than a daily limit
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <img
                          className="w-[24px] h-[24px]"
                          src={correcticon}
                          alt="Correct Icon"
                        />
                        <span className="text-[16px] font-bold text-gray-800">
                          Up to {e.package_limit} Merry per day
                        </span>
                      </div>
                      <hr className="mt-10  ml-1 mr-6 border border-gray-300" />
                    </div>

                    <div className="flex justify-center">
                      <button
                        className="group relative flex justify-center pt-3 overflow-hidden transition duration-600  ease-out  w-[277px] h-[48px] border font-bold border-red-100 rounded-full p-2 font-nunito text-[16px] active:bg-red-300   bg-red-100 text-red-600 hover:shadow-purple-200 shadow-red-100  hover:text-white hover:bg-red-200  focus:ring focus:ring-red-300 focus:duration-600"
                        onClick={() => setSavePackage(index)}
                      >
                        <Link to="/payments">
                          <span className="absolute bottom-1 flex items-center justify-center duration-600 -translate-x-full group-hover:translate-x-0 ease">
                            <img
                              className=" left-0   transition-all duration-1000  -bottom-2 -translate-x-32 transform  group-hover:translate-x-10 ease  "
                              src={hearticon}
                              alt="Your Image"
                            />
                          </span>
                          <span className=" flex items-center justify-center w-full  transition-all duration-1000 transform  group-hover:translate-x-96 ease">
                            Choose Package
                          </span>
                        </Link>
                      </button>
                    </div>
                  </motion.div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
