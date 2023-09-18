import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwtDecode from "jwt-decode";

const UserProfileContext = React.createContext();

function UserProfileProvider(props) {
  const [originalUserProfile, setOriginalUserProfile] = useState({});
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
      return true;
    } catch (error) {
      console.log("Edit Profile Error");
      console.log(error);
      return true;
    }
  }

  function handleOnSubmit(data) {
    const newUserProfile = { ...data };
    const editUserProfile = {};
    const nameAllTextFields = [
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
    const formData = new FormData();

    //=========Filter edit text input==============================
    for (const nameTextField of nameAllTextFields) {
      if (
        newUserProfile[nameTextField] !== originalUserProfile[nameTextField]
      ) {
        editUserProfile[
          `new${nameTextField.charAt(0).toUpperCase() + nameTextField.slice(1)}`
        ] = newUserProfile[nameTextField];
      }
    }

    //=========Filter edit hobbies and interests====================
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
      editUserProfile["newHobbiesInterests"] = [...newHobbiesInterests];
    }
    if (deleteHobbiesInterests.length > 0) {
      editUserProfile["deleteHobbiesInterests"] = [...deleteHobbiesInterests];
    }

    //========Filter edit image==================

    if (deleteOriginalPicturesProfile.length > 0) {
      editUserProfile["deleteProfilePictures"] = [
        ...deleteOriginalPicturesProfile,
      ];
    }
    //---------add edit userprofile to form data------------------
    for (let key in editUserProfile) {
      if (Array.isArray(editUserProfile[key])) {
        formData.append(key, JSON.stringify(editUserProfile[key]));
      } else {
        formData.append(key, editUserProfile[key]);
      }
    }

    //------------------add edit picture to form data------------------------
    const newPicturesProfile = data.profilePictures.filter(
      (picture) => picture !== null
    );

    for (let i = 0; i < newPicturesProfile.length; i++) {
      const picture = newPicturesProfile[i];
      if (picture?.url !== undefined) {
        formData.append(`newPicturesProfile_${i}`, JSON.stringify(picture));
      } else {
        const filePicture = picture[Object.keys(picture)[0]];
        formData.append(`newPicturesProfile_${i}`, filePicture);
      }
    }
    console.log("From onSubmit");
    console.log(editUserProfile);
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
