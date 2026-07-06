import type { Address } from "./address.type";

// ======================================================
// ENUMS
// ======================================================

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

// ======================================================
// USER
// ======================================================

export interface User {
  id: number;

  email: string;

  fullName: string | null;

  isVerify: boolean;

  role: Role;

  status: UserStatus;

  createdAt: string;

  updatedAt: string;

  addresses?: Address[];
}

// ======================================================
// AUTH USER
// ======================================================

// export interface AuthUser {
//   id: number;

//   email: string;

//   fullName: string | null;

//   isVerify: boolean;

//   role: Role;

//   status: UserStatus;
// }

// // ======================================================
// // LOGIN RESPONSE
// // ======================================================

// export interface LoginResponse {
//   message: string;

//   data: AuthUser;

//   token: string;
// }

// // ======================================================
// // REGISTER RESPONSE
// // ======================================================

// export interface RegisterResponse {
//   message: string;

//   data: AuthUser;
// }
