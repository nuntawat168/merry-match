import { FieldArray, useField, Field, getIn } from "formik";
import drag from "../../assets/icon/drag.svg";
import React from "react";
import { useState } from "react";

const PackageDetails = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const [dragItem, setDragItem] = useState([{}]);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (e, item) => {
    if (e.target.tagName !== "IMG") {
      e.preventDefault();
    }
    setDragItem(item);
    console.log("e.target", e.target.tagName);
  };

  return (
    <FieldArray
      name={props.name}
      render={(arrayHelpers) => (
        <>
          <div>
            {field.value &&
              field.value.map((item, index) => (
                <div
                  className="flex justify-start items-center cursor-move"
                  key={index}
                  onMouseDown={(e) =>
                    e.target.parentNode.setAttribute("draggable", "true")
                  }
                  onMouseUp={(e) =>
                    e.target.parentNode.setAttribute("draggable", "false")
                  }
                  onDrop={() => {
                    arrayHelpers.move(
                      field.value.indexOf(dragItem),
                      field.value.indexOf(item)
                    );
                  }}
                  onDragOver={(e) => onDragOver(e)}
                  onDragStart={(e) => onDragStart(e, item)}
                >
                  <img src={drag} alt="drag" className="mr-3" />

                  <div className="flex flex-col">
                    <label htmlFor={`${props.name}_${index}`}>
                      Detail <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...props}
                      id={`${props.name}_${index}`}
                      name={`${props.name}[${index}]`}
                      type="text"
                      className={`border rounded-md border-gray-400 w-[800px] h-9 focus:outline-none pl-3 ${
                        meta.touched && meta.error && meta.error[index]
                          ? `border-red-500`
                          : `border-gray-400`
                      }`}
                      value={field.value[index]?.detail}
                      onChange={(e) => {
                        const updatedValue = [...field.value];
                        updatedValue[index].detail = e.target.value;
                        helpers.setValue(updatedValue);
                        console.log("updateValue", updatedValue);
                      }}
                    />
                    {meta.touched && meta.error && meta.error[index] && (
                      <div className="text-red-500">
                        {meta.error[index].detail}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-red-500 text-sm ml-3 font-bold"
                    onClick={() =>
                      field.value.length > 1 ? arrayHelpers.remove(index) : item
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          <div className="w-[500px] h-[48px] mt-[20px] flex">
            <button
              type="button"
              className="mx-[40px] px-[24px] py-[12px] rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white "
              onClick={() => arrayHelpers.push({ detail: "" })}
            >
              + Add detail
            </button>
            <button
              type="reset"
              className="px-[24px] py-[12px] rounded-full  bg-red-500 text-white hover:bg-red-600 hover:text-white"
            >
              Reset
            </button>
          </div>
        </>
      )}
    />
  );
};

export default PackageDetails;
