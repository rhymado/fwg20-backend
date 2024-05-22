import { ParamsDictionary } from 'express-serve-static-core';
import { ISiswaParams } from "./siswa";

export type AppParams = ParamsDictionary | ISiswaParams;
