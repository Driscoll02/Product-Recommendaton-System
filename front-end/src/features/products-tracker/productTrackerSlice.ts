import { TProductData } from "@/types/main";
import { Action, State } from "@/types/store-types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: State = {
  cart: [],
  likedProducts: [],
  purchasedProducts: [],
};

export const productTrackerSlice = createSlice({
  name: "product-tracker",
  initialState,
  reducers: {
    addToCart: (state, action: Action) => {
      const product: TProductData = {
        productId: action.payload.productId,
        productName: action.payload.productName,
        productImage: action.payload.productImage,
        productBrand: action.payload.productBrand,
        starRating: action.payload.starRating,
        amountSold: action.payload.amountSold,
        salePrice: action.payload.salePrice,
        actualPrice: action.payload.actualPrice,
      };
      state.cart.push(product);
    },
    removeFromCart: (state, action) => {
      // Remove item by ID
      state.cart = state.cart.filter(
        (product) => product.productId !== action.payload.productId
      );
    },
  },
});

export const { addToCart, removeFromCart } = productTrackerSlice.actions;

export default productTrackerSlice.reducer;
