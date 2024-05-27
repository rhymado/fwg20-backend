import { ParamsDictionary } from "express-serve-static-core";
import { ISiswaParams, ISiswaQuery } from "./siswa";

export type AppParams = ParamsDictionary | ISiswaParams;
export type QueryParams = ISiswaQuery;
