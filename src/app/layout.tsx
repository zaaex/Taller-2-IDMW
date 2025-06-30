"use client";

import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { decodeJWT } from "@/helpers/decodeJWT";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, status, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && user?.token) {
      const payload = decodeJWT(user.token);
      if (!payload) {
        logout();
      }
    }
  }, [user?.token, status, logout, router]);

  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <main className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 max-w-screen-xl mx-auto py-6">
            {children}
          </main>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
