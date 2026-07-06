// ======================================================
// ENUMS
// ======================================================

export enum PaymentStatus {
  PENDING = "PENDING",

  SUCCESS = "SUCCESS",

  FAILED = "FAILED",

  EXPIRED = "EXPIRED",
}

// ======================================================
// PAYMENT
// ======================================================

export interface Payment {
  id: number;

  orderId: number;

  provider: string;

  method: string | null;

  status: PaymentStatus;

  amount: number;

  token: string | null;

  redirectUrl: string | null;

  transactionId: string | null;

  expiredAt: string;

  paidAt: string | null;

  rawPayload: unknown | null;

  createdAt: string;

  updatedAt: string;
}