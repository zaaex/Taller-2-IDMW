"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { LoginView } from "@/views/login-view/LoginView";
import { LoginViewSkeleton } from "@/views/login-view/LoginViewSkeleton";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  // 1. Obtener el estado de autenticación del contexto
  const { status } = useContext(AuthContext);

  // 2. Si esta cargando, mostrar un skeleton
  if (status === "checking") {
    return <LoginViewSkeleton />;
  }

  useEffect(() => {
    if (status === "authenticated") {
      // 3. Si estoy autenticado, redirigir a la página de inicio
      router.replace("/");
    }
  }, [status, router]);

  // 4. Si no estoy autenticado, mostrar el formulario de inicio de sesión
  return <LoginView />;
}
