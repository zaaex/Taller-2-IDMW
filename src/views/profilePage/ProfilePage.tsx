import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserService } from "@/services/UserService";
import { ShippingService } from "@/services/ShippingService";

interface ShippingAddress {
  street?: string;
  number?: string;
  commune?: string;
  region?: string;
  postalCode?: string;
}

export default function ProfilePage() {
  const { logout } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState<ShippingAddress>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userData = await UserService.getProfile();
      setUser(userData);
      const addressData = await ShippingService.getShippingAddress();
      setAddress(addressData || {});
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">Cargando...</div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col items-center py-5">
      <h1 className="text-3xl font-semibold mb-6">Perfil</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Modificar datos personales */}
        <div className="flex-1 bg-[#42A6EA] rounded-xl p-4  shadow-md">
          <h2 className="text-xl font-bold text-center mb-4">
            Modificar datos personales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 bg-[#75BEF0] rounded-xl p-6 ">
            <div>
              <label className="block mb-1">Nombre completo</label>
              <Input
                className="bg-white rounded-xl"
                value={user?.firtsName + " " + user?.lastName}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Correo electrónico</label>
              <Input
                className="bg-white rounded-xl"
                value={user?.email}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Número telefónico</label>
              <Input
                className="bg-white rounded-xl"
                value={user?.thelephone || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Fecha de nacimiento</label>
              <Input
                className="bg-white rounded-xl"
                value={
                  user?.birthDate
                    ? new Date(user.birthDate).toLocaleDateString()
                    : ""
                }
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-[#2599E7] text-black border-black border-1">
              Actualizar
            </Button>
          </div>
        </div>

        {/* Modificar dirección de envío */}
        <div className="flex-1 bg-[#42A6EA] rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-center mb-4">
            Modificar dirección de envío
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#75BEF0] rounded-xl p-5">
            <div>
              <label className="block mb-1">Calle</label>
              <Input
                className="bg-white rounded-xl"
                value={address?.street || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Numeración</label>
              <Input
                className="bg-white rounded-xl"
                value={address?.number || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Comuna</label>
              <Input
                className="bg-white rounded-xl"
                value={address?.commune || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Región</label>
              <Input
                className="bg-white rounded-xl"
                value={address?.region || ""}
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1">Código postal</label>
              <Input
                className="bg-white rounded-xl"
                value={address?.postalCode || ""}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-[#2599E7] text-black border-black border-1">
              Actualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Modificar contraseña */}
      <div className="w-full max-w-5xl mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-[#42A6EA] rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-center mb-4">
            Modificar contraseña
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 bg-[#75BEF0] rounded-xl p-5">
            <div>
              <label className="block mb-1">Contraseña actual</label>
              <Input
                className="bg-white rounded-xl"
                value={user?.password ? "********" : "********"}
                type="password"
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Nueva contraseña</label>
              <Input
                className="bg-white rounded-xl"
                value={""}
                type="password"
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-[#2599E7] text-black border-black border-1">
              Actualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Cerrar sesión */}
      <div className="w-full max-w-5xl mt-6">
        <Button
          className="w-full bg-[#2599E7] text-black font-bold text-lg py-4 rounded-xl shadow-md hover:bg-blue-300"
          onClick={logout}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
