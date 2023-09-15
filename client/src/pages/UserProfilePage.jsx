import React, { createContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfileHeader from "../components/UserProfileHeader";
import UserEditBasicInfomationForm from "../components/UserEditBasicInfomationForm";
import UserEditIdentitiesAndInterestsForm from "../components/UserEditIdentitiesAndInterestsForm";
import UserEditProfilePicturesForm from "../components/UserEditProfilePicturesForm";
import UserDeleteAccount from "./UserDeleteAccount";
import { UserProfileProvider } from "../contexts/userProfileContext.jsx";

export const FormContext = createContext();

function UserProfilePage() {
  return (
    <UserProfileProvider>
      <div className="w-full flex flex-col justify-start items-center bg-main font-nunito relative">
        <Navbar />
        <div className="w-[930px] mt-20 mb-[60px] flex flex-col justify-start space-y-20">
          <UserProfileHeader />
          <UserEditBasicInfomationForm />
          <UserEditIdentitiesAndInterestsForm />
          <UserEditProfilePicturesForm />
          <UserDeleteAccount />
        </div>
        <Footer />
      </div>
    </UserProfileProvider>
  );
}

export default UserProfilePage;
