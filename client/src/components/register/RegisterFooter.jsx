import { useContext } from "react";
import { useFormikContext } from "formik";
import { FormContext } from "../../pages/RegisterPage.jsx";
import arrowBackGray500 from "../../assets/icon/arrow_back_gray_500.svg";
import arrowBackRed500 from "../../assets/icon/arrow_back_red_500.svg";

function RegisterFooter() {
  const { currentStepIndex, setCurrentStepIndex, titleForm } =
    useContext(FormContext);
  const formik = useFormikContext();

  function renderBackButton(isRed) {
    if (isRed) {
      return (
        <>
          <img src={arrowBackRed500} alt="arrow back icon" />
          <p className="text-red-500 text-base font-bold">Back</p>
        </>
      );
    } else {
      return (
        <>
          <img src={arrowBackGray500} alt="arrow back icon" />
          <p className="text-gray-500 text-base font-bold">Back</p>
        </>
      );
    }
  }

  function renderNextAndConfirmButton(isLastStep) {
    if (isLastStep) {
      return (
        <button
          className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full"
          onClick={handlerOnClickConfirm}
          type="submit"
        >
          Confirm
        </button>
      );
    } else {
      return (
        <button
          className="bg-red-500 text-white text-base font-bold space-x-2 px-6 py-3 rounded-full"
          onClick={handlerOnClickNext}
          type="button"
        >
          Next step
        </button>
      );
    }
  }

  function handlerOnClickNext() {
    const allValue = formik.values;
    const allError = formik.errors;

    const isHasEmptyFieldInBasicInFo =
      allValue.name === "" ||
      allValue.dateOfBirth === "" ||
      allValue.location === "" ||
      allValue.city === "" ||
      allValue.username === "" ||
      allValue.email === "" ||
      allValue.password === "" ||
      allValue.passwordConfirmation === "";
    const isHasErrorInBasicInfo =
      allError.hasOwnProperty(name) ||
      allError.hasOwnProperty("dateOfBirth") ||
      allError.hasOwnProperty("location") ||
      allError.hasOwnProperty("city") ||
      allError.hasOwnProperty("username") ||
      allError.hasOwnProperty("email") ||
      allError.hasOwnProperty("password") ||
      allError.hasOwnProperty("passwordConfirmation");

    const isHasEmptyFieldInIdentites =
      allValue.sexualIdentites === "" ||
      allValue.sexualPreferences === "" ||
      allValue.racialPreferences === "" ||
      allValue.meetingInterests === "";

    const isHasErrorInIdentites =
      allError.hasOwnProperty("sexualIdentites") ||
      allError.hasOwnProperty("sexualPreferences") ||
      allError.hasOwnProperty("racialPreferences") ||
      allError.hasOwnProperty("meetingInterests") ||
      allError.hasOwnProperty("hobbiesInterests");

    switch (currentStepIndex) {
      case 1:
        if (isHasEmptyFieldInBasicInFo || isHasErrorInBasicInfo) {
          alert(
            "Please review and correct any invalid or missing information before proceeding."
          );
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
        }
        return;
      case 2:
        if (isHasEmptyFieldInIdentites || isHasErrorInIdentites) {
          alert(
            "Please review and correct any invalid or missing information before proceeding."
          );
        } else {
          setCurrentStepIndex(currentStepIndex + 1);
        }
        return;
    }
  }

  function handlerOnClickConfirm() {
    formik.handleSubmit();
  }

  function handlerOnClickBack() {
    if (currentStepIndex !== 1) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }

  return (
    <div className="w-full bg-white mt-8 flex justify-center border-t border-gray-300 fixed bottom-0 z-10">
      <div className="w-[1120px] h-[112px]  px-8 flex flex-row justify-between items-center">
        <p className="text-base font-normal">
          <span className="text-gray-700">{currentStepIndex}</span>
          <span className="text-gray-600">/3</span>
        </p>
        <div className="flex flex-row space-x-6 items-center">
          <button
            className="flex flex-row items-center space-x-2 px-2 py-1"
            type="button"
            onClick={handlerOnClickBack}
          >
            {renderBackButton(currentStepIndex !== 1)}
          </button>
          {renderNextAndConfirmButton(currentStepIndex === 3 ? true : false)}
        </div>
      </div>
    </div>
  );
}

export default RegisterFooter;
