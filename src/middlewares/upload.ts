import { RequestHandler } from "express-serve-static-core";
import multer, { Field, Options, diskStorage } from "multer";
import path from "path";
import { AppParams } from "../models/params";

const multerDisk = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/imgs");
  },
  filename: (req, file, cb) => {
    // misal: image-timestamp.{jpg|png|jpeg}
    const extName = path.extname(file.originalname);
    const newFileName = `image-${Date.now()}${extName}`;
    cb(null, newFileName);
  },
});

const multerOptions: Options = {
  storage: multerDisk,
  limits: {
    fileSize: 1e6, // 1000000
  },
  fileFilter: (req, file, cb) => {
    // const allowedExt = ["jpg", "png", "jpeg"];
    const allowedExtRe = /jpg|png|jpeg/gi;
    const extName = path.extname(file.originalname);
    // if (!allowedExt.includes(extName.toLowerCase())) return cb(null, false);
    if (!allowedExtRe.test(extName)) return cb(new Error("Incorrect File"));
    cb(null, true);
  },
};

const uploader = multer(multerOptions);

export const singleUploader = (fieldName: string) => uploader.single(fieldName) as RequestHandler<AppParams>;
export const multiUploader = (fieldName: string, maxCount: number) => uploader.array(fieldName, maxCount);
export const multiFieldUploader = (fieldConfig: Field[]) => uploader.fields(fieldConfig);
