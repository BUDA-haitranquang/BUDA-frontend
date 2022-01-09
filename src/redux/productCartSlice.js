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
            state.productCart.push(action.payload);
        },
        fetchData: (state, action) => {
            state.productCart = productData;
        }
    }
})

export const {setProductCart, clearProductCart, addProductCart, fetchData} = productCartSlice.actions;

export default productCartSlice.reducer;