import { useContext } from "react";
import { FormContext } from "../../pages/RegisterPage.jsx";

import BasicInfomationForm from "../../components/register/BasicInfomationForm";
import IdentitiesAndInterestsForm from "../../components/register/IdentitiesAndInterestsForm";
import ProfilePicturesForm from "../../components/register/ProfilePicturesForm";

function RegisterForm() {
  const { currentStepIndex } = useContext(FormContext);

  function currentFrom(step) {
    switch (step) {
      case 1:
        return <BasicInfomationForm />;
      case 2:
        return <IdentitiesAndInterestsForm />;
      case 3:
        return <ProfilePicturesForm />;
    }
  }
  return currentFrom(currentStepIndex);
}

export default RegisterForm;
