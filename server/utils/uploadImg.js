// This code is in the file server/utils/upload.js

import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.picturesProfile) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "merry-match/user-picture-profile",
      type: "private",
    });
    fileUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }

  return fileUrl;
};

const cloudinarySingleUpload = async (filePicture) => {
  const result = await cloudinary.uploader.upload(filePicture.path, {
    folder: "merry-match/user-picture-profile",
    type: "private",
  });
  await fs.unlink(filePicture.path);
  return { url: result.secure_url, publicId: result.public_id };
};

const cloudinarySingleDelete = async (picture) => {
  const public_id = picture.publicId;
  const result = await cloudinary.uploader.destroy(public_id, {
    type: "private",
  });
  return result.result;
};

export { cloudinaryUpload, cloudinarySingleUpload, cloudinarySingleDelete };
