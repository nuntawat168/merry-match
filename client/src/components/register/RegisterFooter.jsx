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

  const renderBackButton = () => (
    <button
      className="flex flex-row items-center space-x-2 px-2 py-1"
      type="button"
      onClick={handlerOnClickBack}
    >
      {isFirstStep ? (
        <>
          <img src={arrowBackGray500} alt="arrow back icon" />
          <p className="text-gray-500 text-base font-bold">Back</p>
        </>
      ) : (
        <>
          <img src={arrowBackRed500} alt="arrow back icon" />
          <p className="text-red-500 text-base font-bold">Back</p>
        </>
      )}
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
    if (currentStepIndex !== 1) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handlerOnClickNext = () => {
    const allValue = formik.values;
    const allError = formik.errors;

    let isHasError = false;

    switch (currentStepIndex) {
      case 1:
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
        isHasError = basicInfoFields.some((field) => {
          return allValue[field] === "" || allError[field];
        });
        break;
      case 2:
        const identityFields = [
          "sexualIdentites",
          "sexualPreferences",
          "racialPreferences",
          "meetingInterests",
        ];
        isHasError = identityFields.some(
          (field) => allValue[field] === "" || allError[field]
        );
        break;
    }

    if (isHasError) {
      alert(
        "Please review and correct any invalid or missing information before proceeding."
      );
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlerOnClickConfirm = () => {
    if (formik.errors.profilePictures) {
      alert(formik.errors.profilePictures);
    }
    formik.handleSubmit();
    console.log(formik);
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
