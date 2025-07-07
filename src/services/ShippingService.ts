import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";

export const ShippingService = {
  async getShippingAddress() {
    try {
      const { data } = await ApiBackend.get<ResponseAPI>("user/address");
      if (data.success && data.data) {
        return data.data;
      }
      return null;
    } catch {
      return null;
    }
  },
};
