import type {
  Product,
} from "./product.type";

export interface Wishlist {
  id: number;

  userId: number;

  productId: number;

  createdAt: string;

  product?: Product;
}