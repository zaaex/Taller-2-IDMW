"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { AuthService } from "@/services/AuthServices";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { decodeJWT } from "@/helpers/decodeJWT";
import { Auth } from "@/interfaces/Auth";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Ingrese un correo electrónico válido.",
    })
    .nonempty({
      message: "Email es requerido.",
    }),
  password: z.string().nonempty({
    message: "Contraseña es requerida.",
  }),
});

type LoginForm = z.infer<typeof formSchema>;

export const useLogin = () => {
  // Global state
  const { login } = useContext(AuthContext);

  // Local state
  const [error, setError] = useState<string | null>(null);

  // Form handling
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: LoginForm) => {
    const data: ResponseAPI = await AuthService.login(values);

    if (!data) {
      setError("Intente nuevamente");
      return;
    }

    if (data.success == false) {
      setError("Credenciales inválidas");
      return;
    }

    const token = data.data.token;
    const payload = decodeJWT(token);

    if (!payload) {
      setError("Intente nuevamente");
      return;
    }

    const auth: Auth = {
      id: payload.nameid,
      email: payload.email,
      name: payload.given_name,
      role: payload.role,
    };

    login(auth);
    localStorage.setItem("token", token);
  };

  return {
    // Form handling
    form,
    onSubmit,
    error,
  };
};
