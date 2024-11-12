import { create } from "zustand";

import { CartState } from "./cartTypes";

export const useCartState = create<CartState>((set, get) => ({
  items: [],
  totalCartValue: 0,

  addOrUpdateItem: (product, quantity) => {
    set(state => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      const updatedItems = existingItem
        ? state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity, totalPrice: product.price * quantity }
            : item
        )
        : [...state.items, { product, quantity, totalPrice: product.price * quantity }];
      const totalCartValue = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
      return { items: updatedItems, totalCartValue };
    });
  },

  removeItem: (productId) => {
    set(state => {
      const updatedItems = state.items.filter(item => item.product.id !== productId);
      const totalCartValue = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
      return { items: updatedItems, totalCartValue };
    });
  },

  clearCart: () => set({ items: [], totalCartValue: 0 }),
}));