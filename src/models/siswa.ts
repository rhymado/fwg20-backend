import { IApplicantsBody } from "./applicants";

export interface ISiswaParams {
  nis: string;
}

export interface ISiswaQuery {
  name?: string;
  page?: string;
  limit?: string;
}

export interface ISiswaBody {
  name: string;
  age: number;
  address: string;
}

export interface IDataSiswa extends ISiswaBody {
  nis: string;
  created_at?: string;
  updated_at?: string | null;
  img?: string | null;
  id?: number;
}

export interface ISiswaRegisterBody extends ISiswaBody {
  pwd: string;
}

export interface ISiswaLoginBody {
  nis: string;
  pwd: string;
}

export interface ISiswaWithCourseBody extends IApplicantsBody, ISiswaRegisterBody {}

// export const columnName = {
//   siswaName: "siswa_name",
//   alamatDomisili: "alamat_domisili",
// };
