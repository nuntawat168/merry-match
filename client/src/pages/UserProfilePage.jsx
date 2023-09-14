import React, { createContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfileHeader from "../components/UserProfileHeader";
import BasicInfomationForm from "../components/register/BasicInfomationForm";
import IdentitiesAndInterestsForm from "../components/register/IdentitiesAndInterestsForm";
import ProfilePicturesForm from "../components/register/ProfilePicturesForm";
import TextAreaInputField from "../components/TextAreaInputField";
import { UserProfileProvider } from "../contexts/userProfileContext.jsx";

export const FormContext = createContext();

function UserProfilePage() {
  return (
    <UserProfileProvider>
      <div className="w-full flex flex-col justify-start items-center bg-main font-nunito relative">
        <Navbar />
        <div className="w-[930px] mt-20 mb-[60px] flex flex-col justify-start space-y-20">
          <UserProfileHeader />
          <BasicInfomationForm />
          <IdentitiesAndInterestsForm>
            <TextAreaInputField
              name={"aboutMe"}
              placeholder={"I know nothing...but you"}
              label={"About me (Maximum 150 characters)"}
            />
          </IdentitiesAndInterestsForm>
          <ProfilePicturesForm />
          <div className="flex justify-end">
            <button className="px-2 py-1 text-gray-700 text-base font-bold">
              Delete account
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </UserProfileProvider>
  );
}

export default UserProfilePage;
