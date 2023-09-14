import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import manImage from "../../src/assets/image/manOnLoginPage.svg";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import axios from 'axios';

function UserComplaintPage() {
  // Define the initial form values
  const initialValues = {
    issue: "",
    description: "",
    dateSubmitted: "",
  };

  // Define a validation schema using Yup
  const validationSchema = Yup.object({
    issue: Yup.string().required("Issue is required"),
    description: Yup.string().required("Description is required"),
    dateSubmitted: Yup.date().required("Date Submitted is required"),
  });

  const onSubmit = (values) => {

    values.dateSubmitted = new Date(values.dateSubmitted).toISOString();
    postDataToSupabase(values);
  };
  const postDataToSupabase = async (data) => {
    try {
      const response = await axios.post(
        'https://gacngpsoekbrifxahpkg.supabase.co',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhY25ncHNvZWticmlmeGFocGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1Mzk4MTQsImV4cCI6MjAwOTExNTgxNH0.FsPo5sRvcobf8AchCc51g32FGRBVtuSw0oXSPKuJwms', // Replace with your API key
          },
        }
      );

      console.log('Data posted to Supabase:', response.data);
      // Optionally, you can handle success or perform further actions here.
    } catch (error) {
      console.error('Error posting data to Supabase:', error);
      // Handle errors here.
    }
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
                <ErrorMessage name="issue" component="div" className="text-red-500" />
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
                <ErrorMessage name="description" component="div" className="text-red-500" />
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
                  className="w-[357px] h-[48px] border border-[#D6D9E4] rounded-lg mt-2 p-4"
                />
                <ErrorMessage name="dateSubmitted" component="div" className="text-red-500" />
              </div>

              <button
                type="submit"
                className="w-[102px] h-[48px] rounded-full bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-md text-white mt-[58px]"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
        <div className="w-1/2 flex flex justify-center relative">
          <img src={manImage} className="w-[65%]" alt="manImage" />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UserComplaintPage;