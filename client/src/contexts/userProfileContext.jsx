import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwtDecode from "jwt-decode";

const UserProfileContext = React.createContext();

function UserProfileProvider(props) {
  const [originalUserProfile, setOriginalUserProfile] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [deleteOriginalPicturesProfile, setDeleteOriginalPicturesProfile] =
    useState([]);
  const initDataForm = {
    name: "",
    dateOfBirth: "",
    location: "",
    city: "",
    username: "",
    email: "",
    sexualIdentites: "",
    sexualPreferences: "",
    racialPreferences: "",
    meetingInterests: "",
    hobbiesInterests: [],
    aboutMe: "",
    profilePictures: [null, null, null, null, null],
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
              `http://localhost:4000/user-profile/check-available?checkColumn=username&checkValue=${value}`
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
              `http://localhost:4000/user-profile/check-available?checkColumn=email&checkValue=${value}`
            );
            return response.data.data;
          } catch (error) {
            console.error(`Error checking username availability: ${error}`);
            return false;
          }
        }
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
    aboutMe: Yup.string().max(150, "About me must be at most 150 characters"),
    profilePictures: Yup.array().test(
      "has-minimum-picture",
      "Profile Pictures must have at least 2 photos",
      (value) => {
        return value.filter((element) => element === null).length <= 3;
      }
    ),
  });
  async function sendEditProfile(data) {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    try {
      const response = await axios.put(
        `http://localhost:4000/user-profile/${user.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setIsSubmit(false);
      return true;
    } catch (error) {
      alert("Update Profile Error");
      console.log("Update Profile Error");
      console.log(error);
      setIsSubmit(false);
      return true;
    }
  }

  function handleOnSubmit(data) {
    setIsSubmit(true);
    const newUserProfile = { ...data };
    const editUserProfile = {};

    // Utility function to check if a field has changed
    function hasFieldChanged(fieldName) {
      return newUserProfile[fieldName] !== originalUserProfile[fieldName];
    }

    // Filter edit text input
    const textFieldsToCheck = [
      "name",
      "dateOfBirth",
      "location",
      "city",
      "username",
      "email",
      "sexualIdentites",
      "sexualPreferences",
      "racialPreferences",
      "meetingInterests",
      "aboutMe",
    ];

    textFieldsToCheck.forEach((fieldName) => {
      if (hasFieldChanged(fieldName)) {
        editUserProfile[
          `new${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
        ] = newUserProfile[fieldName];
      }
    });

    // Filter edit hobbies and interests
    const originalHobbiesInterests = [...originalUserProfile.hobbiesInterests];
    const editHobbiesInterests = newUserProfile.hobbiesInterests;
    const newHobbiesInterests = editHobbiesInterests.filter(
      (tag) => !originalHobbiesInterests.includes(tag)
    );
    const deleteHobbiesInterests = originalHobbiesInterests.filter(
      (tag) => !editHobbiesInterests.includes(tag)
    );
    if (newHobbiesInterests.length > 0) {
      editUserProfile["newHobbiesInterests"] = [...newHobbiesInterests];
    }
    if (deleteHobbiesInterests.length > 0) {
      editUserProfile["deleteHobbiesInterests"] = [...deleteHobbiesInterests];
    }

    // Filter edit images
    if (deleteOriginalPicturesProfile.length > 0) {
      editUserProfile["deleteProfilePictures"] = [
        ...deleteOriginalPicturesProfile,
      ];
    }

    // Create FormData and add fields
    const formData = new FormData();
    for (const key in editUserProfile) {
      if (Array.isArray(editUserProfile[key])) {
        formData.append(key, JSON.stringify(editUserProfile[key]));
      } else {
        formData.append(key, editUserProfile[key]);
      }
    }

    // Add new profile pictures to FormData
    const newPicturesProfile = data.profilePictures.filter(
      (picture) => picture !== null
    );

    newPicturesProfile.forEach((picture, i) => {
      if (picture?.url !== undefined) {
        formData.append(`newPicturesProfile_${i}`, JSON.stringify(picture));
      } else {
        const filePicture = picture[Object.keys(picture)[0]];
        formData.append(`newPicturesProfile_${i}`, filePicture);
      }
    });

    sendEditProfile(formData);
  }

  return (
    <UserProfileContext.Provider
      value={{
        initDataForm,
        formSchema,
        originalUserProfile,
        setOriginalUserProfile,
        deleteOriginalPicturesProfile,
        setDeleteOriginalPicturesProfile,
        isSubmit,
        setIsSubmit,
      }}
    >
      <Formik
        initialValues={initDataForm}
        validationSchema={formSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize={true}
      >
        {props.children}
      </Formik>
    </UserProfileContext.Provider>
  );
}

const useUserProfile = () => React.useContext(UserProfileContext);

export { UserProfileProvider, useUserProfile };
