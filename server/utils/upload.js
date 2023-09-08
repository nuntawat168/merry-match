import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (file) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "merry-match",
    type: "private",
  });
  await fs.unlink(file.path);

  return result;
};

export { cloudinaryUpload };
