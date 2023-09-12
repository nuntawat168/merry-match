import React, { useEffect } from "react";
import { useState } from "react";
// import drag from "../assets/icon/drag.svg";
// import edit from "../assets/icon/edit.svg";
// import deleteicon from "../assets/icon/delete.svg";
// import axios from "axios";
import { Link } from "react-router-dom";
import seach from "../assets/icon/vector.svg";

const AdminComplaintList = () => {
  return (
    <div>
      <section className="w-full  pr-24 flex justify-between h-[10%] px-[60px] py-[16px] ">
        <div className="flex flex-col justify-center font-bold text-2xl text-gray-900 ">
          Complanit List
        </div>
        <div className="relative flex gap-10 ">
          <input
            className="flex pl-10 w-[320px] border border-gray-300 rounded-lg  "
            type="text"
            id="FilterTextBox"
            name="FilterTextBox"
            placeholder="Search..."
          />
          <button type="submit">
            <img
              className="flex absolute left-2 top-3    w-[30px] h-[30px] "
              src={seach}
            />
          </button>
          <Link to="/addpackage">
            <button
              type="submit"
              className="flex flex-col justify-center px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white"
            >
              + Add Package
            </button>
          </Link>
        </div>
      </section>
      <section>
        <div className="font-nunito grid grid-flow-row bg-gray-100 ">
          {/* first curve */}
          <div className="text-[14px] items-center   bg-gray-400  text-gray-800  mt-10 pl-2   grid grid-cols-[15%_20%_38%_15%_12%] bg-gray400 w-[85%] h-[42px] mx-auto text-gray800 font-bold  rounded-t-xl">
            <span className="flex ml-5">User</span>
            <span className="flex ml-5">Issue</span>
            <span>Description</span>
            <span>Date Submitted</span>
            <span>Status</span>
          </div>
          {/* normal-paragraph 1 */}
          <div className="text-[14px] items-center   bg-white  text-gray-800  pl-2   grid grid-cols-[15%_20%_38%_15%_12%]  w-[85%] h-[42px] mx-auto text-gray800 font-bold last:rounded-b-xl">
            <span className="flex ml-5">User</span>
            <span className="flex ml-5">Issue</span>
            <span>Description</span>
            <span>Date Submitted</span>
            <span>Status</span>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};

export default AdminComplaintList;
