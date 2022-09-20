import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../assets/productData";

const productCartSlice = createSlice({
  name: "productCart",
  initialState: {
    productCart: [],
    totalPrice: 0,
    discount: {},
    customer: {},
    finalAmount: 0,
  },
  reducers: {
    setProductCart: (state, action) => {
      state.productCart = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    calculateTotalPrice: (state, action) => {
      const data = state.productCart;
      let total = 0;
      const calculateSum = (item) => {
        total += item.quantity * item.sellingPrice;
      };
      data.forEach(calculateSum);
      state.totalPrice = total;
    },
    addDiscount: (state, action) => {
      state.discount = action.payload;
    },
    deleteDiscount: (state, action) => {
      state.discount = null;
    },
    calculateFinalAmount: (state, action) => {
      state.finalAmount = action.payload;
    },
    clearProductCart: (state, action) => {
      state.productCart = [];
      state.customer = null;
      state.discount = null;
    },
    addProductCart: (state, action) => {
      const duplicateIndex = state.productCart.findIndex(
        (item) => item.productID === action.payload.productID
      );
      if (duplicateIndex !== -1) state.productCart[duplicateIndex].quantity++;
      else {
        const newProduct = { ...action.payload, quantity: 1 };
        state.productCart.push(newProduct);
      }
    },
    changeProductCartItem: (state, action) => {
      const index = state.productCart.findIndex(
        (item) => item.productID === action.payload.productID
      );
      state.productCart[index] = action.payload;
    },
    deleteProductCart: (state, action) => ({
      ...state,
      productCart: state.productCart.filter(
        (item) => item.productID !== action.payload.productID
      ),
      //   productCart: state.productCart.filter((val, i) => i !== action.payload),
    }),
    addCustomer: (state, action) => {
      state.customer = action.payload;
    },
    fetchData: (state, action) => {
      state.productCart = productData;
    },
  },
});

export const {
  setProductCart,
  setCustomer,
  clearProductCart,
  addDiscount,
  deleteDiscount,
  addProductCart,
  changeProductCartItem,
  calculateTotalPrice,
  calculateFinalAmount,
  deleteProductCart,
  fetchData,
  addCustomer,
} = productCartSlice.actions;

export default productCartSlice.reducer;
