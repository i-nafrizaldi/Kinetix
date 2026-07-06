import type {
  Invoice,
} from "./invoice.type";

import type {
  Payment,
} from "./payment.type";

import type {
  Shipment,
} from "./shipment.type";

// ======================================================
// ENUMS
// ======================================================

export enum OrderStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",

  PAYMENT_FAILED = "PAYMENT_FAILED",

  PAYMENT_EXPIRED = "PAYMENT_EXPIRED",

  PAID = "PAID",

  ORDER_RECEIVED = "ORDER_RECEIVED",

  PACKING = "PACKING",

  SHIPPED = "SHIPPED",

  COMPLETED = "COMPLETED",

  CANCELLED = "CANCELLED",

  REFUNDED = "REFUNDED",
}

// ======================================================
// ORDER
// ======================================================

export interface Order {
  id: number;

  userId: number;

  orderNumber: string;

  status: OrderStatus;

  subtotal: number;

  shippingCost: number;

  discountTotal: number;

  grandTotal: number;

  recipientName: string;

  recipientPhone: string;

  shippingAddressText: string;

  createdAt: string;

  updatedAt: string;

  items?: OrderItem[];

  payments?: Payment[];

  shipment?: Shipment | null;

  invoice?: Invoice | null;
}

// ======================================================
// ORDER ITEM
// ======================================================

export interface OrderItem {
  id: number;

  orderId: number;

  variantId: number;

  productName: string;

  sizeName: string;

  colorName: string;

  sku: string;

  price: number;

  qty: number;

  subtotal: number;
}

// ======================================================
// ORDER DETAIL
// ======================================================

export interface OrderDetail extends Order {
  items: OrderItem[];

  payments: Payment[];

  shipment: Shipment | null;

  invoice: Invoice | null;
}