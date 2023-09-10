import { createContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import RegisterHeader from "../components/register/RegisterHeader";
import RegisterForm from "../components/register/RegisterForm";
import RegisterFooter from "../components/register/RegisterFooter";
import RegisterLoading from "../components/register/RegisterLoading";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/authentication";

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
  username: Yup.string().required().min(6).max(25),
  email: Yup.string().required().email(),
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

function RegisterPage() {
  const { register } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [picturesProfile, setPicturesProfile] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const titleForm = [
    "Basic Infomations",
    "Identities and Interests",
    "Upload Photos",
  ];

  function handleOnSubmit(data) {
    const formData = new FormData();
    for (let key in data) {
      if (key !== "profilePictures") {
        formData.append(key, data[key]);
      }
    }
    for (let key in data.profilePictures) {
      formData.append("picturesProfile", data.profilePictures[key]);
    }
    register(formData);
  }

  return (
    <FormContext.Provider
      value={{
        currentStepIndex,
        setCurrentStepIndex,
        titleForm,
        picturesProfile,
        setPicturesProfile,
      }}
    >
      <Formik
        initialValues={initDataForm}
        validationSchema={formSchema}
        onSubmit={handleOnSubmit}
      >
        <div className="w-full h-screen flex flex-col justify-start items-center bg-main font-nunito relative">
          <Navbar />
          <div className="w-[930px] h-screen mt-20  mb-[224px] pb-[224px] flex flex-col justify-start space-y-16">
            <RegisterHeader />
            <RegisterForm />
            <RegisterLoading />
          </div>
          <RegisterFooter />
        </div>
      </Formik>
    </FormContext.Provider>
  );
}

export default RegisterPage;
