import React, { useContext, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import manImage from "../../src/assets/image/manOnLoginPage.svg";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Divider,
  useToast,
} from "@chakra-ui/react";

function UserComplaintPage() {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const user_id = user.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    issue: "",
    description: "",
    dateSubmitted: "",
  };

  const validationSchema = Yup.object({
    issue: Yup.string().required("Issue is required"),
    description: Yup.string().required("Description is required"),
    dateSubmitted: Yup.date().required("Date Submitted is required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    values.user_id = user_id;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/complaint`,
        values
      );
      // window.alert(`${response.data.message}`);
      console.log(
        `Data posted to ${import.meta.env.VITE_API_ENDPOINT}/complaint:`,
        response.data
      );
    } catch (error) {
      console.error(
        `Error posting data to ${import.meta.env.VITE_API_ENDPOINT}/complaint:`,
        error
      );
      window.alert(`${error.response.data.error}`);
    }
    onOpen();
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 mb-20 flex w-full">
        <div className="w-1/2 flex flex-col justify-start items-center pl-10 mt-10 mb-10 ml-10">
          <div>
            <p className="text-purple-500 font-nunito text-[14px] font-semibold uppercase">
              COMPLAINT
            </p>
            <p className="font-nunito text-[46px] font-extrabold text-purple-500">
              If you have any trouble
            </p>
            <p className="font-nunito text-[46px] font-extrabold text-purple-500">
              Don't be afraid to tell us!
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mt-10 mb-4 flex flex-col items-start">
                <label
                  htmlFor="issue"
                  className="font-nunito text-[16px] font-normal text-black inline-block"
                >
                  Issue
                </label>
                <Field
                  type="text"
                  id="issue"
                  name="issue"
                  placeholder="Enter Issue"
                  className="w-[548px] h-[48px] border border-[#D6D9E4] rounded-lg mt-2 p-4"
                />
                <ErrorMessage
                  name="issue"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mt-10 mb-4 flex flex-col items-start">
                <label
                  htmlFor="description"
                  className="font-nunito text-[16px] font-normal text-black inline-block"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter Description"
                  className="w-[548px] h-[196px] border border-[#D6D9E4] rounded-lg mt-2 p-4"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mt-10 mb-4 flex flex-col items-start">
                <label
                  htmlFor="dateSubmitted"
                  className="font-nunito text-[16px] font-normal text-black inline-block"
                >
                  Date Submitted
                </label>
                <Field
                  type="date"
                  id="dateSubmitted"
                  name="dateSubmitted"
                  max={new Date().toISOString().split("T")[0]}
                  className="w-[357px] h-[48px] border border-[#D6D9E4] rounded-lg mt-2 p-4"
                />
                <ErrorMessage
                  name="dateSubmitted"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-[102px] h-[48px] rounded-full bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md text-white mt-[58px]"
                // onClick={onOpen}
              >
                Submit
              </button>

              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />
                <AlertDialogContent borderRadius="3xl" maxW="528px">
                  <AlertDialogHeader fontSize={20}>
                    Complaint created successfully!
                  </AlertDialogHeader>
                  <AlertDialogCloseButton
                    color="gray.500"
                    marginX={2}
                    marginY={2}
                  />
                  <Divider marginBottom={5} borderColor="gray.300"></Divider>
                  <AlertDialogBody
                    fontSize={16}
                    color="gray.600"
                    marginBottom="10px"
                  >
                    Do you want to go back to matching page?
                  </AlertDialogBody>
                  <AlertDialogFooter justifyContent="flex-start">
                    <button
                      type="submit"
                      className="py-[12px] mb-[15px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                      ref={cancelRef}
                      onClick={() => {
                        onClose();
                        toast({
                          title: "Complaint created successfully!",
                          status: "success",
                          duration: 3000,
                          position: "top",
                          isClosable: true,
                        });
                        setTimeout(() => {
                          navigate("/match");
                        }, 500);
                      }}
                    >
                      Yes, I do.
                    </button>

                    <button
                      className="ml-4 mb-[15px] py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login"
                      ref={cancelRef}
                      onClick={() => {
                        onClose();
                        window.location.reload();
                      }}
                    >
                      No, I want to make more complaint.
                    </button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Form>
          </Formik>
        </div>
        <div className="w-1/2 flex justify-center relative">
          <img src={manImage} className="w-[65%]" alt="manImage" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserComplaintPage;
