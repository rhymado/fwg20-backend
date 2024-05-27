import { Request, Response } from "express-serve-static-core";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

import {
  getAllSiswa,
  getOneSiswa,
  createSiswa,
  registerSiswa,
  getPwdSiswa,
  setPwdSiswa,
} from "../repositories/siswa";
import { ISiswaBody, ISiswaLoginBody, ISiswaQuery, ISiswaRegisterBody } from "../models/siswa";
import { IAuthResponse, ISiswaResponse } from "../models/response";
import { IPayload } from "../models/payload";
import { jwtOptions } from "../middlewares/authorization";

export const getSiswa = async (
  req: Request<{}, {}, {}, ISiswaQuery>,
  res: Response<ISiswaResponse>
) => {
  try {
    const { name } = req.query;
    const result = await getAllSiswa(name);
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Siswa tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const getDetailSiswa = async (req: Request, res: Response<ISiswaResponse>) => {
  // const { nis } = req.params;
  const { nis } = req.userPayload as IPayload;
  try {
    const result = await getOneSiswa(nis as string);
    // error handling ketika data kosong
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Siswa tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const createNewSiswa = async (
  req: Request<{}, {}, ISiswaBody>,
  res: Response<ISiswaResponse>
) => {
  try {
    const result = await createSiswa(req.body);
    return res.status(201).json({
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

export const registerNewSiswa = async (
  req: Request<{}, {}, ISiswaRegisterBody>,
  res: Response<ISiswaResponse>
) => {
  const { pwd } = req.body;
  try {
    // membuat hashed password
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pwd, salt);
    // menyimpan kedalam db
    const result = await registerSiswa(req.body, hashed);
    return res.status(201).json({
      msg: "Success",
      data: result.rows,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

// Authentication
export const loginSiswa = async (
  req: Request<{}, {}, ISiswaLoginBody>,
  res: Response<IAuthResponse>
) => {
  const { nis, pwd } = req.body;
  try {
    // siswa login menggunakan nis
    const result = await getPwdSiswa(nis);
    // handling jika password tidak ditemukan
    if (!result.rows.length) throw new Error("Siswa tidak ditemukan");
    const { pwd: hash, name } = result.rows[0];
    // mengecek apakah password sama
    const isPwdValid = await bcrypt.compare(pwd, hash);
    // handling jika password salah
    if (!isPwdValid) throw new Error("Login gagal");
    // jika pwd benar, buatkan token
    const payload: IPayload = {
      nis, // nis: nis
    };
    const token = jwt.sign(payload, <string>process.env.JWT_SECRET, jwtOptions);
    return res.status(200).json({
      msg: `Selamat datang, ${name}!`,
      data: [{ token }],
    });
  } catch (error) {
    if (error instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(error.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "Siswa tidak ditemukan",
        });
      }
      return res.status(401).json({
        msg: "Error",
        err: error.message,
      });
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};

// Tambah password ke siswa yg belum ada password
export const setPwd = async (
  req: Request<{ nis: string }, {}, { pwd: string }>,
  res: Response<ISiswaResponse>
) => {
  const { pwd } = req.body;
  const { nis } = req.params;
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pwd, salt);
    await setPwdSiswa(hashed, nis);
    res.status(200).json({
      msg: "Berhasil diubah",
    });
  } catch (error) {
    if (error instanceof Error) {
      if (/(invalid(.)+uuid(.)+)/g.test(error.message)) {
        return res.status(401).json({
          msg: "Error",
          err: "Siswa tidak ditemukan",
        });
      }
      console.log(error.message);
    }
    return res.status(500).json({
      msg: "Error",
      err: "Internal Server Error",
    });
  }
};
