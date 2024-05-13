import { Router } from "express";

import { getSiswa } from "../handlers/siswa";

const siswaRouter = Router();

// CRUD
// /siswa
siswaRouter.get("/", getSiswa);

export default siswaRouter;
