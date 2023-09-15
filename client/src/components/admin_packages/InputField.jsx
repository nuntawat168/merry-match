import { useField } from "formik";

const InputField = ({ name, type, title }) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col w-[33%]">
      <label htmlFor={name}>
        {title} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`border w-72 rounded-md h-9 focus:outline-none pl-3 ${
          meta.touched && meta.error ? `border-red-500` : `border-gray-400`
        }`}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
