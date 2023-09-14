import React, { useEffect } from "react";
import { useState } from "react";
import drag from "../assets/icon/drag.svg";
import edit from "../assets/icon/edit.svg";
import deleteicon from "../assets/icon/delete.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import seach from "../assets/icon/vector.svg";

const Admindetail = () => {
  const [dataAgain, setDataAgain] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (packageId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/packages/${packageId}`);
      await fetchData(searchTerm);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const fetchData = async (keywords) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/packages?keywords=${keywords}`
      );
      setDataAgain(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      searchFromServer(searchTerm);
    }
  };

  return (
    <div>
      <section className="w-full  pr-24 flex justify-between h-[10%] px-[60px] py-[16px] ">
        <div className="flex flex-col justify-center font-bold text-2xl text-gray-900 ">
          Merry Package
        </div>
        <div className="relative flex gap-10 ">
          <form onSubmit={handleFormSubmit}>
            <input
              value={searchTerm}
              className="flex pl-10 w-[320px] h-[48px]  mt-6  border border-gray-300 rounded-lg  "
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              id="FilterTextBox"
              name="FilterTextBox"
              placeholder="Search..."
            />
            <button type="submit">
              <img
                className="flex absolute left-2 top-9    w-[30px] h-[30px] "
                src={seach}
              />
            </button>
          </form>
          <Link to="/addpackage">
            <button
              type="submit"
              className="flex flex-col justify-center mt-6 px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white"
            >
              + Add Package
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="font-nunito grid grid-flow-row bg-gray100 ">
          {/* first curve */}
          <div className=" text-[14px] mt-10 p-2  grid grid-cols-[5%_3%_8%_17%_17%_20%_20%_10%] bg-gray-400 w-[85%] h-[42px] mx-auto text-gray-800 font-bold  rounded-t-xl">
            <span></span>
            <span></span>
            <span>Icon</span>
            <span>Package name</span>
            <span>Merry limit</span>
            <span className="flex">Created date</span>
            <span className="flex ">Updated date</span>
            <span></span>
          </div>
          {/* normal-paragraph 1 */}
          {dataAgain.map((e) => {
            return (
              <div
                key={e.package_id}
                className=" text-[16px]  p-2 grid grid-cols-[5%_3%_8%_17%_17%_20%_20%_10%] w-[85%] h-[88px] mb-0.5  mx-auto items-center align-middle  bg-white last:rounded-b-xl  "
              >
                <span>
                  <img src={drag} alt="drag" className="mr-3" />
                </span>
                <span>{e.package_id}</span>
                <span>{e.package_name}</span>
                <span>{e.package_name}</span>
                <span className="flex ">{e.package_limit} Merry</span>
                <span className="grid justify-start">{e.created_at}</span>
                <span className="grid justify-start">{e.updated_at}</span>
                <span className="flex justify-center gap-2">
                  {/* delete */}
                  <button
                    type="submit"
                    className="hover:scale-150 duration-1000"
                  >
                    <img
                      className="w-[24px] h-[24px]"
                      src={deleteicon}
                      alt="delete Icon"
                      onClick={() => handleDelete(e.package_id)}
                    />
                  </button>
                  {/* edit */}
                  <button
                    type="submit"
                    className="hover:scale-150 duration-1000"
                  >
                    <img
                      className="w-[24px] h-[24px]"
                      src={edit}
                      alt="edit Icon"
                    />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Admindetail;
