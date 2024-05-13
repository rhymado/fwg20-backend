import { QueryResult } from "pg";

import db from "../configs/pg";
import { IdataSiswa, IsiswaBody } from "../models/siswa";

export const getAllSiswa = (name?: string): Promise<QueryResult<IdataSiswa>> => {
  let query = `select * from siswa`;
  const values = [];
  if (name) {
    query += " where name ilike $1";
    values.push(`%${name}%`);
  }
  return db.query(query, values);
};

export const getOneSiswa = (nis: string): Promise<QueryResult<IdataSiswa>> => {
  // 1. literals => resiko SQL injection
  // "" OR 1=1
  // 2. parameterized query
  const query = `select * from siswa where nis=$1`;
  const values = [nis];
  return db.query(query, values);
};

export const createSiswa = (body: IsiswaBody): Promise<QueryResult<IdataSiswa>> => {
  const query = `insert into siswa (name, age, address)
  values ($1,$2,$3)
  returning *`;
  const { name, age, address } = body;
  const values = [name, age, address];
  return db.query(query, values);
};
