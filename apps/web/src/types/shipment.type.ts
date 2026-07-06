// ======================================================
// ENUMS
// ======================================================

export enum ShipmentStatus {
  PENDING = "PENDING",

  PACKING = "PACKING",

  SHIPPED = "SHIPPED",

  DELIVERED = "DELIVERED",

  CANCELLED = "CANCELLED",
}

// ======================================================
// SHIPMENT
// ======================================================

export interface Shipment {
  id: number;

  orderId: number;

  courierCode: string;

  courierName: string | null;

  serviceCode: string;

  serviceName: string;

  cost: number;

  etd: string | null;

  trackingNumber: string | null;

  status: ShipmentStatus;

  shippedAt: string | null;

  deliveredAt: string | null;

  createdAt: string;

  updatedAt: string;
}