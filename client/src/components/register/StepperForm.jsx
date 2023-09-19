import { useRegister } from "../../contexts/registerContext.jsx";

function StepperForm() {
  const { currentStepIndex, setCurrentStepIndex, titleForm } = useRegister();

  function renderSelectTag(text, stepIndex, isOnSelect) {
    if (isOnSelect) {
      return (
        <div
          className="h-20 p-4 pr-8 border border-purple-500 rounded-2xl flex justify-start items-center space-x-4 "
          key={stepIndex}
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-200 flex justify-center items-center text-purple-500 text-2xl font-bold">
            {stepIndex}
          </div>
          <div className="flex flex-col items-start ">
            <p className="text-gray-700 text-xs font-medium">
              Step {stepIndex}/{titleForm.length}
            </p>
            <p className="text-purple-500 text-base font-extrabold">{text}</p>
          </div>
        </div>
      );
    } else {
      return (
        <button
          className="w-20 h-20 border border-gray-300 rounded-2xl flex justify-center items-center group hover:border-gray-600"
          key={stepIndex}
          onClick={() => {
            setCurrentStepIndex(stepIndex);
          }}
        >
          <div className="w-12 h-12 rounded-2xl  bg-gray-200 flex justify-center items-center text-2xl font-bold text-gray-600 group-hover:bg-gray-300 group-hover:text-gray-700">
            {stepIndex}
          </div>
        </button>
      );
    }
  }

  return (
    <>
      <div className="flex space-x-3 font-nunito">
        {titleForm.map((detail, index) => {
          const onSelect = currentStepIndex === index + 1 ? true : false;
          return renderSelectTag(detail, index + 1, onSelect);
        })}
      </div>
    </>
  );
}

export default StepperForm;
