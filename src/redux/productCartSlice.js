import { InsertEmoticonOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import productData from "../assets/productData";

const productCartSlice = createSlice({
  name: "productCart",
  initialState: {
    productCart: [],
  },
  reducers: {
    setProductCart: (state, action) => {
      state.productCart = action.payload;
    },
    clearProductCart: (state, action) => {
      state.productCart = [];
    },
    addProductCart: (state, action) => {
      console.log(action.payload);
      state.productCart.push(action.payload);
      //TODO: increase quantity if product already exists
    },
    deleteProductCart: (state, action) => ({
      ...state,
      productCart: state.productCart.filter((item) => item.productID !== action.payload.productID),
    //   productCart: state.productCart.filter((val, i) => i !== action.payload),
    }),
    // deleteProductCart: (state, action) => {
    //   const deleteProductId = action.payload;
    //   state.productCart = state.productCart.filter(item => item.productID !== deleteProductId);
    // },
    fetchData: (state, action) => {
      state.productCart = productData;
    },
  },
});

export const {
  setProductCart,
  clearProductCart,
  addProductCart,
  deleteProductCart,
  fetchData,
} = productCartSlice.actions;

export default productCartSlice.reducer;
