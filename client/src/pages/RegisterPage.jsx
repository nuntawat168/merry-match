import { createContext, useState } from "react";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterForm from "../components/register/RegisterForm";
import RegisterFooter from "../components/register/RegisterFooter";
import RegisterLoading from "../components/register/RegisterLoading";
import Navbar from "../components/Navbar";
import { RegisterProvider } from "../contexts/registerContext.jsx";

export const FormContext = createContext();

function RegisterPage() {
  return (
    <RegisterProvider>
      <div className="w-full h-screen flex flex-col justify-start items-center bg-main font-nunito relative">
        <Navbar />
        <div className="w-[930px] h-screen mt-20  mb-[224px] pb-[224px] flex flex-col justify-start space-y-16">
          <RegisterHeader />
          <RegisterForm />
          <RegisterLoading />
        </div>
        <RegisterFooter />
      </div>
    </RegisterProvider>
  );
}

export default RegisterPage;
