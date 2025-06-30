import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

interface LoginPayload {
  email: string;
  password: string;
}

export const AuthService = {
  login: async (payload: LoginPayload): Promise<ResponseAPI> => {
    const response = await ApiBackend.post<ResponseAPI>("Auth/login", payload);
    return response.data;
  },
};
