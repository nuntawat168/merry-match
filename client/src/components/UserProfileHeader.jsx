import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormikContext } from "formik";
import jwtDecode from "jwt-decode";

function UserProfileHeader() {
  const formik = useFormikContext();
  const handleOnClickUpdate = () => {
    console.log(formik.values);
  };
  async function initialFormik() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    try {
      const response = await axios.get(
        `http://localhost:4000/user-profile/${user.id}`
      );
      console.log(response.data.data);

      const userProfile = response.data.data;

      // formik.initialValues("name": userProfile.name);
      // formik.initialValues = { name: userProfile.name };
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
      formik.setFieldValue("hobbiesInterests", userProfile.hobby_interests);
      formik.setFieldValue("aboutMe", userProfile.about_me);
      console.log(formik.values);
    } catch (error) {
      console.error(error);
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
          className="bg-red-100 text-red-600 text-base font-bold space-x-2 px-6 py-3 rounded-full"
          type="button"
        >
          Preview Profile
        </button>
        <button
          className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full"
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
