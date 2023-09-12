import React from "react";
import { useField } from "formik";

function TextInputField(props) {
  const [field, meta] = useField(props.name);
  return (
    <div className="w-full flex flex-col items-start space-y-1">
      {props.label && (
        <label
          htmlFor={props.name}
          className="text-black text-base font-normal"
        >
          {props.label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={`w-full  p-3 pl-4 bg-white border rounded-lg border-gray-400 focus:outline-gray-400 text-gray-900 ${
          meta.error && meta.touched ? `border-red-300 ` : `border-gray-300 `
        }`}
      />
      {meta.error && meta.touched && (
        <p className="text-red-300 "> {meta.error}</p>
      )}
    </div>
  );
}

export default TextInputField;
