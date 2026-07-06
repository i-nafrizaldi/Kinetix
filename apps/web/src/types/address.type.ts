export interface Address {
  id: number;

  userId: number;

  label: string | null;

  recipientName: string;

  phone: string;

  provinceId: string | null;

  provinceName: string;

  cityId: string | null;

  cityName: string;

  districtName: string | null;

  postalCode: string | null;

  detail: string;

  isDefault: boolean;

  createdAt: string;

  updatedAt: string;
}
