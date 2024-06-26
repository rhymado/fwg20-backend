import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
// import path from "path";

// load env ke project
// console.log(process.env.NODE_ENV);
// let path = "./.env.production";
// console.log(process.env.APP_ENV == "production");
// if (process.env.APP_ENV == "production") path = "./.env.production";
// console.log(path);
dotenv.config();

import router from "./src/routes";
import getLink from "./src/helpers/getLink";

// buat aplikasi express
const app = express();
// pasang parser untuk JSON dan form encode
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
const logger = morgan("dev");
app.use(logger);

// cors
const configs: CorsOptions = {
  origin: ["http://localhost:8080", "http://127.0.0.1:5500"],
  methods: ["POST", "PATCH"],
  allowedHeaders: ["Authorization", "x-headers", "content-type"],
};
app.use(cors(configs));

// untuk mengakses static file
app.use(express.static("./public"));

// buat handler untuk rute api
// app.METHOD
// url
// protocol://host:port/endpoint
// handler/middleware
// fungsi yg memiliki 3 parameter, request, response, next
// 1. fungsi anonim
// 2. fungsi bernama => dianjurkan untuk memudahkan testing
app.get("/test/base/url/:a", (req: Request, res: Response) => {
  res.json({
    link: getLink(req, "previous"),
    path: req.path,
  });
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

export default app;
