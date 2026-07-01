import { Address } from "./address.type";

export interface User {
  id: number;
  email: string;
  fullName: string;
  password: string;
  isVerify: boolean;
  role: Role;
  createdAt: Date;
  isDelete: boolean;
  token: string;
  tokenExpiresIn: Date;
  addresses: Address[];
  updatedAt: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
