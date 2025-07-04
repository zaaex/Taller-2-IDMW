"use client";

import { useCartStore } from "@/stores/CartStore";
import { CartItem } from "@/interfaces/Product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleMinus, PlusIcon, TrashIcon } from "lucide-react";

export const CartPage = () => {
  const { items: cart, totalPrice, fetchCart, addToCart } = useCartStore();

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10 pt-20">
      <div className="max-w 7xl mx-auto">
        <h1 className="text 2xl font bold mb-6">
          {cart.map((item: CartItem) => (
            <div
              key={item.productId}
              className="bg-white p-4 rounded shadow flex felx-col md:flex-row gap-4"
            >
              <Image
                src={item.urls?.[0] || "/Producto.jpg"}
                alt={item.name}
                width={100}
                height={100}
                className="object-contain border rounded mx-auto md:mx-0"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-base md:text-lg">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    $ {item.price.toFixed(2)}{" "}
                  </p>
                  <div className="flex items-center mt-2 gap-2 flex-wrap">
                    <span className="text-sm"> Cantidad: </span>
                    <Button
                      size={"sm"}
                      //onClick={() => removeFromCart(item.productId, 1)}
                      className="bg-black text-white"
                    >
                      <CircleMinus />
                    </Button>

                    <span className="text-sm"> {item.quantity} </span>
                    <Button
                      size={"sm"}
                      onClick={() => addToCart(item.productId, 1)}
                      className="bg-blue-500 text-white"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col justify-between md:items-end items-start md:text-rigth text-left font-bold">
                <div className="text-sm">
                  <span className="font-semibold text-black">Subtotal:</span>
                  <br /> $ {(item.price * item.quantity).toFixed(2)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-100"
                  //onClick={() => handleRemoveItem(item.productId)}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded shadow h-fit">
            <h2> Resumen de compra </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento:</span>
                <span>$0.0</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>TOTAL: </span>
                <span>$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                //onClick={handleCheckout}
              >
                Hacer pedido
              </Button>
              <Button
                variant="outline"
                className="w-full"
                //onClick={() => cart.forEach((item: {productId: number; quantity: number;}) =>
                //  removeFromCart(item.productId, item.quantity)
                //)}
              >
                Vaciar carrito
              </Button>
            </div>
          </div>
        </h1>
      </div>
    </div>
  );
};
