import { Product } from "./Product";

export interface CartItem extends Product {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  pictureUrl: string;
  category: string;
  brand: string;
}
