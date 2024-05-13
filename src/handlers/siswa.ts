import { Request, Response } from "express-serve-static-core";

import { getAllSiswa } from "../repositories/siswa";

export const getSiswa = async (req: Request, res: Response) => {
  try {
    const result = await getAllSiswa();
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
