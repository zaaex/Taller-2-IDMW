"use client";

import { useCartStore } from "@/stores/CartStore";
import { useEffect } from "react";

export const useCart = () => {
    const {items: cart, totalPrice, fetchCart, addToCart} = useCartStore();

    useEffect(() => {
        fetchCart();
        console.log("Carrito de compras cargado:", cart);
    }, []);

    const handleCheckout = () => {
        if (cart.length === 0) {
            console.log("El carrito está vacío. No se puede proceder al pago.");
            return;
        }

        console.log("Procediendo al pago con el carrito:", cart);
    }
}

