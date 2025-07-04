import { CartItem } from "@/interfaces/Product";
import { CartService } from "@/services/CartServices";
import { create } from "zustand";

interface CartState {
  basketId: string | null;
  items: CartItem[];
  totalPrice: number;
  loading: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  // Eliminar producto
  // Crear orden
}

export const useCartStore = create<CartState>((set) => ({
  basketId: null,
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const response = await CartService.fetchCart();
      set({
        basketId: response?.basketId || null,
        items: response?.items || [],
        totalPrice: response?.totalPrice || 0,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ error: error.message || "Error fetching cart" });
    }
  },

  addToCart: async (productId: number, quantity: number) => {
    set({ loading: true, error: null });
    try {
      const response = await CartService.addToCart(productId, quantity);
      set({
        items: response?.items || [],
        totalPrice: response?.totalPrice || 0,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message || "Error adding to cart", loading: false });
    }
  },

  // Remove from cart

  // Create order
}));
