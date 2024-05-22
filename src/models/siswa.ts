export interface IsiswaParams {
  nis: string;
}

export interface IsiswaQuery {
  name?: string;
}

export interface IsiswaBody {
  name: string;
  age: number;
  address: string;
}

export interface IdataSiswa extends IsiswaBody {
  nis: string;
  created_at?: string;
  updated_at?: string | null;
}

export interface IsiswaRegisterBody extends IsiswaBody {
  pwd: string;
}

export interface IsiswaLoginBody {
  nis: string;
  pwd: string;
}

// export const columnName = {
//   siswaName: "siswa_name",
//   alamatDomisili: "alamat_domisili",
// };
