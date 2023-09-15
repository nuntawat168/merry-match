import { useField } from "formik";
import PreviewImage from "../PreviewImage";

const UploadField = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      <div className="mt-[20px] mb-[20px]">
        Icon <span className="text-red-500">*</span>
      </div>
      <div className="w-[100px]">
        <label htmlFor={props.name}>
          <div className="border w-[100px] m-0 h-[100px] flex flex-col justify-center items-center text-[30px] text-purple-600 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-300">
            + <div className="text-[15px]">Upload icon</div>
          </div>
        </label>
      </div>
      <input id={props.name} {...props} />
      {meta.touched && meta.error && <p className="text-red">{meta.error}</p>}
      {field.value && <PreviewImage file={field.value} />}
    </>
  );
};

export default UploadField;
