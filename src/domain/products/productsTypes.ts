import { PageParams } from "../../services/api/apiTypes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  images: string[];
  tags?: string[];
  discount?: { amount: number; type: 'percentage' | 'fixed' };
  rating?: number;
  reviewsCount?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  freeShipping?: boolean;
  variants?: Variant[];
  relatedProducts?: string[];
  isFeatured?: boolean;
}

export interface Variant {
  id: string;
  name: string;
  options: { value: string; stock?: number; priceModifier?: number }[];
}

export interface ProductAPI {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  images: string[];
  tags?: string[];
  discount?: { amount: number; type: 'percentage' | 'fixed' };
  rating?: number;
  reviewsCount?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  freeShipping?: boolean;
  variants?: Variant[];
  relatedProducts?: string[];
  isFeatured?: boolean;
}

export interface VariantAPI {
  id: string;
  name: string;
  options: { value: string; stock?: number; priceModifier?: number }[];
}

export interface ProductsAPIRequest extends PageParams {}