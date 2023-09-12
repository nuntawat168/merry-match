import React, { createContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserProfileHeader from "../components/UserProfileHeader";
import BasicInfomationForm from "../components/register/BasicInfomationForm";
import IdentitiesAndInterestsForm from "../components/register/IdentitiesAndInterestsForm";
import ProfilePicturesForm from "../components/register/ProfilePicturesForm";
import { UserProfileProvider } from "../contexts/userProfileManagement.jsx";

export const FormContext = createContext();

const initDataForm = {
  name: "",
  dateOfBirth: "",
  location: "",
  city: "",
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  sexualIdentites: "",
  sexualPreferences: "",
  racialPreferences: "",
  meetingInterests: "",
  hobbiesInterests: [],
  profilePictures: {},
};

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field").max(25),
  dateOfBirth: Yup.string().required("Date of birth is a required field"),
  location: Yup.string().required("Location is a required field"),
  city: Yup.string().required("City is a required field"),
  username: Yup.string()
    .required()
    .min(6)
    .max(25)
    .test(
      "check-username-availability",
      "Username is already taken",
      async function (value) {
        try {
          const response = await axios.get(
            `http://localhost:4000/auth/check-available?checkColumn=username&checkValue=${value}`
          );
          return response.data.data;
        } catch (error) {
          console.error(`Error checking username availability: ${error}`);
          return false;
        }
      }
    ),
  email: Yup.string()
    .required()
    .email()
    .test(
      "check-username-availability",
      "Username is already taken",
      async function (value) {
        try {
          const response = await axios.get(
            `http://localhost:4000/auth/check-available?checkColumn=email&checkValue=${value}`
          );
          return response.data.data;
        } catch (error) {
          console.error(`Error checking username availability: ${error}`);
          return false;
        }
      }
    ),
  password: Yup.string().required().min(8).max(50),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  sexualIdentites: Yup.string().required(
    "Sexual Identites is a required field"
  ),
  sexualPreferences: Yup.string().required(
    "Sexual Preferences is a required field"
  ),
  racialPreferences: Yup.string().required(
    "Racial Preferences is a required field"
  ),
  meetingInterests: Yup.string().required(
    "Meeting Interests is a required field"
  ),
  hobbiesInterests: Yup.array()
    .of(Yup.string())
    .max(10, "Maximum of 10 Hobbies/Interests"),
  profilePictures: Yup.object().test(
    "has-minimum-keys",
    "Profile Pictures must have at least 2 photos",
    (value) => {
      return Object.keys(value).length >= 2;
    }
  ),
});

function UserProfilePage() {
  const [picturesProfile, setPicturesProfile] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  function handleOnSubmit(data) {
    console.log(data);
  }
  return (
    <UserProfileProvider>
      <div className="w-full flex flex-col justify-start items-center bg-main font-nunito relative">
        <Navbar />
        <div className="w-[930px] mt-20 mb-[60px] flex flex-col justify-start space-y-20">
          <UserProfileHeader />
          <BasicInfomationForm />
          <IdentitiesAndInterestsForm>
            <textarea name="" id="" cols="30" rows="10"></textarea>
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
