import { Product } from "../../domain/products/productsTypes";

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalCartValue: number;

  addOrUpdateItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}