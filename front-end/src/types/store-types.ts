import { TProductData } from "@/types/main";

export interface State {
  cart: TProductData[];
  likedProducts: TProductData[];
  purchasedProducts: TProductData[];
}

export type Action =
  | { type: any; payload: TProductData }
  | { type: any; payload: TProductData }
  | { type: any; payload: TProductData }
  | { type: any; payload: TProductData }
  | { type: any; payload: TProductData };
