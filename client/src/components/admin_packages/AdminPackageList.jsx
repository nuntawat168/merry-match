import React, { useEffect, useRef, useState } from "react";
import drag from "../../assets/icon/drag.svg";
import edit from "../../assets/icon/edit.svg";
import deleteicon from "../../assets/icon/delete.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import seach from "../../assets/icon/vector.svg";
import Modal from "../Modal";
import { Button } from "@chakra-ui/react";
import PreviewImage from "../PreviewImage";
import { Formik } from "formik";
import moment from "moment";
import usePackages from "../../hooks/usePackages";

import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

const AdminPackageList = () => {
  const [dataAgain, setDataAgain] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [packageIdToDelete, setPackageIdToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { createPackage, updatePackage, deletePackage } = usePackages();

  const [dragItem, setDragItem] = useState([{}]);

  const handleDelete = async (packageId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.delete(
        `https://merry-match.onrender.com/packages/${packageId}`
      );
      await fetchData(searchTerm);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const fetchData = async (keywords) => {
    try {
      const response = await axios.get(
        `https://merry-match.onrender.com/packages?keywords=${keywords}`
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

  const handleOnDrag = (e, item) => {
    e.preventDefault();
    setDragItem(item);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e, dropItem) => {
    const newDataAgain = [...dataAgain];
    newDataAgain.splice(dataAgain.indexOf(dragItem), 1);
    newDataAgain.splice(dataAgain.indexOf(dropItem), 0, dragItem);
    setDataAgain(newDataAgain);
  };

  const handleClick = (packageId) => {
    setPackageIdToDelete(packageId);
    onOpen();
  };

  return (
    <div>
      <section className="w-full  pr-24 flex justify-between h-[80px] px-[60px] ">
        <div className="flex flex-col justify-center font-bold text-2xl text-gray-900 ">
          Merry Package
        </div>
        <div className="relative flex gap-4 ">
          <form onSubmit={handleFormSubmit}>
            <input
              value={searchTerm}
              className="flex pl-10 w-[320px] h-[48px]  mt-4  border border-gray-300 rounded-lg  "
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              id="FilterTextBox"
              name="FilterTextBox"
              placeholder="Search..."
            />
            <button type="submit">
              <img
                className="flex absolute left-2 top-7   w-[30px] h-[30px] "
                src={seach}
              />
            </button>
          </form>
          <Link to="/package/add">
            <button
              type="submit"
              className="flex flex-col justify-center mt-4 px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white"
            >
              + Add Package
            </button>
          </Link>
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="bg-gray-100 h-screen">
          <div className="font-nunito grid grid-flow-row ">
            {/* first curve */}
            <div className=" text-[14px] mt-10 p-2  grid grid-cols-[5%_3%_8%_17%_17%_20%_20%_10%] bg-gray-400 w-[85%] h-[42px] mx-auto text-gray-800 font-bold  items-center  rounded-t-xl">
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
                  className=" text-[16px]  p-2 grid grid-cols-[3%_5%_8%_17%_17%_20%_20%_10%] w-[85%] h-[88px] mb-0.5  mx-auto items-center align-middle  bg-white last:rounded-b-xl"
                  onMouseDown={(event) =>
                    event.target.parentNode.setAttribute("draggable", "true")
                  }
                  onMouseUp={(event) =>
                    event.target.parentNode.setAttribute("draggable", "false")
                  }
                  onDrag={(event) => handleOnDrag(event, e)}
                  onDrop={(event) => {
                    handleOnDrop(event, e);
                  }}
                  onDragOver={(event) => handleOnDragOver(event)}
                >
                  <span>
                    <img src={drag} alt="drag" className="mr-3" />
                  </span>
                  <span>{e.package_id}</span>
                  <Formik>
                    <PreviewImage file={e.package_icon} />
                  </Formik>
                  <span>{e.package_name}</span>
                  <span className="flex ">{e.package_limit} Merry</span>
                  <span className="grid justify-start">
                    {moment(e.created_at).format("YYYY/MM/DD kk:mm:ss")}
                  </span>
                  <span className="grid justify-start">
                    {moment(e.updated_at).format("YYYY/MM/DD kk:mm:ss")}
                  </span>
                  <span className="flex justify-center gap-2 ">
                    {/* delete */}

                    <button
                      type="submit"
                      className="hover:scale-150 duration-1000"
                      onClick={() => handleClick(e.package_id)}
                    >
                      <img
                        className="w-[24px] h-[24px] "
                        src={deleteicon}
                        alt="delete Icon"
                      />

                      <AlertDialog
                        motionPreset="slideInBottom"
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                      >
                        <AlertDialogOverlay
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                        />

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            Delete Confirmation
                            <hr />
                          </AlertDialogHeader>
                          <AlertDialogCloseButton />
                          <AlertDialogBody>
                            Do you sure to delete this Package?
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <button
                              className="py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                              ref={cancelRef}
                              onClick={() => {
                                handleDelete(packageIdToDelete);
                                onClose();
                              }}
                            >
                              Yes, I want to delete
                            </button>
                            <button
                              className=" ml-3 py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login"
                              ref={cancelRef}
                              onClick={onClose}
                            >
                              No, I don’t want
                            </button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </button>

                    {/* edit */}
                    <Link to={`/package/edit/${e.package_id}`}>
                      <button
                        type="button"
                        className="hover:scale-150 duration-1000"
                      >
                        <img
                          className="mt-1 w-[24px] h-[24px]"
                          src={edit}
                          alt="edit Icon"
                        />
                      </button>
                    </Link>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPackageList;
