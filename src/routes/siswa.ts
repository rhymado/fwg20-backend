import { Router } from "express";

import { getSiswa, getDetailSiswa, createNewSiswa } from "../handlers/siswa";

const siswaRouter = Router();

// CRUD
// /siswa
// memanfaatkan route query untuk data dinamis di akhir url
// ?key1=value1&key2=value2&...&keyN=valueN
siswaRouter.get("/", getSiswa);
// memanfaatkan route params untuk data dinamis di url
// /siswa/:nis
siswaRouter.get("/:nis", getDetailSiswa);
// Menambah Siswa Baru
siswaRouter.post("/", createNewSiswa);

export default siswaRouter;
