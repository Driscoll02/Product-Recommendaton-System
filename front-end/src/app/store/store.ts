import { configureStore } from "@reduxjs/toolkit";
import productTrackerReducer from "@/features/products-tracker/productTrackerSlice";

export const store = configureStore({
  reducer: productTrackerReducer,
});
