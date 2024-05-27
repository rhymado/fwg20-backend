import { Router } from "express";

import {
  getSiswa,
  getDetailSiswa,
  createNewSiswa,
  registerNewSiswa,
  loginSiswa,
  setPwd,
} from "../handlers/siswa";
import { authorization } from "../middlewares/authorization";

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
// Edit Pwd Siswa
siswaRouter.patch("/:nis/pwd", setPwd);

export default siswaRouter;
