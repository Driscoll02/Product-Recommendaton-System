import { TProductData } from "@/types/main";
import { State } from "@/types/store-types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: State = {
  cart: [],
  likedProducts: [],
  purchasedProducts: [],
};

export const productTrackerSlice = createSlice({
  name: "product-tracker",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TProductData>) => {
      const product: TProductData & { cartProductId: string } = {
        cartProductId: nanoid(),
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
    removeFromCart: (
      state,
      action: PayloadAction<{ cartProductId: string }>
    ) => {
      // Remove item by ID
      state.cart = state.cart.filter(
        (product) => product.cartProductId !== action.payload.cartProductId
      );
    },
  },
});

export const { addToCart, removeFromCart } = productTrackerSlice.actions;

export default productTrackerSlice.reducer;
