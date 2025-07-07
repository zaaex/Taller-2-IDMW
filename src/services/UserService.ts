import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";

export const UserService = {
  async getProfile(): Promise<User | null> {
    try {
      const { data } = await ApiBackend.get<ResponseAPI>("user/profile");
      if (data.success && data.data) {
        return data.data as User;
      }
      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return null;
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getShippingAddress(): Promise<any | null> {
    try {
      const { data } = await ApiBackend.get<ResponseAPI>("user/address");
      if (data.success && data.data) {
        return data.data;
      }
      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return null;
    }
  },
};
