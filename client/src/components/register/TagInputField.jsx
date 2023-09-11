import React from "react";
import { useField, FieldArray } from "formik";

function TagInputField(props) {
  const [field, meta] = useField(props.name);
  return (
    <FieldArray {...field} {...props}>
      {({ push, remove }) => {
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
            <div
              className={`w-full flex flex-wrap flex-row p-3 pl-4 bg-white border rounded-lg border-gray-400 focus:outline-gray-400 ${
                meta.error && meta.touched
                  ? `border-red-300 `
                  : `border-gray-300 `
              }`}
            >
              {meta.value.map((element, index) => {
                return (
                  <span
                    key={index}
                    className="flex flex-row items-center bg-purple-100 rounded-md px-2 py-1 space-x-2 m-1"
                  >
                    <span className="text-purple-600 text-sm font-medium">
                      {element}
                    </span>
                    <button onClick={() => remove(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M5.02383 4.67599C4.91009 4.57 4.75965 4.5123 4.60421 4.51505C4.44877 4.51779 4.30046 4.58076 4.19053 4.69069C4.0806 4.80062 4.01763 4.94893 4.01489 5.10437C4.01215 5.25981 4.06985 5.41025 4.17583 5.52399L7.15183 8.49999L4.17583 11.476C4.11688 11.5309 4.0696 11.5972 4.0368 11.6708C4.00401 11.7444 3.98638 11.8238 3.98496 11.9044C3.98354 11.9849 3.99835 12.065 4.02853 12.1397C4.05871 12.2144 4.10362 12.2822 4.1606 12.3392C4.21757 12.3962 4.28544 12.4411 4.36015 12.4713C4.43486 12.5015 4.51489 12.5163 4.59545 12.5149C4.67601 12.5134 4.75546 12.4958 4.82906 12.463C4.90266 12.4302 4.9689 12.3829 5.02383 12.324L7.99983 9.34799L10.9758 12.324C11.0308 12.3829 11.097 12.4302 11.1706 12.463C11.2442 12.4958 11.3236 12.5134 11.4042 12.5149C11.4848 12.5163 11.5648 12.5015 11.6395 12.4713C11.7142 12.4411 11.7821 12.3962 11.8391 12.3392C11.896 12.2822 11.941 12.2144 11.9711 12.1397C12.0013 12.065 12.0161 11.9849 12.0147 11.9044C12.0133 11.8238 11.9956 11.7444 11.9629 11.6708C11.9301 11.5972 11.8828 11.5309 11.8238 11.476L8.84783 8.49999L11.8238 5.52399C11.9298 5.41025 11.9875 5.25981 11.9848 5.10437C11.982 4.94893 11.9191 4.80062 11.8091 4.69069C11.6992 4.58076 11.5509 4.51779 11.3954 4.51505C11.24 4.5123 11.0896 4.57 10.9758 4.67599L7.99983 7.65199L5.02383 4.67599Z"
                          fill="#7D2262"
                        />
                      </svg>
                    </button>
                  </span>
                );
              })}
              <input
                placeholder={props.placeholder}
                className={"inline-block grow focus:outline-0"}
                onKeyDown={(even) => {
                  if (even.key !== "Enter") return;
                  const data = even.target.value;
                  if (!data.trim()) return;
                  push(data);
                  even.target.value = "";
                }}
              />
            </div>
            {meta.error && typeof meta.error === "string" && (
              <p className="text-red-300 "> {meta.error}</p>
            )}
          </div>
        );
      }}
    </FieldArray>
  );
}

export default TagInputField;
