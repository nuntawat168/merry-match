import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import drag from "../assets/icon/drag.svg";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";
import usePackages from "../hooks/usePackages";
import InputField from "./admin_packages/inputField";
import UploadField from "./admin_packages/UploadField";
import PackageDetails from "./admin_packages/PackageDetails";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AdminPackageForm = (props) => {
  const { createPackage, updatePackage, deletePackage } = usePackages();
  const { button, title, initialValues, remove } = props;
  const params = useParams();

  const validationSchema = Yup.object({
    package_name: Yup.string().required("Required"),
    package_price: Yup.number().required("Required"),
    package_limit: Yup.number().required("Required"),
    package_icon: Yup.mixed().required("Required"),
    package_details: Yup.array().of(Yup.object()),
  });

  const onSubmit = async (values, { resetForm }) => {
    alert(JSON.stringify(values, null, 2));
    console.log("Formik value package icon", formik.values.package_icon);

    // if (formik.values.package_icon.name) {
    if (typeof formik.values.package_icon !== "string") {
      const { data, error } = await supabase.storage
        .from("Files")
        .upload(
          `public/${formik.values.package_icon.name
            .split(".")
            .join("-" + Date.now() + ".")}`,
          formik.values.package_icon,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      values = { ...values, package_icon: data.path };
    }
    console.log("values", values);
    button === "Create" ? createPackage(values) : updatePackage(values);
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="w-screen h-screen"
      >
        <section className="w-full flex justify-between h-[10%] px-[60px] py-[16px] ">
          <div className="flex flex-col justify-center font-bold text-2xl ">
            {title}
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
              {button}
            </button>
          </div>
        </section>

        <section className="border border-gray-100 h-[90%] bg-gray-100 ">
          <div className="border border-gray-300 mx-[60px] mt-[40px] mb-[242px w-[90%] h-auto flex bg-white rounded-xl">
            <div className="w-[100%] h-[20% mx-[100px] mt-[40px] mb-[60px]">
              <div className="flex flex-row justify-between">
                <InputField
                  name="package_name"
                  type="text"
                  title="Package Name"
                />
                <InputField
                  name="package_price"
                  type="number"
                  title="Package Price"
                />
                <InputField
                  name="package_limit"
                  type="number"
                  title="Merry Limit"
                />
              </div>

              {/* Upload Icon */}

              <UploadField
                type="file"
                name="package_icon"
                onChange={(e) => {
                  formik.setFieldValue("package_icon", e.target.files[0]);
                }}
                hidden
              />

              <hr className=" mt-[30px] border-gray-300 " />

              {/* Package Details */}
              <h1 className="mt-[20px] mb-[20px] text-gray-700">
                Package detail
              </h1>

              <PackageDetails
                name="package_details"
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {params.id && (
            <button
              type="button"
              className=" w-[90%] ml-[60px] text-right text-gray-700 px-[8x] py-[4px] mt-[10px]"
              onClick={() => deletePackage(params.id)}
            >
              {remove}
            </button>
          )}
        </section>
      </form>
    </FormikProvider>
  );
};

export default AdminPackageForm;
