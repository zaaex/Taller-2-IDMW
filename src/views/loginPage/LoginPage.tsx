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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Valores enviados de formulario:", values);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await ApiBackend.post<any>("Auth/login", values);
      // const user_: User = {
      //     email: data.email,
      //     lastName: data.lastName,
      //     firtsName: data.firtsName,
      //     token: data.token,
      // }
      console.log("Respuesta del servidor:", data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);
    }
    // Aquí puedes manejar la lógica de inicio de sesión
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 font-[Afacad]">
      <div className="w-full max-w-md bg-transparent">
        <h1 className="text-4xl font-bold text-center mb-6">Iniciar sesión</h1>

        {/* Ícono arriba */}
        <div className="flex justify-center mb-6">
          <VscAccount className="w-[150px] h-[170px] text-[#2599E7]" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Correo electrónico *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="correo@example.com"
                      className="rounded-md shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Contraseña *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      className="rounded-md shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
            >
              INGRESAR
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
