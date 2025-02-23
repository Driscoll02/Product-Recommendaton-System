import { TProductData } from "@/types/main";

export interface State {
  cart: (TProductData & { cartProductId: string })[];
  likedProducts: (TProductData & { likedProductId: string })[];
  purchasedProducts: TProductData[];
}
