import React, { useEffect } from "react";
import { useState } from "react";
// import drag from "../assets/icon/drag.svg";
// import edit from "../assets/icon/edit.svg";
// import deleteicon from "../assets/icon/delete.svg";
// import axios from "axios";
import { Link } from "react-router-dom";
import seach from "../assets/icon/vector.svg";
import { Select } from "@chakra-ui/react";

const AdminComplaintList = () => {
  const [selectedColor, setSelectedColor] = useState("");
  return (
    <div>
      <section className="w-full  pr-24 flex justify-between h-[10%] px-[60px] py-[16px] ">
        <div className="flex flex-col justify-center font-bold text-2xl text-gray-900 ">
          Complanit List
        </div>
        <div className="relative flex gap-1.5 ">
          <input
            className="flex pl-10 w-[320px] h-[48px] border border-gray-300 rounded-lg  "
            type="text"
            id="FilterTextBox"
            name="FilterTextBox"
            placeholder="Search..."
          />
          <button type="submit">
            <img
              className="flex absolute left-2 top-2.5    w-[30px] h-[30px] "
              src={seach}
            />
          </button>
          <Select
            className={`${
              selectedColor === "option1"
                ? "text-beige-700"
                : selectedColor === "option2"
                ? "text-yellow-500"
                : selectedColor === "option3"
                ? "text-green-500"
                : selectedColor === "option4"
                ? "text-gray-700"
                : " bg-gray-400 text-gray-400"
            } `}
            size="lg"
            placeholder="All status"
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option
              className="w-[46px] h-[26px] border rounded-lg bg-beige-100 text-beige-700  "
              value="option1"
            >
              New
            </option>
            <option
              className="w-[46px] h-[26px] border rounded-lg  bg-yellow-100 text-yellow-500  "
              value="option2"
            >
              Pending
            </option>
            <option
              className="w-[46px] h-[26px] border rounded-lg bg-green-100 text-green-500"
              value="option3"
            >
              Resolved
            </option>
            <option
              className="w-[46px] h-[26px] border rounded-lg bg-gray-200 text-gray-700"
              value="option4"
            >
              Cancel
            </option>
          </Select>
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
    </div>
  );
};

export default AdminComplaintList;
