import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || "MeetPoint";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";

// declare my own cloudinary options interface because of
// https://github.com/affanshahid/multer-storage-cloudinary/issues/34
declare interface cloudinaryOptions extends Options {
  params: {
    folder: string;
    allowedFormats: string[];
  };
}

const multerOptions: cloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: CLOUDINARY_FOLDER,
    allowedFormats: ["png", "jpg", "jpeg"],
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage(multerOptions);

export { cloudinary, storage };
