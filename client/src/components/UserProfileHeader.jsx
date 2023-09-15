import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useFormikContext } from "formik";
import { useUserProfile } from "../contexts/userProfileContext";

function UserProfileHeader() {
  const {
    originalUserProfile,
    setOriginalUserProfile,
    deleteOriginalPicturesProfile,
  } = useUserProfile();

  const formik = useFormikContext();
  // const loggedValues = useRef(0);
  const [countFormikValuesChange, setCountFormikValuesChange] = useState(0);

  useEffect(() => {
    if (countFormikValuesChange >= 0 && countFormikValuesChange < 2) {
      // console.log("Formik Values (Initial):");
      // console.log(formik.values);
      setOriginalUserProfile(formik.values);
      setCountFormikValuesChange(countFormikValuesChange + 1);
    }
  }, [formik.values]);
  const handleOnClickUpdate = () => {
    console.log("+------------------------------------------+");
    console.log("New User Profile");
    console.log(formik.values);
    console.log("Original User Profile");
    console.log(originalUserProfile);
    const newUserProfile = { ...formik.values };
    const editUserProfile = {};
    const nameAllTextFields = [
      "name",
      "dateOfBirth",
      "location",
      "city",
      "username",
      "email",
      "sexualIdentites",
      "racialPreferences",
      "meetingInterests",
      "aboutMe",
    ];
    for (const nameTextField of nameAllTextFields) {
      if (
        newUserProfile[nameTextField] !== originalUserProfile[nameTextField]
      ) {
        editUserProfile[
          `new${nameTextField.charAt(0).toUpperCase() + nameTextField.slice(1)}`
        ] = newUserProfile[nameTextField];
      }
    }
    let originalHobbiesInterests = [...originalUserProfile["hobbiesInterests"]];
    const editHobbiesInterests = newUserProfile["hobbiesInterests"];
    const newHobbiesInterests = [];
    for (let i = 0; i < editHobbiesInterests.length; i++) {
      const tag = editHobbiesInterests[i];
      if (originalHobbiesInterests.includes(tag)) {
        originalHobbiesInterests.splice(
          originalHobbiesInterests.indexOf(tag),
          1
        );
      } else {
        newHobbiesInterests.push(editHobbiesInterests[i]);
      }
    }
    const deleteHobbiesInterests = [...originalHobbiesInterests];
    if (newHobbiesInterests.length > 0) {
      editUserProfile["hobbiesInterests"] = {
        newHobbiesInterests: [...newHobbiesInterests],
      };
    }
    if (deleteHobbiesInterests.length > 0) {
      editUserProfile["hobbiesInterests"] = {
        deleteHobbiesInterests: [...deleteOriginalPicturesProfile],
      };
    }

    // for (const picture of newUserProfile["profilePictures"]) {
    //   // console.log(picture);
    // }
    if (deleteOriginalPicturesProfile.length > 0) {
      editUserProfile["profilePictures"] = {
        deleteProfilePictures: [...deleteOriginalPicturesProfile],
      };
    }
    console.log(editUserProfile.profilePictures?.deleteProfilePictures);

    console.log("Edit User Profile");
    console.log(editUserProfile);
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
      formik.setFieldValue("hobbiesInterests", userProfile.hobby_interests);
      formik.setFieldValue("aboutMe", userProfile.about_me);
      const tempPicturesProfile = [...formik.values.profilePictures];
      for (const i in userProfile.image) {
        tempPicturesProfile[i] = userProfile.image[i];
      }
      formik.setFieldValue("profilePictures", [...tempPicturesProfile]);
      // console.log("hi");
      // console.log(formik.values); // why values in field in empty?
      // setOriginalUserProfile({ ...formik.values });
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
