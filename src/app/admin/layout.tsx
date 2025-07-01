"use client";

import { Navbar } from "@/components/navbar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth: user, status } = useAuth();
  const router = useRouter();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  if (!user) {
    router.push("/login");
  }

  if (user?.role !== "Admin") {
    return <div> Sin permisos </div>;
  }

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-screen z-50">
        <Navbar />
      </div>

      <main className="pt-24">{children}</main>
    </div>
  );
}
