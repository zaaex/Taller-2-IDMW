import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";


interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firtsName: string;
  lastName: string;
  email: string;
  birthDate: string | null;
  thelephone: string;
  password: string;
  confirmPassword: string;
  street?: string | null;
  number?: string | null;
  commune?: string | null;
  region?: string | null;
  postalCode?: string | null;
}

export const AuthService = {
  login: async (payload: LoginPayload): Promise<ResponseAPI> => {
    const response = await ApiBackend.post<ResponseAPI>("Auth/login", payload);
    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await ApiBackend.post<ResponseAPI>("Auth/register",payload);
    return response.data;
  },
};



