import { useFormikContext } from "formik";
import { useRegister } from "../../contexts/registerContext.jsx";
import { useToast } from "@chakra-ui/react";

function RegisterFooter() {
  const toast = useToast();
  const { currentStepIndex, setCurrentStepIndex } = useRegister();
  const formik = useFormikContext();

  const isLastStep = currentStepIndex === 3;
  const isFirstStep = currentStepIndex === 1;

  const basicInfoFields = [
    "name",
    "dateOfBirth",
    "location",
    "city",
    "username",
    "email",
    "password",
    "passwordConfirmation",
  ];

  const identityFields = [
    "sexualIdentites",
    "sexualPreferences",
    "racialPreferences",
    "meetingInterests",
  ];

  const isHasErrorBasicInfo = basicInfoFields.some(
    (field) => formik.values[field] === "" || formik.errors[field]
  );

  const isHasErrorIdentity = identityFields.some(
    (field) => formik.values[field] === "" || formik.errors[field]
  );

  const isHasErrorProfilePictures = formik.errors.profilePictures;

  const renderBackButton = () => (
    <button
      className="flex flex-row items-center space-x-2 px-2 py-1 group"
      type="button"
      onClick={handlerOnClickBack}
    >
      <>
        <svg
          className={`${
            isFirstStep
              ? "fill-gray-500 "
              : "fill-red-500 group-hover:fill-red-400 group-active:fill-red-600"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M12.5275 7.33665H5.08079L8.33412 4.08332C8.59412 3.82332 8.59412 3.39665 8.33412 3.13665C8.07412 2.87665 7.65412 2.87665 7.39412 3.13665L3.00079 7.52998C2.74079 7.78998 2.74079 8.20998 3.00079 8.46998L7.39412 12.8633C7.65412 13.1233 8.07412 13.1233 8.33412 12.8633C8.59412 12.6033 8.59412 12.1833 8.33412 11.9233L5.08079 8.66998H12.5275C12.8941 8.66998 13.1941 8.36998 13.1941 8.00332C13.1941 7.63665 12.8941 7.33665 12.5275 7.33665Z" />
        </svg>
        <p
          className={`${
            isFirstStep
              ? "text-gray-500 text-base font-bold"
              : "text-red-500 text-base font-bold group-hover:text-red-400 group-active:text-red-600"
          }`}
        >
          Back
        </p>
      </>
    </button>
  );

  const renderNextButton = () => (
    <button
      className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full hover:bg-red-400 active:bg-red-600"
      onClick={handlerOnClickNext}
      type="button"
    >
      Next step
    </button>
  );

  const renderConfirmButton = () => (
    <button
      className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full hover:bg-red-400 active:bg-red-600"
      onClick={handlerOnClickConfirm}
      type="submit"
    >
      Confirm
    </button>
  );

  const handlerOnClickBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handlerOnClickNext = () => {
    toast.closeAll();
    switch (currentStepIndex) {
      case 1:
        if (isHasErrorBasicInfo) {
          basicInfoFields.map((field) => formik.setFieldTouched(field, true));
          toast({
            title: "Basic Infomations",
            description: "Check for errors before proceeding.",
            status: "error",
            duration: 9000,
            position: "top",
            isClosable: true,
          });
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
        }
        break;
      case 2:
        if (isHasErrorIdentity) {
          identityFields.map((field) => formik.setFieldTouched(field, true));
          toast({
            title: "Identities and Interests",
            description: "Check for errors before proceeding.",
            status: "error",
            duration: 9000,
            position: "top",
            isClosable: true,
          });
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
        }
    }
  };

  const handlerOnClickConfirm = () => {
    toast.closeAll();
    formik.handleSubmit();
    Object.keys(formik.values).map((field) =>
      formik.setFieldTouched(field, true)
    );
    if (isHasErrorBasicInfo) {
      toast({
        title: "Basic Infomations",
        description: "Check for errors before proceeding.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      return setCurrentStepIndex(1);
    } else if (isHasErrorIdentity) {
      toast({
        title: "Identities and Interests",
        description: "Check for errors before proceeding.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: truet,
      });
      return setCurrentStepIndex(2);
    } else if (isHasErrorProfilePictures) {
      return toast({
        title: "Profile Pictures",
        description: `Profile Pictures must have at least 2 photos.`,
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full bg-white mt-8 flex justify-center border-t border-gray-300 fixed bottom-0 z-10">
      <div className="w-[1120px] h-[112px]  px-8 flex flex-row justify-between items-center">
        <p className="text-base font-normal">
          <span className="text-gray-700">{currentStepIndex}</span>
          <span className="text-gray-600">/3</span>
        </p>
        <div className="flex flex-row space-x-6 items-center">
          {renderBackButton()}
          {isLastStep ? renderConfirmButton() : renderNextButton()}
        </div>
      </div>
    </div>
  );
}

export default RegisterFooter;
