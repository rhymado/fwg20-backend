import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt, { SignOptions } from "jsonwebtoken";

import { AppParams } from "../models/params";
import { IAuthResponse } from "../models/response";
import { IPayload } from "../models/payload";

export const jwtOptions: SignOptions = {
  expiresIn: "6m", // token akan hangus dalam 5 menit
  issuer: process.env.JWT_ISSUER,
};

export const authorization =
  (role?: string[]) =>
  (req: Request<AppParams>, res: Response<IAuthResponse>, next: NextFunction) => {
    // cek jwt
    // ambil jwt dari header
    const bearerToken = req.header("Authorization");
    //   handle jika tanpa token
    if (!bearerToken) {
      return res.status(403).json({
        msg: "Forbidden",
        err: "Akses tidak diperbolehkan",
      });
    }
    const token = bearerToken.split(" ")[1];
    // verifikasi token
    jwt.verify(token, <string>process.env.JWT_SECRET, jwtOptions, (err, payload) => {
      // kalo tidak valid, ditolak
      if (err) {
        return res.status(403).json({
          msg: err.message,
          err: err.name,
        });
      }
      // pengecekan role
      if (role) {
        if (!role.includes((payload as IPayload).role as string)) {
          return res.status(403).json({
            msg: "Forbidden",
            err: "Akses tidak diperbolehkan",
          });
        }
      }
      // kalo valid, lanjut
      req.userPayload = payload;
      next();
    });
  };
