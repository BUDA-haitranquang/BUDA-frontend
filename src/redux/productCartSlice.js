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
      const duplicateIndex = state.productCart.findIndex((item) => item.productID === action.payload.productID);
      if(duplicateIndex !== -1) state.productCart[duplicateIndex].quantity ++;
      else {
        const newProduct = {...action.payload, quantity: 1};
        state.productCart.push(newProduct);
      } 
    },
    changePriceProductCart: (state, action) => {
      const index = state.productCart.findIndex((item) => item.productID === action.payload.productID);
      state.productCart[index].sellingPrice = action.payload.price;
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
  changePriceProductCart,
  deleteProductCart,
  fetchData,
} = productCartSlice.actions;

export default productCartSlice.reducer;
