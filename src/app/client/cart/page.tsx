"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { CartPage } from "@/views/cartPage/CartPage";

export default function Cart() {
  const { status } = useContext(AuthContext);
  const router = useRouter();

  if (status === "checking") {
    //crear skeleton de carga
    return;
  }

  if (status === "non-authenticated") {
    router.push("/login");
    return null;
  }

  return <CartPage />;
}
