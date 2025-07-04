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
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

export const LoginView = () => {
  const { form, onSubmit, error } = useLogin();

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
            {error !== null && (
              <div className="text-red-500 text-sm mt-2 p-2 bg-red-100 rounded text-center">
                {error}
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
