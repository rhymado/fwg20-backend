import { JwtPayload } from "jsonwebtoken";
export interface IPayload extends JwtPayload {
  // jangan masukkan data sensitif
  nis?: string;
  //   name: string;
  //   age: number;
  //   address: string;
  role?: string;
}
