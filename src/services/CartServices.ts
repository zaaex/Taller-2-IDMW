import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const CartService = {
  fetchCart: async () => {
    try {
      const response = await ApiBackend.get<ResponseAPI>('basket');
      console.log("Cart fetched successfully:", response.data);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  addToCart: async (productId: number, quantity: number) => {
    try {
      const resp = await ApiBackend.post<ResponseAPI>(
        `basket?productId=${productId}&quantity=${quantity}`
      );

      console.log("Product added to cart successfully:", resp.data?.data);
      return resp.data?.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  // Eliminar un producto del carrito
  removeFromCart: async (productId: number, quantity: number) => {
    try {
      const resp = await ApiBackend.delete<ResponseAPI>(
        `basket?productId=${productId}&quantity=${quantity}`
      );
      console.log("Product removed from cart successfully:", resp.data?.data);
      return resp.data?.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  },

  createOrder: async () => {
    try {
      const response = await ApiBackend.post<ResponseAPI>('order');
      console.log("Order created successfully:", response.data?.data);
      return response.data?.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Crear orden
};
