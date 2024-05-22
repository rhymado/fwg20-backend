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
  id: number;
  nis: string;
  created_at: string;
  updated_at: string | null;
}

// export const columnName = {
//   siswaName: "siswa_name",
//   alamatDomisili: "alamat_domisili",
// };
