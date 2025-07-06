"use client";
import { useContext } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { VscAccount } from "react-icons/vsc";

export const Navbar = () => {
  const { auth: user, status, logout } = useContext(AuthContext);
  //const { items: cart } = useCartStore();
  const userRole = user?.role;
  const isAdmin = userRole === "Admin";
  const isUser = userRole === "User";


  if (status === "checking") {
    return (
      <nav className="shadow-lg bg-[#061754]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-white text-xl font-bold tracking-wider">
              BLACKCAT
            </div>

            {/* Barra de búsqueda central */}
            <div className="w-full md:max-w-lg">
              <Input
                type="text"
                placeholder="Buscar"
                className="w-full pl-4 pr-12 py-2 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Enlaces y botones de sesión */}
            <div className="flex flex-col md:flex-row items-center md:space-x-6 text-sm text-white space-y-2 md:space-y-0">
              <Link href="/" className="text-white hover:text-blue-200">
                Catálogo
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (status === "non-authenticated") {
    return (
      <nav className="shadow-lg bg-[#061754]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-white text-xl font-bold tracking-wider">
              BLACKCAT
            </div>

            {/* Barra de búsqueda central */}
            <div className="w-full md:max-w-lg">
              <Input
                type="text"
                placeholder="Buscar"
                className="w-full pl-4 pr-12 py-2 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Enlaces y botones de sesión */}
            <div className="flex flex-col md:flex-row items-center md:space-x-6 text-sm text-white space-y-2 md:space-y-0">
              <Link href="/" className="text-white hover:text-blue-200">
                Catálogo
              </Link>

              <div className="flex items-center space-x-2">
                <VscAccount className="w-6 h-6 text-[#2599e7]" />
                <div className="flex flex-col text-center md:text-left">
                  <Link
                    href="/login"
                    className="text-white hover:text-blue-200"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/register"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (status === "authenticated" && isUser) {
    return (
      <nav className="shadow-lg bg-[#061754]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-white text-xl font-bold tracking-wider">
              BLACKCAT
            </div>

            {/* Barra de búsqueda central */}
            <div className="w-full md:max-w-lg">
              <Input
                type="text"
                placeholder="Buscar"
                className="w-full pl-4 pr-12 py-2 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Enlaces y botones de sesión */}
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-2 md:space-y-0 text-sm text-white">
              <Link href="/" className="text-white hover:text-blue-200">
                Catálogo
              </Link>

              <Link
                href="/client/shopping"
                className="text-white hover:text-blue-200"
              >
                Compras
              </Link>

              <Link
                href="/client/cart"
                className="text-white hover:text-blue-200 transition-all">
                Carrito
              </Link>

              <div className="flex items-center space-x-2">
                <VscAccount className="w-6 h-6 text-[#2599e7]" />
                <div>
                  <Link
                    href="/client/profile"
                    className="hover:text-blue-200 transition-all"
                  >
                    Mi perfil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (status === "authenticated" && isAdmin) {
    return (
      <nav className="shadow-lg bg-[#061754]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="text-white text-xl font-bold tracking-wider">
              BLACKCAT
            </div>

            {/* Barra de búsqueda central */}
            <div className="w-full md:max-w-lg">
              <Input
                type="text"
                placeholder="Buscar"
                className="w-full pl-4 pr-12 py-2 bg-white rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Enlaces y botones de sesión */}
            <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-2 md:space-y-0 text-sm text-white">
              <Link
                href="/admin/usuarios"
                className="text-white hover:text-blue-200"
              >
                Usuarios
              </Link>

              <Link
                href="/admin/productos"
                className="text-white hover:text-blue-200"
              >
                Productos
              </Link>
              <div className="flex items-center space-x-2">
                <VscAccount className="w-6 h-6 text-[#2599e7]" />
                <Button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return null;
};
