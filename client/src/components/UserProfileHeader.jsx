import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useFormikContext } from "formik";
import { useUserProfile } from "../contexts/userProfileContext";
import { useDisclosure } from "@chakra-ui/react";
// import UserProfileModal from "./UserProfileModal";
import UserProfilePreviewModal from "./UserProfilePreviewModal";

function UserProfileHeader() {
  const { setOriginalUserProfile } = useUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormikContext();
  const [countFormikValuesChange, setCountFormikValuesChange] = useState(0);

  useEffect(() => {
    if (countFormikValuesChange >= 0 && countFormikValuesChange < 2) {
      setOriginalUserProfile(formik.values);
      setCountFormikValuesChange(countFormikValuesChange + 1);
    }
  }, [formik.values]);

  const handleOnClickUpdate = () => {
    formik.handleSubmit();
  };

  async function initialFormik() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    try {
      const response = await axios.get(
        `http://localhost:4000/user-profile/${user.id}`
      );
      const userProfile = response.data.data;
      formik.setFieldValue("name", userProfile.name);
      formik.setFieldValue(
        "dateOfBirth",
        userProfile.date_of_birth.toString().split("T")[0]
      );
      formik.setFieldValue("location", userProfile.location);
      formik.setFieldValue("city", userProfile.city);
      formik.setFieldValue("username", userProfile.username);
      formik.setFieldValue("email", userProfile.email);
      formik.setFieldValue("sexualIdentites", userProfile.sex);
      formik.setFieldValue("sexualPreferences", userProfile.sexual_preferences);
      formik.setFieldValue("racialPreferences", userProfile.racial_preferences);
      formik.setFieldValue("meetingInterests", userProfile.meeting_interests);
      formik.setFieldValue(
        "hobbiesInterests",
        userProfile.hobby_interests.filter((element) => element !== null)
      );
      formik.setFieldValue("aboutMe", userProfile.about_me);
      const tempPicturesProfile = [...formik.values.profilePictures];
      for (const i in userProfile.image) {
        tempPicturesProfile[i] = userProfile.image[i];
      }
      formik.setFieldValue("profilePictures", [...tempPicturesProfile]);
      return true;
    } catch (error) {
      console.error(error);
      return true;
    }
  }
  useEffect(() => {
    initialFormik();
  }, []);
  return (
    <div className="flex flex-row justify-between items-end ">
      <div className="w-[453px] flex flex-col justify-start space-y-2">
        <p className="text-beige-700 text-sm font-semibold">PROFILE</p>
        <p className="text-purple-500 text-4/5xl font-extrabold">
          Let's make profile to let other know you
        </p>
      </div>
      <div className="flex space-x-4 font-nunito">
        <button
          onClick={onOpen}
          className="bg-red-100 text-red-600 text-base font-bold shadow-btn space-x-2 px-6 py-3 rounded-full hover:bg-red-200  active:bg-red-300"
          type="button"
        >
          Preview Profile
        </button>
        <UserProfilePreviewModal isOpen={isOpen} onClose={onClose} />
        <button
          className="bg-red-500 text-white text-base font-bold shadow-btn space-x-2 px-6 py-3 rounded-full hover:bg-red-400 active:bg-red-600"
          type="submit"
          onClick={handleOnClickUpdate}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfileHeader;
