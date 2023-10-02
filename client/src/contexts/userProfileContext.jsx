import React, { useEffect, useState } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

const UserProfileContext = React.createContext();

function UserProfileProvider(props) {
  const toast = useToast();
  const [originalUserProfile, setOriginalUserProfile] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteOriginalPicturesProfile, setDeleteOriginalPicturesProfile] =
    useState([]);

  const [initValuesForm, setInitValuesForm] = useState({
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
    profilePictures: [
      { id: 1, picture: null },
      { id: 2, picture: null },
      { id: 3, picture: null },
      { id: 4, picture: null },
      { id: 5, picture: null },
    ],
  });

  async function initialFormik() {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    try {
      const response = await axios.get(
        `https://merry-match.onrender.com/user-profile/${user.id}`
      );
      const userProfile = response.data.data;
      const userInitForm = {
        name: userProfile.name,
        dateOfBirth: userProfile.date_of_birth.toString().split("T")[0],
        location: userProfile.location,
        city: userProfile.city,
        username: userProfile.username,
        email: userProfile.email,
        sexualIdentites: userProfile.sex,
        sexualPreferences: userProfile.sexual_preferences,
        racialPreferences: userProfile.racial_preferences,
        meetingInterests: userProfile.meeting_interests,
        hobbiesInterests: userProfile.hobby_interests.filter(
          (element) => element !== null
        ),
        aboutMe: userProfile.about_me,
        profilePictures: [
          { id: 1, picture: null },
          { id: 2, picture: null },
          { id: 3, picture: null },
          { id: 4, picture: null },
          { id: 5, picture: null },
        ].map((profilePiture, index) => {
          if (userProfile?.image[index] !== undefined) {
            return { id: profilePiture.id, picture: userProfile.image[index] };
          } else {
            return { id: profilePiture.id, picture: null };
          }
        }),
      };
      setOriginalUserProfile(userInitForm);
      setInitValuesForm(userInitForm);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  useEffect(() => {
    initialFormik();
  }, []);

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
              `https://merry-match.onrender.com/user-profile/check-available?checkColumn=username&checkValue=${value}`
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
              `https://merry-match.onrender.com/user-profile/check-available?checkColumn=email&checkValue=${value}`
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
      "has-minimum-keys",
      "Profile Pictures must have at least 2 photos",
      (value) => {
        return value.filter((element) => element.picture === null).length <= 3;
      }
    ),
  });

  function handleOnSubmit(data) {
    setIsSubmitting(true);
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

    // Filter delete picture profile
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
      (picturesProfile) => picturesProfile.picture !== null
    );

    newPicturesProfile.forEach((picturesProfile, i) => {
      const picture = picturesProfile.picture;
      if (picture?.url !== undefined) {
        formData.append(`newPicturesProfile_${i}`, JSON.stringify(picture));
      } else {
        const filePicture = picture[Object.keys(picture)[0]];
        formData.append(`newPicturesProfile_${i}`, filePicture);
      }
    });

    sendEditProfile(formData);
  }

  async function sendEditProfile(data) {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    try {
      const response = await axios.put(
        `https://merry-match.onrender.com/user-profile/${user.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await initialFormik();

      toast({
        title: "Updated Profile.",
        description: "We've updated your profile for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return setIsSubmitting(false);
    } catch (error) {
      alert("Update Profile Error");
      console.log("Update Profile Error", error);
      return setIsSubmitting(false);
    }
  }

  return (
    <UserProfileContext.Provider
      value={{
        formSchema,
        originalUserProfile,
        setOriginalUserProfile,
        deleteOriginalPicturesProfile,
        setDeleteOriginalPicturesProfile,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      <Formik
        initialValues={initValuesForm}
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
