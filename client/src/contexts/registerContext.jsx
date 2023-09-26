import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../contexts/authentication";

// const UserProfileContext = React.createContext();
const RegisterContext = React.createContext();

function RegisterProvider(props) {
  const { register } = useAuth();
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
    aboutMe: "",
    profilePictures: [
      { id: 1, picture: null },
      { id: 2, picture: null },
      { id: 3, picture: null },
      { id: 4, picture: null },
      { id: 5, picture: null },
    ],
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
    aboutMe: Yup.string().max(150, "About me must be at most 150 characters"),
    profilePictures: Yup.array().test(
      "has-minimum-keys",
      "Profile Pictures must have at least 2 photos",
      (value) => {
        return value.filter((element) => element.picture === null).length <= 3;
      }
    ),
  });

  function handleOnSubmit(data) {
    const formData = new FormData();
    for (let key in data) {
      if (key !== "profilePictures") {
        if (Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    data.profilePictures.forEach((profilePicture) => {
      if (profilePicture.picture !== null) {
        formData.append(
          "picturesProfile",
          profilePicture.picture[Object.keys(profilePicture.picture)[0]]
        );
      }
    });
    register(formData);
    // setSubmitting(false);
  }

  const [picturesProfile, setPicturesProfile] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const titleForm = [
    "Basic Infomations",
    "Identities and Interests",
    "Upload Photos",
  ];

  return (
    <RegisterContext.Provider
      value={{
        picturesProfile,
        setPicturesProfile,
        initDataForm,
        formSchema,
        currentStepIndex,
        setCurrentStepIndex,
        titleForm,
      }}
    >
      <Formik
        initialValues={initDataForm}
        validationSchema={formSchema}
        onSubmit={handleOnSubmit}
      >
        {props.children}
      </Formik>
    </RegisterContext.Provider>
  );
}

const useRegister = () => React.useContext(RegisterContext);

export { RegisterProvider, useRegister };
