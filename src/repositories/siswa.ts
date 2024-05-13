import { QueryResult } from "pg";

import db from "../configs/pg";
import { dataSiswa } from "../models/siswa";

export const getAllSiswa = (): Promise<QueryResult<dataSiswa>> => {
  const query = `select * from siswa`;
  return db.query(query);
};
