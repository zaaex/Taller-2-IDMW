"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/stores/ProductStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ProductDetailRoute() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const product = useProductStore((state) =>
    state.products.find((p) => p.id === parseInt(id))
  );

  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      fetchProducts();
    }
  }, [product, fetchProducts]);

  if (!product) return <p className="p-4 text-center">Esta página no existe</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 font-[Afacad]">
      {/* Imagen del producto */}
      <div className="relative w-full aspect-video md:aspect-[4/3] bg-white flex items-center justify-center border border-gray-400 rounded-xl overflow-hidden">
        <Image
          src="/Producto.jpg"
          alt={product.name}
          width={700}
          height={700}
          className="object-contain max-h-full max-w-full"
        />
      </div>

      {/* Detalles del producto */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {product.name}
          </h1>
          <hr className="my-4" />
          <p className="text-2xl md:text-4xl font-semibold mb-4">
            ${product.price.toLocaleString()}
          </p>
          <p className="mb-6 text-lg md:text-2xl font-medium text-gray-700">
            Stock disponible: {product.stock ?? 0} unidades
          </p>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              className="bg-[#D9D9D9] text-[#716C6C] text-2xl px-4 py-2 "
              variant="outline"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>
            <input
              type="text"
              readOnly
              className="w-12 text-center text-2xl border rounded"
              value={quantity}
            />
            <Button
              className="bg-[#D9D9D9] text-[#716C6C] text-2xl px-4 py-2"
              variant="outline"
              onClick={() =>
                setQuantity((prev) => Math.min(product.stock ?? 1, prev + 1))
              }
            >
              +
            </Button>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              className="w-full sm:w-auto bg-[#1999EF] text-black text-lg md:text-xl px-6 py-4 rounded-xl"
              onClick={() => router.push("/login")}
            >
              Añadir al carrito
            </Button>
            <Button
              className="w-full sm:w-auto bg-[#8CCCF7] text-lg md:text-xl px-6 py-4 rounded-xl"
              variant="secondary"
              onClick={() => router.push("/login")}
            >
              Comprar ahora
            </Button>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-4">
          <h2 className="text-xl md:text-2xl font-semibold border-b w-fit pb-1 border-blue-500">
            Descripción
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
