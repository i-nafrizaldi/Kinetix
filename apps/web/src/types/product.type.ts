import type { DiscountType } from "./discount.type";

// ======================================================
// ENUMS
// ======================================================

export enum ProductStatus {
  DRAFT = "DRAFT",

  ACTIVE = "ACTIVE",

  INACTIVE = "INACTIVE",

  ARCHIVED = "ARCHIVED",
}

export enum CategoryStatus {
  ACTIVE = "ACTIVE",

  INACTIVE = "INACTIVE",
}

export enum VariantStatus {
  ACTIVE = "ACTIVE",

  INACTIVE = "INACTIVE",
}

// ======================================================
// PRODUCT CATEGORY
// ======================================================

export interface ProductCategory {
  id: number;

  name: string;

  status: CategoryStatus;

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// SPORT CATEGORY
// ======================================================

export interface SportCategory {
  id: number;

  name: string;

  description: string | null;

  imageUrl: string | null;

  status: CategoryStatus;

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// PRODUCT
// ======================================================

export interface Product {
  id: number;

  name: string;

  brand: string | null;

  sku: string;

  description: string | null;

  basePrice: number;

  discountType: DiscountType | null;

  discountValue: number | null;

  status: ProductStatus;

  categoryId: number;

  createdAt: string;

  updatedAt: string;

  category?: ProductCategory;

  images?: ProductImage[];

  variants?: ProductVariant[];

  sportLinks?: ProductSportCategory[];
}

// ======================================================
// PRODUCT IMAGE
// ======================================================

export interface ProductImage {
  id: number;

  productId: number;

  imageUrl: string;

  altText: string | null;

  isPrimary: boolean;

  sortOrder: number;

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// SIZE
// ======================================================

export interface Size {
  id: number;

  name: string;

  type: string | null;

  sortOrder: number;

  status: VariantStatus;

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// COLOR
// ======================================================

export interface Color {
  id: number;

  name: string;

  hexCode: string | null;

  status: VariantStatus;

  createdAt: string;

  updatedAt: string;
}

// ======================================================
// PRODUCT VARIANT
// ======================================================

export interface ProductVariant {
  id: number;

  productId: number;

  sizeId: number;

  colorId: number;

  sku: string;

  stockQty: number;

  reservedQty: number;

  lowStockThreshold: number;

  status: VariantStatus;

  createdAt: string;

  updatedAt: string;

  size?: Size;

  color?: Color;
}

// ======================================================
// PRODUCT SPORT CATEGORY
// ======================================================

export interface ProductSportCategory {
  productId: number;

  sportCategoryId: number;

  sportCategory?: SportCategory;
}

// ======================================================
// PRODUCT DETAIL
// ======================================================

export interface ProductDetail extends Product {
  category: ProductCategory;

  images: ProductImage[];

  variants: ProductVariant[];

  sportLinks: ProductSportCategory[];
}

// ======================================================
// PRODUCT LIST ITEM
// ======================================================

export interface ProductListItem {
  id: number;

  name: string;

  brand: string | null;

  sku: string;

  basePrice: number;

  discountType: DiscountType | null;

  discountValue: number | null;

  status: ProductStatus;

  category: ProductCategory;

  primaryImage: ProductImage | null;

  availableStock: number;
}

// ======================================================
// PRODUCT TABLE ROW
// ======================================================

export interface ProductTableRow {
  id: number;

  name: string;

  brand: string | null;

  sku: string;

  category: string;

  price: number;

  stock: number;

  status: ProductStatus;
}
