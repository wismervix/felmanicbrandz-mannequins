import { Media } from "./shared/types";

export interface ProductsApiResponse {
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warranty_information: string;
  shipping_information: string;
  availability_status: string;
  reviews: Review[];
  return_policy: string;
  minimum_order_quantity: number;
  meta: Meta;
  images: Media[];
  thumbnail: Media | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export type Category = 'mannequins' | 'hangers';

export type CategoryKey = Category;


export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: Date; // could also be Date if you transform it
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: Date; // or Date if parsed
  updatedAt: Date; // or Date if parsed
  barcode: string;
  qrCode: string;
}

export interface DisplayImage {
  type: 'existing' | 'new';
  url: string;
  public_id?: string;
  file?: File;
}
