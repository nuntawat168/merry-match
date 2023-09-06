import React from "react";
import { useState } from "react";
import axios from "axios";

const [data, setData] = useState([]);

const Admindetail = () => {
  return (
    <div className="font-nunito grid grid-flow-row bg-gray100 ">
      {/* first curve */}
      <div className=" mt-10 p-2   grid grid-cols-[5%_3%_8%_17%_17%_20%_20%_10%] bg-gray400 w-[85%] h-[42px] mx-auto text-gray800 font-bold  rounded-t-xl">
        <span>1</span>
        <span>2</span>
        <span>Icon</span>
        <span>Package name</span>
        <span>Merry limit</span>
        <span className="flex">Created date</span>
        <span className="flex ">Updated date</span>
        <span>8</span>
      </div>
      {/* normal-paragraph 1 */}
      <div className=" text-[16px] p-2 grid grid-cols-[5%_3%_8%_17%_17%_20%_20%_10%] w-[85%] h-[88px] mx-auto align-middle items-center bg-red100   ">
        <span className="grid grid-rows-3 border rounded-full h-[6px] w-[6px]"></span>
        <span>1</span>
        <span>หัวใจ</span>
        <span>basic</span>
        <span>25merry</span>
        <span className="grid justify-start">12/02/2022 10:30PM</span>
        <span className="grid justify-start">12/02/2022 10:30PM</span>
        <span>icon</span>
      </div>
      {/* normal-paragraph 2 */}
      <div className=" p-2 m-0.5 grid grid-cols-[5%_3%_8%_17%_17%_20%_20%_10%] w-[85%] h-[88px] mx-auto align-middle items-center bg-red100   ">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
      </div>
      {/* normal-paragraph 3 */}
    </div>
  );
};

export default Admindetail;
