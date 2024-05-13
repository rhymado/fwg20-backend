import { Request, Response, Router } from "express";

const siswaRouter = Router();

// CRUD
// /siswa
siswaRouter.get("/", (req: Request, res: Response) => {
  res.send("SISWA");
});

export default siswaRouter;
