"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "@/views/profilePage/ProfilePage";

export default function Profile() {
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

  return <ProfilePage />;
}
