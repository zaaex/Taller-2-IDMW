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
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthServices";

const formSchema = z
  .object({
    firtsName: z
      .string()
      .min(2, {
        message: "Los nombres deben tener al menos 2 caracteres",
      })
      .nonempty({
        message: "Nombres es requerido.",
      }),

    lastName: z
      .string()
      .min(2, {
        message: "Los apellidos deben tener al menos 2 caracteres",
      })
      .nonempty({
        message: "Apellidos es requerido.",
      }),

    email: z
      .string()
      .email({
        message: "Ingrese un correo electrónico válido",
      })
      .nonempty({
        message: "Correo electrónico es requerido.",
      }),

    birthDate: z.date({
      required_error: "Fecha de nacimiento requerida.",
      invalid_type_error: "Ingrese una fecha válida.",
    }),

    thelephone: z
      .string()
      .min(8, {
        message: "El número telefónico debe tener al menos 8 dígitos.",
      })
      .regex(/^\+?[\d\s\-\(\)]+$/, {
        message: "Ingrese un número telefónico válido.",
      }),

    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
      })
      .nonempty({
        message: "Contraseña requerida",
      }),

    confirmPassword: z.string().nonempty({
      message: "Confirmación de contraseña es requerida.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firtsName: "",
      lastName: "",
      email: "",
      birthDate: undefined,
      thelephone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...values,
        birthDate: values.birthDate
          ? values.birthDate.toISOString().split("T")[0]
          : null,
        street: null,
        number: null,
        commune: null,
        region: null,
        postalCode: null,
      };

      console.log("Payload enviado al backend:", payload);

      const data = await AuthService.register(payload);

      if (data.success === false) {
        setServerError(data.message || "Error al registrar.");
        return;
      }

      toast.success("¡Registro exitoso!");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Error al registrar.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-[Afacad]">
      <div className="w-full max-w-3xl bg-transparent">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-black mb-4 sm:mb-6">
          Crear cuenta
        </h1>
        <div className="w-full bg-[#75BEF0] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl text-sm sm:text-base">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="firtsName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Nombres</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Apellidos</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Correo electrónico */}
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Correo electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Fecha de nacimiento y Número telefónico */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          Fecha de nacimiento
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                            className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="thelephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          Número telefónico
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contraseña y Confirmación de contraseña */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">
                          Confirmación de contraseña
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="rounded-xl bg-white h-10 md:h-12 px-4 text-sm md:text-base"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {serverError && (
                <p className="text-red-500 text-sm text-center">
                  {serverError}
                </p>
              )}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-[#2599E7] hover:bg-blue-700 text-black font-semibold py-2 px-6 rounded-lg shadow-md text-sm md:text-base"
                  disabled={form.formState.isSubmitting}
                >
                  REGISTRARSE
                </Button>
              </div>

              <p className="text-center text-sm text-black">
                ¿Ya tienes una cuenta? {""}
                <Link href="/login" className="text-[#1C3873] hover:underline">
                  Ingresa aquí
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
