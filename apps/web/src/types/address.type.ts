import { User } from "./user.type";

export interface Address {
  id: number;
  userId: number;
  user: User;
  recipientName: string;
  phone: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  districtName: string;
  postalCode: string;
  detail: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
