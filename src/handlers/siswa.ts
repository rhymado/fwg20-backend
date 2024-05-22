import { Request, Response } from "express-serve-static-core";
import bcrypt from "bcrypt";

import {
  getAllSiswa,
  getOneSiswa,
  createSiswa,
  registerSiswa,
  getPwdSiswa,
} from "../repositories/siswa";
import {
  IsiswaBody,
  IsiswaLoginBody,
  IsiswaParams,
  IsiswaQuery,
  IsiswaRegisterBody,
} from "../models/siswa";

export const getSiswa = async (req: Request<{}, {}, {}, IsiswaQuery>, res: Response) => {
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
      msg: "Succes",
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

export const getDetailSiswa = async (req: Request<IsiswaParams>, res: Response) => {
  const { nis } = req.params;
  try {
    const result = await getOneSiswa(nis);
    // error handling ketika data kosong
    if (result.rows.length === 0) {
      return res.status(404).json({
        msg: "Siswa tidak ditemukan",
        data: [],
      });
    }
    return res.status(200).json({
      msg: "Succes",
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

export const createNewSiswa = async (req: Request<{}, {}, IsiswaBody>, res: Response) => {
  try {
    const result = await createSiswa(req.body);
    return res.status(201).json({
      message: "success",
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
  req: Request<{}, {}, IsiswaRegisterBody>,
  res: Response<{ msg: string; data?: any[]; err?: string }>
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

export const loginSiswa = async (
  req: Request<{}, {}, IsiswaLoginBody>,
  res: Response<{ msg: string; data?: any[]; err?: string }>
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
    return res.status(200).json({
      msg: `Selamat datang, ${name}!`,
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
