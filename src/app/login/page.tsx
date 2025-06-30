"use client";
import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "@/views/loginPage/LoginPage";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user, status } = useAuth();
  const router = useRouter();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  if (user) {
    router.push("/");
  }

  return <LoginPage />;
}
