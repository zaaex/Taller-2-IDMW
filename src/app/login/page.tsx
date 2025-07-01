"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { LoginView } from "@/views/login-view/LoginView";
import { LoginViewSkeleton } from "@/views/login-view/LoginViewSkeleton";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function LoginPage() {
  const router = useRouter();

  // 1. Obtener el estado de autenticación del contexto
  const { status } = useContext(AuthContext);

  // 2. Si esta cargando, mostrar un skeleton
  if (status === "checking") {
    return <LoginViewSkeleton />;
  }

  // 3. Si estoy autenticado, redirigir a la página de inicio
  if (status === "authenticated") {
    router.replace("/");
    return null;
  }

  // 4. Si no estoy autenticado, mostrar el formulario de inicio de sesión
  return <LoginView />;
}
