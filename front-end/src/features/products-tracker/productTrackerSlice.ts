import { TProductData } from "@/types/main";
import { State } from "@/types/store-types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: State = {
  cart: [],
  likedProducts: [],
  purchasedProducts: [],
};

const createProductInstance = (
  action: PayloadAction<TProductData>,
  overwrites: { cartProductId: string } | { likedProductId: string }
): TProductData & ({ cartProductId: string } | { likedProductId: string }) => {
  return {
    ...overwrites,
    productId: action.payload.productId,
    productName: action.payload.productName,
    productImage: action.payload.productImage,
    productBrand: action.payload.productBrand,
    starRating: action.payload.starRating,
    amountSold: action.payload.amountSold,
    salePrice: action.payload.salePrice,
    actualPrice: action.payload.actualPrice,
  };
};

export const productTrackerSlice = createSlice({
  name: "product-tracker",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TProductData>) => {
      const product = createProductInstance(action, {
        cartProductId: nanoid(),
      });

      console.log({ product });

      if ("cartProductId" in product) {
        state.cart.push(product);
      }
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
    addToLikedProducts: (state, action: PayloadAction<TProductData>) => {
      const product = createProductInstance(action, {
        likedProductId: nanoid(),
      });

      if ("likedProductId" in product) {
        state.likedProducts.push(product);
      }
    },
    removeFromLikedProducts: (
      state,
      action: PayloadAction<{ productId: number }>
    ) => {
      // Remove item by ID
      state.likedProducts = state.likedProducts.filter(
        (product) => product.productId !== action.payload.productId
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addToLikedProducts,
  removeFromLikedProducts,
} = productTrackerSlice.actions;

export default productTrackerSlice.reducer;
