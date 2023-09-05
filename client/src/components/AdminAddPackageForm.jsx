import { useFormik } from "formik";
import plus from "../assets/icon/+.svg";
import drag from "../assets/icon/drag.svg";

export const AdminAddPackageForm = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.package_name) {
      errors.package_name = "Required";
    }
    if (!values.package_price) {
      errors.package_price = "Required";
    }

    if (!values.package_limit) {
      errors.package_limit = "Required";
    }

    if (!values.package_detail) {
      errors.package_detail = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      package_name: "",
      package_price: 0,
      package_limit: 0,
      package_icon: "",
      package_detail: "",
      created_by: null,
    },
    validate,

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="border border-gray-100 h-[90%] bg-gray-100 ">
      <form
        onSubmit={formik.handleSubmit}
        className="border border-gray-300 mx-[60px] mt-[40px] mb-[242px w-[90%] h-[500px] flex bg-white"
      >
        <div className="w-[100%] h-[20% mx-[100px] mt-[40px] mb-[60px] ">
          <div className="package-container flex flex-row justify-between">
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
                <div className="text-red-500">{formik.errors.package_name}</div>
              ) : null}
            </div>

            {/* PackagePrice */}
            <div className="package-element flex flex-col w-[33%]">
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
          <button className="w-[80px] h-[80px] mt-2 rounded-md flex flex-col justify-center items-center bg-gray-100">
            <img
              src={plus}
              alt="plus"
              className="w-[24px] h-[24px] decoration-purple-600"
            />
            <p className="text-[12px] text-purple-600 font-medium">
              Upload icon
            </p>
          </button>
          <hr className=" mt-[30px] border-gray-300 " />

          <h1 className="mt-[20px] mb-[20px] text-gray-700">Package detail</h1>
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
            <button className="mt-3 text-gray-500 text-sm ml-3">Delete</button>
          </div>
          <div className="w-[240px] h-[48px] mt-[20px]">
            <button
              type="submit"
              className="mx-[40px] px-[24px] py-[12px] rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
            >
              + Add detail
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
