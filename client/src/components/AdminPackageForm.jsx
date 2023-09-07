import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import drag from "../assets/icon/drag.svg";
import PreviewImage from "./PreviewImage";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseUrl = "https://gacngpsoekbrifxahpkg.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhY25ncHNvZWticmlmeGFocGtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUzOTgxNCwiZXhwIjoyMDA5MTE1ODE0fQ.M_0nTcY0xZBzt1LKqDnYiwRccUceDAMbRnXChrJIfSQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AdminAddPackageForm = () => {
  const [files, setFiles] = useState(null);

  const formik = useFormik({
    initialValues: {
      package_name: "",
      package_price: 0,
      package_limit: 0,
      package_icon: "",
      package_details: [""],
      created_by: null,
    },
    validationSchema: Yup.object({
      package_name: Yup.string().required("Package name is required"),
      package_price: Yup.number().required("Package price is required"),
      package_limit: Yup.number().required("Merry limit is required"),
      package_icon: Yup.mixed().required("Package icon is required"),
      package_details: Yup.array().of(
        Yup.string().required("Package details is required")
      ),
    }),

    onSubmit: async (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));

      // const { data, error } = await supabase.storage
      //   .from("Files")
      //   .upload(`public/${files.name}`, files, {
      //     cacheControl: "3600",
      //     upsert: false,
      //   });

      const { data, error } = await supabase.storage
        .from("Files")
        .upload(
          `public/${files.name.split(".").join("-" + Date.now() + ".")}`,
          files,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      values = { ...values, package_icon: data.path };
      console.log(values);
      createPackage(values);
    },
  });

  const createPackage = async (values) => {
    console.log(values, "axios");
    try {
      await axios.post("http://localhost:4000/packages", values);
    } catch (error) {
      console.log("request error");
    }
  };
  return (
    <FormikProvider value={formik}>
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
          <div className="border border-gray-300 mx-[60px] mt-[40px] mb-[242px w-[90%] h-auto flex bg-white">
            <div className="w-[100%] h-[20% mx-[100px] mt-[40px] mb-[60px]">
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

              <div className="mt-[20px] mb-[20px]">
                Icon <span className="text-red-500">*</span>
              </div>

              {/* Upload icon */}

              <div className="w-[100px]">
                <label htmlFor="upload">
                  <div className="border w-[100px] m-0 h-[100px] flex flex-col justify-center items-center text-[30px] text-purple-600 bg-gray-100 rounded-xl cursor-pointer">
                    + <div className="text-[15px]">Upload icon</div>
                  </div>
                </label>
              </div>

              <input
                id="upload"
                type="file"
                name="package_icon"
                onChange={(e) => {
                  formik.setFieldValue("package_icon", e.target.files[0]);
                  setFiles(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
                hidden
              />
              {formik.errors.package_icon && (
                <p className="text-red">{formik.errors.package_icon}</p>
              )}
              {formik.values.package_icon && (
                <PreviewImage file={formik.values.package_icon} />
              )}

              <hr className=" mt-[30px] border-gray-300 " />

              <h1 className="mt-[20px] mb-[20px] text-gray-700">
                Package detail
              </h1>

              <FieldArray
                name="package_details"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.package_details.map((item, index) => (
                      <div
                        className="flex justify-start items-center"
                        key={index}
                      >
                        <img src={drag} alt="drag" className="mr-3" />
                        <div className="flex flex-col">
                          <label htmlFor={`package_details_${index}`}>
                            Detail <span className="text-red-500">*</span>
                          </label>
                          <input
                            id={`package_details_${index}`}
                            name={`package_details[${index}]`}
                            type="text"
                            className={`border rounded-md border-gray-400 w-[800px] h-9 focus:outline-none ${
                              formik.errors.package_details &&
                              formik.errors.package_details[index]
                                ? `border-red-500`
                                : `border-gray-400`
                            }`}
                            value={formik.values.package_details[index]}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.package_details ? (
                            <div className="text-red-500">
                              {formik.errors.package_details[index]}
                            </div>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className="mt-3 text-gray-500 text-sm ml-3"
                          onClick={() =>
                            formik.values.package_details.length > 1
                              ? arrayHelpers.remove(index)
                              : item
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))}

                    <div className="w-[240px] h-[48px] mt-[20px]">
                      <button
                        type="button"
                        className="mx-[40px] px-[24px] py-[12px] rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => arrayHelpers.push("")}
                      >
                        + Add detail
                      </button>
                    </div>
                  </>
                )}
              />
            </div>
          </div>
        </section>
      </form>
    </FormikProvider>
  );
};

export default AdminAddPackageForm;
