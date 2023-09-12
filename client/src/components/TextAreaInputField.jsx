import React from "react";
import { useField } from "formik";

function TextAreaInputField(props) {
  const [field, meta] = useField(props.name);
  return (
    <div className="w-full flex flex-col items-start space-y-1 mt-10">
      <label htmlFor="" className="text-black text-base font-normal">
        {props.label}
      </label>
      <textarea
        {...field}
        {...props}
        name={props.name}
        cols="30"
        rows="10"
        className={`w-full rounded-lg border bg-white p-3 pl-4 text-gray-900${
          meta.error && typeof meta.error === "string"
            ? `border-red-300 `
            : `border-gray-300 `
        }`}
      />
      {meta.error && typeof meta.error === "string" && (
        <p className="text-red-300 "> {meta.error}</p>
      )}
    </div>
  );
}

export default TextAreaInputField;
