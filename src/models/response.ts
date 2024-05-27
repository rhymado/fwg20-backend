import { IDataSiswa } from "./siswa";

interface IPaginationMeta {
  totalData?: number;
  totalPage?: number;
  page: number;
  prevLink: string | null;
  nextLink: string | null;
}

interface IBasicResponse {
  msg: string;
  data?: any[];
  err?: string;
  meta?: IPaginationMeta;
}

export interface ISiswaResponse extends IBasicResponse {
  data?: IDataSiswa[];
}

export interface IAuthResponse extends IBasicResponse {
  data?: { token: string }[];
}
