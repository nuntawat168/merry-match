// import { useFormik, FormikProvider, FieldArray } from "formik";
// import * as Yup from "yup";
// import drag from "../assets/icon/drag.svg";
// import PreviewImage from "./PreviewImage";
// import { createClient } from "@supabase/supabase-js";
// import { useParams } from "react-router-dom";
// import usePackages from "../hooks/usePackages";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const AdminPackageForm = (props) => {
//   const { createPackage, updatePackage, deletePackage } = usePackages();
//   const { button, title, initialValues, remove } = props;
//   const params = useParams();

//   const validationSchema = Yup.object({
//     package_name: Yup.string().required("Required"),
//     package_price: Yup.number().required("Required"),
//     package_limit: Yup.number().required("Required"),
//     package_icon: Yup.mixed().required("Required"),
//     package_details: Yup.array().of(Yup.string().required("Required")),
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     alert(JSON.stringify(values, null, 2));
//     console.log("Formik value package icon", formik.values.package_icon);

//     // if (formik.values.package_icon.name) {
//     if (typeof formik.values.package_icon !== "string") {
//       const { data, error } = await supabase.storage
//         .from("Files")
//         .upload(
//           `public/${formik.values.package_icon.name
//             .split(".")
//             .join("-" + Date.now() + ".")}`,
//           formik.values.package_icon,
//           {
//             cacheControl: "3600",
//             upsert: false,
//           }
//         );

//       values = { ...values, package_icon: data.path };
//       console.log(values);
//     }

//     button === "Create" ? createPackage(values) : updatePackage(values);
//     resetForm();
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <FormikProvider value={formik}>
//       <form
//         onSubmit={formik.handleSubmit}
//         onReset={formik.handleReset}
//         className="w-screen h-screen"
//       >
//         <section className="w-full flex justify-between h-[10%] px-[60px] py-[16px] ">
//           <div className="flex flex-col justify-center font-bold text-2xl ">
//             {title}
//           </div>
//           <div className="flex">
//             <button
//               type="button"
//               className="flex flex-col justify-center px-[24px] py-[12px] mr-4 rounded-full bg-red-100 text-red-600 drop-shadow-md hover:bg-red-600 hover:text-white"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex flex-col justify-center px-[24px] py-[12px] rounded-full bg-red-500 text-white drop-shadow-md hover:bg-red-600 hover:text-white"
//             >
//               {button}
//             </button>
//           </div>
//         </section>

//         <section className="border border-gray-100 h-[90%] bg-gray-100 ">
//           <div className="border border-gray-300 mx-[60px] mt-[40px] mb-[242px w-[90%] h-auto flex bg-white rounded-xl">
//             <div className="w-[100%] h-[20% mx-[100px] mt-[40px] mb-[60px]">
//               <div className="flex flex-row justify-between">
//                 {/* Package Name */}
//                 <div className="flex flex-col w-[33%]">
//                   <label htmlFor="package_name">
//                     Package name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="package_name"
//                     name="package_name"
//                     type="text"
//                     className={`border w-72 rounded-md h-9 focus:outline-none pl-3 ${
//                       formik.touched.package_name && formik.errors.package_name
//                         ? `border-red-500`
//                         : `border-gray-400`
//                     }`}
//                     {...formik.getFieldProps("package_name")}
//                   />
//                   {formik.touched.package_name && formik.errors.package_name ? (
//                     <div className="text-red-500">
//                       {formik.errors.package_name}
//                     </div>
//                   ) : null}
//                 </div>

//                 {/* PackagePrice */}
//                 <div className="flex flex-col w-[33%]">
//                   <label htmlFor="package_price">
//                     Package price <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="package_price"
//                     name="package_price"
//                     type="number"
//                     className={`border w-72 rounded-md border-gray-400 h-9 focus:outline-none pl-3 ${
//                       formik.touched.package_price &&
//                       formik.errors.package_price
//                         ? `border-red-500`
//                         : `border-gray-400`
//                     }`}
//                     {...formik.getFieldProps("package_price")}
//                   />
//                   {formik.touched.package_price &&
//                   formik.errors.package_price ? (
//                     <div className="text-red-500">
//                       {formik.errors.package_price}
//                     </div>
//                   ) : null}
//                 </div>

//                 {/* MerryLimit */}
//                 <div className="merry-element flex flex-col w-[33%]">
//                   <label htmlFor="package_limit">
//                     Merry limit <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="package_limit"
//                     name="package_limit"
//                     type="number"
//                     className={`border w-72 rounded-md border-gray-400 h-9 focus:outline-none pl-3 ${
//                       formik.touched.package_limit &&
//                       formik.errors.package_limit
//                         ? `border-red-500`
//                         : `border-gray-400`
//                     }`}
//                     {...formik.getFieldProps("package_limit")}
//                   />
//                   {formik.touched.package_limit &&
//                   formik.errors.package_limit ? (
//                     <div className="text-red-500">
//                       {formik.errors.package_limit}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="mt-[20px] mb-[20px]">
//                 Icon <span className="text-red-500">*</span>
//               </div>

//               {/* Upload Icon */}

//               <div className="w-[100px]">
//                 <label htmlFor="upload">
//                   <div className="border w-[100px] m-0 h-[100px] flex flex-col justify-center items-center text-[30px] text-purple-600 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-300">
//                     + <div className="text-[15px]">Upload icon</div>
//                   </div>
//                 </label>
//               </div>
//               <input
//                 id="upload"
//                 type="file"
//                 name="package_icon"
//                 onChange={(e) => {
//                   formik.setFieldValue("package_icon", e.target.files[0]);
//                 }}
//                 hidden
//               />
//               {formik.touched.package_icon && formik.errors.package_icon && (
//                 <p className="text-red">{formik.errors.package_icon}</p>
//               )}
//               {formik.values.package_icon && (
//                 <PreviewImage file={formik.values.package_icon} />
//               )}

//               <hr className=" mt-[30px] border-gray-300 " />

//               {/* Package Details */}
//               <h1 className="mt-[20px] mb-[20px] text-gray-700">
//                 Package detail
//               </h1>

{
  /* <FieldArray
  name="package_details"
  render={(arrayHelpers) => (
    <>
      {formik.values.package_details.map((item, index) => (
        <div className="flex justify-start items-center" key={index}>
          <img src={drag} alt="drag" className="mr-3" />
          <div className="flex flex-col">
            <label htmlFor={`package_details_${index}`}>
              Detail <span className="text-red-500">*</span>
            </label>
            <input
              id={`package_details_${index}`}
              name={`package_details[${index}]`}
              type="text"
              className={`border rounded-md border-gray-400 w-[800px] h-9 focus:outline-none pl-3 ${
                formik.touched.package_details &&
                formik.errors.package_details &&
                formik.errors.package_details[index]
                  ? `border-red-500`
                  : `border-gray-400`
              }`}
              value={formik.values.package_details[index]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.package_details && formik.errors.package_details ? (
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

      <div className="w-[500px] h-[48px] mt-[20px] flex">
        <button
          type="button"
          className="mx-[40px] px-[24px] py-[12px] rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white "
          onClick={() => arrayHelpers.push("")}
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
/>; */
}
//             </div>
//           </div>
//           {params.id && (
//             <button
//               type="button"
//               className=" w-[90%] ml-[60px] text-right text-gray-700 px-[8x] py-[4px] mt-[10px]"
//               onClick={() => deletePackage(params.id)}
//             >
//               {remove}
//             </button>
//           )}
//         </section>
//       </form>
//     </FormikProvider>
//   );
// };

// export default AdminPackageForm;
