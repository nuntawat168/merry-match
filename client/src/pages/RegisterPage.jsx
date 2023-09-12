import { createContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterForm from "../components/register/RegisterForm";
import RegisterFooter from "../components/register/RegisterFooter";
import RegisterLoading from "../components/register/RegisterLoading";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/authentication";
import { UserProfileProvider } from "../contexts/userProfileManagement.jsx";

export const FormContext = createContext();

function RegisterPage() {
  const { register } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [picturesProfile, setPicturesProfile] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const titleForm = [
    "Basic Infomations",
    "Identities and Interests",
    "Upload Photos",
  ];

  return (
    <UserProfileProvider>
      <FormContext.Provider
        value={{
          currentStepIndex,
          setCurrentStepIndex,
          titleForm,
          picturesProfile,
          setPicturesProfile,
        }}
      >
        <div className="w-full h-screen flex flex-col justify-start items-center bg-main font-nunito relative">
          <Navbar />
          <div className="w-[930px] h-screen mt-20  mb-[224px] pb-[224px] flex flex-col justify-start space-y-16">
            <RegisterHeader />
            <RegisterForm />
            <RegisterLoading />
          </div>
          <RegisterFooter />
        </div>
      </FormContext.Provider>
    </UserProfileProvider>
  );
}

export default RegisterPage;
