// ======================================================
// ENUMS
// ======================================================

export enum StockMovementType {
  IN = "IN",

  OUT = "OUT",

  ADJUSTMENT = "ADJUSTMENT",

  RESERVED = "RESERVED",

  RELEASED = "RELEASED",

  SOLD = "SOLD",

  CANCELLED_RETURN = "CANCELLED_RETURN",
}

// ======================================================
// STOCK MOVEMENT
// ======================================================

export interface StockMovement {
  id: number;

  variantId: number;

  type: StockMovementType;

  qty: number;

  beforeQty: number;

  afterQty: number;

  reason: string | null;

  referenceType: string | null;

  referenceId: string | null;

  createdById: number | null;

  createdAt: string;
}
