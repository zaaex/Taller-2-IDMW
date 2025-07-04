"use client";
import { RegisterPage } from "@/views/registerPage/RegisterPage";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Register() {
  const { auth: user, status } = useAuth();
  const router = useRouter();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  if (user) {
    router.push("/");
  }
  return <RegisterPage />;
}
