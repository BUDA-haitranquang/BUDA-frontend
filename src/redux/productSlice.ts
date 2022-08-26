import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../assets/productData";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action) => {
      const productId = state.products.findIndex(
        (item) => item.id === Number(action.payload)
      );
      state.products = state.products.filter((item) => item.id === productId);
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    fetchData: (state, action) => {
      state.products = productData as Array<any>;
    },
  },
});

export const { setProduct, deleteProduct, addProduct, fetchData } =
  productSlice.actions;

export default productSlice.reducer;
