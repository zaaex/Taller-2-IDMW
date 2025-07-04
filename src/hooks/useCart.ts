"use client";

import { useCartStore } from "@/stores/CartStore";
import { useEffect } from "react";

export const useCart = () => {
  const {
    items: cart,
    fetchCart,
    removeFromCart,
    createOrder,
  } = useCartStore();
  useEffect(() => {
    fetchCart();
    console.log("Carrito de compras cargado:", cart);
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) {
      console.log("El carrito está vacío. No se puede proceder al pago.");
      return;
    }
    createOrder()
      .then(() => {
        console.log("Pedido creado exitosamente.");
      })
      .catch((error) => {
        console.error("Error al crear la orden:", error);
        alert(
          "Error al crear la orden. Por favor, inténtelo de nuevo más tarde."
        );
      });
  };

  const handleRemoveItem = (productId: number) => {
    const item = cart.find((item) => item.productId === productId);

    if (item) {
      removeFromCart(item.productId, item.quantity);
      alert(`Producto ${item.productId} eliminado del carrito.`);
    } else {
      alert(`Producto con ID ${productId} no encontrado en el carrito.`);
    }
  };

  return {
    handleCheckout,
    handleRemoveItem,
  };
};
