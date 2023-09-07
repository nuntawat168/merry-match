import StepperForm from "../../components/register/stepperForm";

function RegisterHeader() {
  return (
    <div className="flex flex-row justify-between items-end ">
      <div className="w-[453px] flex flex-col justify-start space-y-2">
        <p className="text-beige-700 text-sm font-semibold">REGISTER</p>
        <p className="text-purple-500 text-4/5xl font-extrabold">
          Join us and start mataching
        </p>
      </div>
      <StepperForm />
    </div>
  );
}

export default RegisterHeader;
