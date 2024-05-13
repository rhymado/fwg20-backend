import { Request, Response } from "express-serve-static-core";

import { getAllSiswa, getOneSiswa, createSiswa } from "../repositories/siswa";
import { IsiswaBody, IsiswaParams, IsiswaQuery } from "../models/siswa";

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
