"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiBackend } from "@/clients/axios";
import { VscAccount } from "react-icons/vsc";
import { useContext, useState } from "react";
import { User } from "@/interfaces/User";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

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

export const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [errorBool, setErrorBool] = useState<boolean>(false);
  const { auth, user } = useContext(AuthContext);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Valores enviados de formulario:", values);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await ApiBackend.post<ResponseAPI>("Auth/login", values);

      if (data.success == false) {
        console.error("Error en la respuesta del servidor: ", data.message);
        setErrors("Error en la respuesta del servidor: ");
        setErrorBool(true);
        return;
      }
      setErrors(null);
      setErrorBool(false);

      const data_ = data.data;
      const user_: User = {
        email: data_.email,
        lastName: data_.lastName,
        firtsName: data_.firtsName,
        token: data_.token,
      };
      auth(user_);
      console.log("Datos del usuario: ", user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorCatch = error.response.data.message;
      console.error("Error al enviar el formulario:", errorCatch);

      setErrors(errorCatch);
      setErrorBool(true);
    }
    // Aquí puedes manejar la lógica de inicio de sesión
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8 font-[Afacad]">
      <div className="w-full max-w-md bg-[#75BEF0] rounded-2xl shadow-xl px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-6">
          Iniciar sesión
        </h1>

        {/* Ícono arriba */}
        <div className="flex justify-center mb-6">
          <VscAccount className="w-24 h-24 md:w-36 md:h-36 text-[#2599E7]" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-base md:text-lg">
                    Correo electrónico *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="correo@example.com"
                      className="rounded-xl bg-white h-10 px-4 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-xs font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-base md:text-lg">
                    Contraseña *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      className="rounded-xl bg-white h-10 px-4 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 text-xs font-medium" />
                </FormItem>
              )}
            />
            {errorBool && (
              <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded text-center">
                {errors}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#2599E7] hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-lg shadow-md transition"
            >
              INGRESAR
            </Button>
            <p className="text-center text-sm text-black mt-2">
              ¿No tienes una cuenta? {""}
              <Link href="/register" className="text-[#1C3873] hover:underline">
                Registrate
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};
