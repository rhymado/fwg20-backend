import { Router } from "express";

import {
  getSiswa,
  getDetailSiswa,
  createNewSiswa,
  registerNewSiswa,
  loginSiswa,
  setPwd,
  setImage,
  addNewSiswaWithCourse,
  setImageCloud,
} from "../handlers/siswa";
import { authorization } from "../middlewares/authorization";
import { singleCloudUploader, singleUploader } from "../middlewares/upload";

const siswaRouter = Router();

// CRUD
// /siswa
// memanfaatkan route query untuk data dinamis di akhir url
// ?key1=value1&key2=value2&...&keyN=valueN
siswaRouter.get("/", getSiswa);
// memanfaatkan route params untuk data dinamis di url
// /siswa/:nis
siswaRouter.get("/:nis", authorization(), getDetailSiswa);
// Menambah Siswa Baru
siswaRouter.post("/", createNewSiswa);
// Register Akun Siswa
siswaRouter.post("/new", registerNewSiswa);
// Login Akun Siswa
siswaRouter.post("/account", loginSiswa);
// Register Akun Siswa + Course
siswaRouter.post("/new/applicants", addNewSiswaWithCourse);
// Edit Pwd Siswa
siswaRouter.patch("/:nis/pwd", setPwd);
// Edit Image Siswa
siswaRouter.patch("/:nis/profile", singleUploader("profile"), setImage);
// Edit Image Siswa via Cloudinary
siswaRouter.patch("/:nis/profile/cloud", singleCloudUploader("profile"), setImageCloud);

export default siswaRouter;
