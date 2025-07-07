"use client";

import { useCartStore } from "@/stores/CartStore";
import { CartItem } from "@/interfaces/CartItem";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Circle, TrashIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";

export const CartPage = () => {
  const { items: cart, totalPrice, addToCart, removeFromCart } = useCartStore();
  const { handleCheckout, handleRemoveItem } = useCart();

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 font-[Afacad]">
      {/* Carrito */}
      <div>
        {/* Pasos */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-0">
            {/* Paso 1 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Circle className="w-12 h-12 text-[#2599E7] fill-[#2599E7]" />
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-black">
                  1
                </span>
              </div>
              <span className="mt-2 text-base text-black font-semibold">
                Carrito
              </span>
            </div>
            {/* Línea */}
            <div className="w-10 h-1 bg-[#E6F2FB] mx-2" />
            {/* Paso 2 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Circle className="w-12 h-12 text-[#BEE1F8] fill-[#BEE1F8]" />
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-black">
                  2
                </span>
              </div>
              <span className="mt-2 text-base text-black">
                Dirección de envío
              </span>
            </div>
            {/* Línea */}
            <div className="w-10 h-1 bg-[#E6F2FB] mx-2" />
            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Circle className="w-12 h-12 text-[#BEE1F8] fill-[#BEE1F8]" />
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-black">
                  3
                </span>
              </div>
              <span className="mt-2 text-base text-black">Pago</span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Carrito</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Tu carrito está vacío.
          </div>
        ) : (
          cart.map((item: CartItem) => (
            <div
              key={item.productId}
              className="flex items-center border rounded-xl p-4 mb-4 bg-white shadow-sm"
            >
              <div className="w-28 h-28 bg-gray-200 rounded flex items-center justify-center overflow-hidden mr-6">
                <Image
                  src={item.urls?.[0] || "/Producto.jpg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-gray-700 text-base mb-2">
                  {formatPrice(item.price)}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[#D9D9D9]"
                    onClick={() => removeFromCart(item.productId, 1)}
                  >
                    {" "}
                    -{" "}
                  </Button>
                  <input
                    type="text"
                    readOnly
                    className="w-10 text-center border rounded"
                    value={item.quantity}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[#D9D9D9]"
                    onClick={() => addToCart(item.productId, 1)}
                  >
                    +{" "}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button
              className="bg-[#1999EF] text-black text-lg px-10 py-3 rounded-xl"
              onClick={handleCheckout}
            >
              Continuar
            </Button>
          </div>
        )}
      </div>

      {/* Resumen (columna derecha) */}
      <div className="w-full lg:w-96 bg-[#75BEF0] rounded-2xl shadow-md h-fit border-spacing-0.5 border-black m4">
        <div className="rounded-t 2xl bg-[#38A8F7] text-black text-xl font-bold text-center py-3 border-1 border-black">
          Resumen de tu compra
        </div>
        <div className="p-6">
          <table className="w-full text-left mb-4">
            <thead>
              <tr>
                <th className="font-semibold">Productos</th>
                <th className="font-semibold text-center">Cantidad</th>
                <th className="font-semibold text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.productId}>
                  <td className="py-1">{item.name}</td>
                  <td className="text-center py-1">x{item.quantity}</td>
                  <td className="text-right py-1">{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="my-4 mx-2 border-black" />
        <div className="px-4 py-4">
          <div className="flex justify-between font-semibold text-lg mb-3">
            <span className="mx-4">Subtotal</span>
            <span className="mx-4">{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-2">
            <span className="mx-4">Total</span>
            <span className="mx-4">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
