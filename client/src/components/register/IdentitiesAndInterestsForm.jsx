import SelectInputField from "./SelectInputField.jsx";
import TagInputField from "./TagInputField.jsx";

function IdentitiesAndInterestsForm() {
  const sexualIdentitesList = ["Male", "Female"];
  const sexualPreferences = ["Male", "Female"];
  const racialPreferences = ["Asian", "American", "European"];
  const meetingInterests = ["Friend", "Girlfriend", "Boyfriend"];
  return (
    <div className="w-[930px] flex flex-col justify-start items-start font-nunito">
      <p className="text-purple-500 text-2xl font-bold">
        Identities and Interests
      </p>
      <div className="w-full grid grid-cols-2 gap-x-6 gap-y-10 mt-6 mb-10">
        <SelectInputField
          list={sexualIdentitesList}
          name={"sexualIdentites"}
          placeholder={"Male"}
          label={"Sexual Identites"}
        />
        <SelectInputField
          name={"sexualPreferences"}
          list={sexualPreferences}
          placeholder={"Female"}
          label={"Sexual Preferences"}
        />
        <SelectInputField
          name={"racialPreferences"}
          list={racialPreferences}
          placeholder={"Asian"}
          label={"Racial Preferences"}
        />
        <SelectInputField
          name={"meetingInterests"}
          list={meetingInterests}
          placeholder={"Friends"}
          label={"Meeting Interests"}
        />
      </div>
      <TagInputField
        name={"hobbiesInterests"}
        placeholder={"Typing your Hobbies/Interests and Enter"}
        label={"Hobbies/Interests(Maximum 10)"}
      />
    </div>
  );
}

export default IdentitiesAndInterestsForm;
