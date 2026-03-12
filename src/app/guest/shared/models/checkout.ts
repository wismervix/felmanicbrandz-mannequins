import { Product } from "../../../core/models/products.model";

export interface OrderPayload {
  product: Product;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}