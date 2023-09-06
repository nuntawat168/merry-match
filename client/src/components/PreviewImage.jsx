import { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div>
      <img
        className="w-[60px] h-[50px] rounded-md"
        src={preview}
        alt="previewImage"
      />
    </div>
  );
};

export default PreviewImage;
