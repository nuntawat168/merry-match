import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const PreviewImage = ({ file, page }) => {
  const [preview, setPreview] = useState("");

  const formik = useFormikContext();

  useEffect(() => {
    if (typeof file === "string") {
      setPreview(
        `https://gacngpsoekbrifxahpkg.supabase.co/storage/v1/object/public/Files/${file}`
      );
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }, [file]);

  return page === "AddEditPackage" ? (
    <div className="relative border rounded-xl w-[100px] bg-gray-100">
      <img
        className="w-[100px] h-[100px] rounded-md "
        src={preview}
        alt="previewImage"
      />
      <button
        onClick={() => formik.setFieldValue("package_icon", null)}
        className="border rounded-full w-[30px] h-[30px] flex justify-center items-center absolute bottom-20 left-20 bg-red-600 text-white"
      >
        x
      </button>
    </div>
  ) : (
    <div className="relative rounded-md w-[50px]">
      <img
        className="w-[80px] h-[80px] rounded-md "
        src={preview}
        alt="previewImage"
      />
    </div>
  );
};

export default PreviewImage;
