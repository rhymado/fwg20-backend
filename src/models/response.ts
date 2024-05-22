import { IDataSiswa } from "./siswa";

export interface IBasicResponse {
  msg: string;
  data?: any[];
  err?: string;
}

export interface ISiswaResponse extends IBasicResponse {
  data?: IDataSiswa[];
}

export interface IAuthResponse extends IBasicResponse {
  data?: { token: string }[];
}
