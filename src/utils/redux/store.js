import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categories";

export const store = configureStore({
  reducer: {
    category: categoryReducer
  }
});
