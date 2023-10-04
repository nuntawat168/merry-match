import TextInputField from "./TextInputField.jsx";

function BasicInfomationForm(props) {
  return (
    <div className="w-[930px] flex flex-col justify-start items-start space-y-6 font-nunito">
      <p className="text-purple-500 text-2xl font-bold">Basic Infomation</p>
      <div className="w-full grid grid-cols-2 gap-x-6 gap-y-10">
        <TextInputField name={"name"} placeholder={"Jon snow"} label={"Name"} />
        <TextInputField
          type="date"
          name={"dateOfBirth"}
          max={
            new Date(
              new Date().getFullYear() - 18,
              new Date().getMonth(),
              new Date().getDate()
            )
              .toISOString()
              .split("T")[0]
          }
          min={
            new Date(
              new Date().getFullYear() - 80,
              new Date().getMonth(),
              new Date().getDate()
            )
              .toISOString()
              .split("T")[0]
          }
          placeholder={"01/01/2022"}
          label={"Date of birth"}
        />
        <TextInputField
          name={"location"}
          placeholder={"Thailand"}
          label={"Location"}
        />
        <TextInputField name={"city"} placeholder={"Bangkok"} label={"City"} />
        <TextInputField
          name={"username"}
          placeholder={"At least 6 charactor"}
          label={"Username"}
        />
        <TextInputField
          name={"email"}
          type={"email"}
          placeholder={"name@website.com"}
          label={"Email"}
        />
        <TextInputField
          name={"password"}
          type={"password"}
          placeholder={"At least 8 charactor"}
          label={"Password"}
        />
        <TextInputField
          name={"passwordConfirmation"}
          type={"password"}
          placeholder={"At least 8 charactor"}
          label={"Confirm password"}
        />
      </div>
    </div>
  );
}

export default BasicInfomationForm;
