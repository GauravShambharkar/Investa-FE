import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "../Store/Reducer";

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});
