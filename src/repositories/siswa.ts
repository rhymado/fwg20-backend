import { QueryResult } from "pg";

import db from "../configs/pg";
import { IDataSiswa, ISiswaBody, ISiswaQuery } from "../models/siswa";

export const getAllSiswa = ({ name, page, limit }: ISiswaQuery): Promise<QueryResult<IDataSiswa>> => {
  let query = `select * from siswa`;
  const values = [];
  if (name) {
    query += " where name ilike $1";
    values.push(`%${name}%`);
  }
  query += " order by id asc";
  if (page && limit) {
    const pageLimit = parseInt(limit);
    const offset = (parseInt(page) - 1) * pageLimit;
    query += ` limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(pageLimit, offset);
  }
  return db.query(query, values);
};

export const getOneSiswa = (nis: string): Promise<QueryResult<IDataSiswa>> => {
  // 1. literals => resiko SQL injection
  // "" OR 1=1
  // 2. parameterized query
  const query = `select nis, name, age, address, created_at, updated_at from siswa where nis=$1`;
  const values = [nis];
  return db.query(query, values);
};

export const createSiswa = (body: ISiswaBody): Promise<QueryResult<IDataSiswa>> => {
  const query = `insert into siswa (name, age, address)
  values ($1,$2,$3)
  returning *`;
  const { name, age, address } = body;
  const values = [name, age, address];
  return db.query(query, values);
};

export const registerSiswa = (body: ISiswaBody, hashedPassword: string): Promise<QueryResult<IDataSiswa>> => {
  const query = `insert into siswa (name, age, address, pwd)
  values ($1,$2,$3,$4)
  returning nis, name, age, address`;
  const { name, age, address } = body;
  const values = [name, age, address, hashedPassword];
  return db.query(query, values);
};

export const getPwdSiswa = (nis: string): Promise<QueryResult<{ name: string; pwd: string }>> => {
  const query = `select name, pwd from siswa where nis = $1`;
  const values = [nis];
  return db.query(query, values);
};

export const setPwdSiswa = (hashedPwd: string, nis: string): Promise<QueryResult<{}>> => {
  const query = `update siswa set pwd=$1, updated_at=now() where nis=$2`;
  const values = [hashedPwd, nis];
  return db.query(query, values);
};

export const getTotalSiswa = ({ name }: ISiswaQuery): Promise<QueryResult<{ total_siswa: string }>> => {
  let query = 'select count(*) as "total_siswa" from siswa';
  const values = [];
  if (name) {
    query += " where name ilike $1";
    values.push(`%${name}%`);
  }
  return db.query(query, values);
};

export const setImageSiswa = (nis: string, imgUrl?: string): Promise<QueryResult<IDataSiswa>> => {
  const query = `update siswa set image=$1 where nis=$2 returning nis, image`;
  const values: (string | null)[] = [];
  if (imgUrl) values.push(`/imgs/${imgUrl}`);
  if (!imgUrl) values.push(null);
  values.push(nis);
  return db.query(query, values);
};
