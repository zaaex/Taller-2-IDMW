"use client";

import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
