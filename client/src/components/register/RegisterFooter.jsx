import { useContext } from "react";
import { useFormikContext } from "formik";
import { FormContext } from "../../pages/RegisterPage.jsx";
import arrowBackGray500 from "../../assets/icon/arrow_back_gray_500.svg";
import arrowBackRed500 from "../../assets/icon/arrow_back_red_500.svg";

function RegisterFooter() {
  const { currentStepIndex, setCurrentStepIndex } = useContext(FormContext);
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

  const renderBackButton = () => (
    <button
      className="flex flex-row items-center space-x-2 px-2 py-1"
      type="button"
      onClick={handlerOnClickBack}
    >
      <>
        <img
          src={isFirstStep ? arrowBackGray500 : arrowBackRed500}
          alt="arrow back icon"
        />
        <p
          className={`text-${
            isFirstStep ? "gray" : "red"
          }-500 text-base font-bold`}
        >
          Back
        </p>
      </>
    </button>
  );

  const renderNextButton = () => (
    <button
      className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full"
      onClick={handlerOnClickNext}
      type="button"
    >
      Next step
    </button>
  );

  const renderConfirmButton = () => (
    <button
      className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full"
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
    switch (currentStepIndex) {
      case 1:
        if (isHasErrorBasicInfo) {
          basicInfoFields.map((field) => formik.setFieldTouched(field, true));
          alert(
            "Please review and correct any invalid or missing information before proceeding."
          );
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
        }
        break;
      case 2:
        if (isHasErrorIdentity) {
          identityFields.map((field) => formik.setFieldTouched(field, true));
          alert(
            "Please review and correct any invalid or missing information before proceeding."
          );
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
        }
    }
  };

  const handlerOnClickConfirm = () => {
    formik.handleSubmit();
    Object.keys(formik.values).map((field) =>
      formik.setFieldTouched(field, true)
    );
    if (isHasErrorBasicInfo) {
      alert(
        "Basic Information is Invalid or Incomplete\nPlease review and correct any errors or missing information in the Basic Information section before proceeding."
      );
      return setCurrentStepIndex(1);
    } else if (isHasErrorIdentity) {
      alert(
        "Identities and Interests are Invalid or Incomplete\nPlease review and correct any errors or missing information in the Identities and Interests section before proceeding."
      );
      return setCurrentStepIndex(2);
    } else if (formik.errors.profilePictures) {
      return alert(
        `Profile Pictures Error\nProfile Pictures must have at least 2 photos. Please upload additional photos to meet this requirement.`
      );
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
