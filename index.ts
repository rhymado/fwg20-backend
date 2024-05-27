import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";

// load env ke project
dotenv.config();

import router from "./src/routes";

// buat aplikasi express
const app = express();
// pasang parser untuk JSON dan form encode
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
const logger = morgan("dev");
app.use(logger);

// buat handler untuk rute api
// app.METHOD
// url
// protocol://host:port/endpoint
// handler/middleware
// fungsi yg memiliki 3 parameter, request, response, next
// 1. fungsi anonim
// 2. fungsi bernama => dianjurkan untuk memudahkan testing
app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});
// http://localhost:8000/

// pasang router ke app
app.use(router);

// pasangkan port ke express
// port bisa dideklarasikan atau mendapatkan nilai dari environment
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
