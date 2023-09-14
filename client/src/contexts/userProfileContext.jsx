import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwtDecode from "jwt-decode";

const UserProfileContext = React.createContext();

function UserProfileProvider(props) {
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
    profilePictures: Yup.object().test(
      "has-minimum-keys",
      "Profile Pictures must have at least 2 photos",
      (value) => {
        return Object.keys(value).length >= 2;
      }
    ),
  });

  function handleOnSubmit(data) {
    console.log("hi from OnSubmit");
    const formData = new FormData();
    for (let key in data) {
      if (key !== "profilePictures") {
        formData.append(key, data[key]);
      }
    }
    for (let key in data.profilePictures) {
      formData.append("picturesProfile", data.profilePictures[key]);
    }
    // register(formData);
    console.log(formData);
  }

  const [picturesProfile, setPicturesProfile] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  function a() {
    return formSchema;
  }

  return (
    <UserProfileContext.Provider
      value={{ picturesProfile, setPicturesProfile, initDataForm, formSchema }}
    >
      <Formik
        initialValues={initDataForm}
        validationSchema={(initialValues) => a(initialValues)}
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
