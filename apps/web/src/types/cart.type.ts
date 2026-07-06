import type {
  Color,
  Product,
  ProductVariant,
  Size,
} from "./product.type";

// ======================================================
// ENUMS
// ======================================================

export enum CartStatus {
  ACTIVE = "ACTIVE",

  CHECKED_OUT = "CHECKED_OUT",

  ABANDONED = "ABANDONED",
}

// ======================================================
// CART
// ======================================================

export interface Cart {
  id: number;

  userId: number;

  status: CartStatus;

  createdAt: string;

  updatedAt: string;

  items?: CartItem[];
}

// ======================================================
// CART ITEM
// ======================================================

export interface CartItem {
  id: number;

  cartId: number;

  variantId: number;

  qty: number;

  createdAt: string;

  updatedAt: string;

  variant?: ProductVariant;
}

// ======================================================
// CART ITEM DETAIL
// ======================================================

export interface CartItemDetail extends CartItem {
  variant: ProductVariant & {
    product: Product;

    size: Size;

    color: Color;
  };
}

// ======================================================
// CART DETAIL
// ======================================================

export interface CartDetail extends Cart {
  items: CartItemDetail[];
}