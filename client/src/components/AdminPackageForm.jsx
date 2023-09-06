import { useFormik } from "formik";
import * as Yup from "yup";
// import plus from "../assets/icon/+.svg";
import drag from "../assets/icon/drag.svg";
import PreviewImage from "./PreviewImage";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = "https://gacngpsoekbrifxahpkg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhY25ncHNvZWticmlmeGFocGtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUzOTgxNCwiZXhwIjoyMDA5MTE1ODE0fQ.M_0nTcY0xZBzt1LKqDnYiwRccUceDAMbRnXChrJIfSQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AdminAddPackageForm = () => {
  const [files, setFiles] = useState(null);

  const formik = useFormik({
    initialValues: {
      package_name: "",
      package_price: 0,
      package_limit: 0,
      package_icon: "",
      package_detail: "",
      created_by: null,
    },
    validationSchema: Yup.object({
      package_name: Yup.string().required("Package name is required"),
      package_price: Yup.number().required("Package price is required"),
      package_limit: Yup.number().required("Merry limit is required"),
      package_icon: Yup.mixed().required("Package icon is required"),
      package_detail: Yup.string().required("Package detail is required"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));

      const { data, error } = await supabase.storage
        .from("Files")
        .upload(`public/${files.name}`, files, {
          cacheControl: "3600",
          upsert: false,
        });
      console.log(data, "This");
      values = { ...values, package_icon: data.path };
      console.log(values);
      createPackage(values);

      // const { package_icon } = formik.values;
      // const formData = new FormData();
      // formData.append("file", package_icon);
      // formData.append("upload_preset", package_icon);
    },
  });

  const createPackage = async (values) => {
    try {
      await axios.post("http://localhost:4000/packages", values);
    } catch (error) {
      console.log("request error");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-screen h-screen">
      <section className="w-full flex justify-between h-[10%] px-[60px] py-[16px] ">
        <div className="flex flex-col justify-center font-bold text-2xl ">
          Add Package
        </div>
        <div className="flex">
          <button
            type="button"
            className="flex flex-col justify-center px-[24px] py-[12px] mr-4 rounded-full bg-red-100 text-red-600 drop-shadow-md hover:bg-red-600 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex flex-col justify-center px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white"
          >
            Create
          </button>
        </div>
      </section>
      <section className="border border-gray-100 h-[90%] bg-gray-100 ">
        <div className="border border-gray-300 mx-[60px] mt-[40px] mb-[242px w-[90%] h-[550px] flex bg-white">
          <div className="w-[100%] h-[20% mx-[100px] mt-[40px] mb-[60px] ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-[33%]">
                <label htmlFor="package_name">
                  Package name <span className="text-red-500">*</span>
                </label>
                <input
                  id="package_name"
                  name="package_name"
                  type="text"
                  className={`border w-72 rounded-md h-9 focus:outline-none ${
                    formik.errors.package_name
                      ? `border-red-500`
                      : `border-gray-400`
                  }`}
                  value={formik.values.package_name}
                  onChange={formik.handleChange}
                />
                {formik.errors.package_name ? (
                  <div className="text-red-500">
                    {formik.errors.package_name}
                  </div>
                ) : null}
              </div>

              {/* PackagePrice */}
              <div className="flex flex-col w-[33%]">
                <label htmlFor="package_price">
                  Package price <span className="text-red-500">*</span>
                </label>
                <input
                  id="package_price"
                  name="package_price"
                  type="number"
                  className={`border w-72 rounded-md border-gray-400 h-9 focus:outline-none ${
                    formik.errors.package_price
                      ? `border-red-500`
                      : `border-gray-400`
                  }`}
                  value={formik.values.package_price}
                  onChange={formik.handleChange}
                />
                {formik.errors.package_price ? (
                  <div className="text-red-500">
                    {formik.errors.package_price}
                  </div>
                ) : null}
              </div>

              {/* MerryLimit */}
              <div className="merry-element flex flex-col w-[33%]">
                <label htmlFor="package_limit">
                  Merry limit <span className="text-red-500">*</span>
                </label>
                <input
                  id="package_limit"
                  name="package_limit"
                  type="number"
                  className={`border w-72 rounded-md border-gray-400 h-9 focus:outline-none ${
                    formik.errors.package_limit
                      ? `border-red-500`
                      : `border-gray-400`
                  }`}
                  value={formik.values.package_limit}
                  onChange={formik.handleChange}
                />
                {formik.errors.package_limit ? (
                  <div className="text-red-500">
                    {formik.errors.package_limit}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-[20px]">
              Icon <span className="text-red-500">*</span>
            </div>

            {/* Upload icon */}
            <input
              id="upload"
              type="file"
              name="package_icon"
              onChange={(e) => {
                formik.setFieldValue("package_icon", e.target.files[0]);
                setFiles(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
            {formik.errors.package_icon && (
              <p className="text-red">{formik.errors.package_icon}</p>
            )}
            {formik.values.package_icon && (
              <PreviewImage file={formik.values.package_icon} />
            )}
            {/* <button className="w-[80px] h-[80px] mt-2 rounded-md flex flex-col justify-center items-center bg-gray-100">
            <img
              src={plus}
              alt="plus"
              className="w-[24px] h-[24px] decoration-purple-600"
            />
            <p className="text-[12px] text-purple-600 font-medium">
              Upload icon
            </p>
          </button> */}
            <hr className=" mt-[30px] border-gray-300 " />

            <h1 className="mt-[20px] mb-[20px] text-gray-700">
              Package detail
            </h1>
            <div className="flex justify-start items-center">
              <img src={drag} alt="drag" className="mr-3" />
              <div className="flex flex-col">
                <label htmlFor="package_detail">
                  Detail <span className="text-red-500">*</span>
                </label>
                <input
                  id="package_detail"
                  name="package_detail"
                  type="text"
                  className={`border rounded-md border-gray-400 w-[800px] h-9 focus:outline-none ${
                    formik.errors.package_detail
                      ? `border-red-500`
                      : `border-gray-400`
                  }`}
                  value={formik.values.package_detail}
                  onChange={formik.handleChange}
                />
                {formik.errors.package_detail ? (
                  <div className="text-red-500">
                    {formik.errors.package_detail}
                  </div>
                ) : null}
              </div>
              <button type="button" className="mt-3 text-gray-500 text-sm ml-3">
                Delete
              </button>
            </div>
            <div className="w-[240px] h-[48px] mt-[20px]">
              <button
                type="button"
                className="mx-[40px] px-[24px] py-[12px] rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
              >
                + Add detail
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default AdminAddPackageForm;
