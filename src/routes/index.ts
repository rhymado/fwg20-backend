import { Router } from "express";

import siswaRouter from "./siswa";
import courseRouter from "./course";
import applicantRouter from "./applicant";

const mainRouter = Router();

mainRouter.use("/siswa", siswaRouter);
mainRouter.use("/course", courseRouter);
mainRouter.use("/apply", applicantRouter);

export default mainRouter;
