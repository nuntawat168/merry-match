import { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState("");

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div className="relative border rounded-md w-[50px]">
      <img
        className="w-[60px] h-[50px] rounded-md "
        src={preview}
        alt="previewImage"
      />
      <button className="border rounded-full w-[20px] h-[20px] flex justify-center items-center absolute top-0 left-10 bg-red-600 text-white">
        x
      </button>
    </div>
  );
};

export default PreviewImage;
