import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://investa-be.onrender.com/investa/v1";

export const fetchStock = createAsyncThunk(
  "fetch/stocks",
  async (stockName: string) => {
    const res = await axios.get(
      `${API_BASE_URL}/stock/${stockName}`
    );
    return res.data;
  }
);

const stockReducer = createSlice({
  name: "stock",
  initialState: {
    stock: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStock.fulfilled, (state, action) => {
      state.stock = action.payload;
    });
  },
  reducers: {
    addStock: (state, action) => {
      state.stock = action.payload;
    },
  },
});

export default stockReducer.reducer;
export const { addStock } = stockReducer.actions;
