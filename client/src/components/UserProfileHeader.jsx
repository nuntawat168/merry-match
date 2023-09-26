import React from "react";
import { useFormikContext } from "formik";
import { useDisclosure } from "@chakra-ui/react";
import UserProfilePreviewModal from "./UserProfilePreviewModal";
import { useToast } from "@chakra-ui/react";

function UserProfileHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const formik = useFormikContext();

  const fields = {
    basicInfo: [
      "name",
      "dateOfBirth",
      "location",
      "city",
      "username",
      "email",
      "password",
      "passwordConfirmation",
    ],
    identity: [
      "sexualIdentites",
      "sexualPreferences",
      "racialPreferences",
      "meetingInterests",
    ],
  };

  const scrollAndShowToast = (sectionId, title, description) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    toast({
      title,
      description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleOnClickUpdate = () => {
    formik.handleSubmit();
    if (
      fields.basicInfo.some(
        (field) => formik.values[field] === "" || formik.errors[field]
      )
    ) {
      scrollAndShowToast(
        "UserEditBasicInfomationForm",
        "Basic Information is Invalid or Incomplete",
        "Please review and correct any errors or missing information in the Basic Information section before proceeding."
      );
    } else if (
      fields.identity.some(
        (field) => formik.values[field] === "" || formik.errors[field]
      )
    ) {
      scrollAndShowToast(
        "UserEditIdentitiesAndInterestsForm",
        "Identities and Interests are Invalid or Incomplete",
        "Please review and correct any errors or missing information in the Identities and Interests section before proceeding."
      );
    } else if (formik.errors.profilePictures) {
      scrollAndShowToast(
        "UserEditProfilePicturesForm",
        "Profile Pictures Error",
        "Profile Pictures must have at least 2 photos. Please upload additional photos to meet this requirement."
      );
    }
  };

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
