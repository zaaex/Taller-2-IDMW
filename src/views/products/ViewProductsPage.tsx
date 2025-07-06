"use client";
import { ProductCard } from "@/components/products/ProductCard";

import { useProductStore } from "@/stores/ProductStore";
import { useEffect } from "react";
import { useFilters } from "@/hooks/useFilters";
import { Checkbox } from "@/components/ui/checkbox";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

export default function ViewProductsPage() {
  const { products, loading, fetchProducts, filters } = useProductStore();
  const router = useRouter();
  const { handleSort, handleCategoryFilter, handleBrandFilter } = useFilters();

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Cargando Productos
      </div>
    );
  }

  return (
    <div className="font-afacad">
      {/* Sección superior centrada */}
      <div className="flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-transparent">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-0">
            Catalago
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex flex-wrap items-center justify-between gap-4 bg-[#67B8EF] rounded-lg px-6 py-3">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black font-medium hover:text-blue-100">
                Categorías
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[200px]">
                  <select
                    className="w-full rounded-md p-2 border border-gray-300"
                    onChange={handleCategoryFilter}
                    value={filters.categories || ""}
                  >
                    <option value="">Todas</option>
                    <option value="Electrónicos">Electrónicos</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Hogar">Hogar</option>
                  </select>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black font-medium hover:text-blue-100">
                Rango de precios
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[200px]">
                  <NavigationMenuLink className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                    $0 - $50
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                    $50 - $100
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                    $100 - $500
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                    $500+
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black font-medium hover:text-blue-100">
                Estado del producto
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[200px]">
                  <NavigationMenuLink className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                    Nuevo
                  </NavigationMenuLink>
                  <NavigationMenuLink className="block select-none rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                    Usado
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black font-medium hover:text-blue-100">
                Marca
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[200px]">
                  <select
                    className="w-full rounded-md p-2 border border-gray-300"
                    onChange={handleBrandFilter}
                    value={filters.brands || ""}
                  >
                    <option value="">Todas</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                    <option value="Nike">Nike</option>
                  </select>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row gap-6 justify-center py-4">
        {/* Ordenar por precio */}
        <div className="border rounded-xl px-6 py-4 w-full sm:w-[300px]">
          <h2 className="text-center font-semibold mb-4">Ordenar por precio</h2>
          <div className="flex justify-around">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sortPrice"
                value="price"
                checked={filters.orderBy === "price"}
                onChange={() => handleSort("price")}
              />
              <span className="text-sm font-medium">Ascendente</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sortPrice"
                value="priceDesc"
                checked={filters.orderBy === "priceDesc"}
                onChange={() => handleSort("priceDesc")}
              />
              <span className="text-sm font-medium">Descendente</span>
            </label>
          </div>
        </div>

        {/* Ordenar por alfabeto */}
        <div className="border rounded-xl px-6 py-4 w-full sm:w-[300px]">
          <h2 className="text-center font-semibold mb-4">
            Ordenar por alfabeto
          </h2>
          <div className="flex justify-around">
            <label className="flex items-center gap-2">
              <Checkbox id="az" />
              <span className="text-sm font-medium">A - Z</span>
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="za" />
              <span className="text-sm font-medium">Z - A</span>
            </label>
          </div>
        </div>
      </div>

      {/* Listado de productos */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => {
              router.push(product.id!.toString());
            }}
          />
        ))}
      </div>
    </div>
  );
}
