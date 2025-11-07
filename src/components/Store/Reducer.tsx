import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStock = createAsyncThunk(
  "fetch/stocks",
  async (stockName) => {
    const res = await axios.get(
      `http://localhost:4000/investa/v1/stock/${stockName}`
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
