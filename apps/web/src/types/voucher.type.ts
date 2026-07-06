import type {
  DiscountType,
} from "./discount.type";

// ======================================================
// ENUMS
// ======================================================

export enum VoucherStatus {
  ACTIVE = "ACTIVE",

  INACTIVE = "INACTIVE",
}

// ======================================================
// VOUCHER
// ======================================================

export interface Voucher {
  id: number;

  code: string;

  type: DiscountType;

  value: number;

  minPurchase: number | null;

  maxDiscount: number | null;

  quota: number | null;

  usedCount: number;

  status: VoucherStatus;

  validFrom: string | null;

  validUntil: string | null;

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// VOUCHER REDEMPTION
// ======================================================

export interface VoucherRedemption {
  id: number;

  voucherId: number;

  userId: number;

  orderId: number;

  redeemedAt: string;

  voucher?: Voucher;
}