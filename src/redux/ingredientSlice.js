import { createSlice } from "@reduxjs/toolkit";
//import productData from "../assets/productData";

const ingredientSlice = createSlice({
    name: "ingredient",
    initialState: {
        ingredients: [],
    },
    reducers: {
        setIngredient: (state, action) => {
            state.ingredients = action.payload;
        },
        deleteIngredient: (state, action) => {
            const ingredientId = state.ingredients.findIndex(
                (item) => item.id === Number(action.payload)
            );
            state.ingredients = state.ingredients.filter(
                (item) => item.id === ingredientId
            )
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        fetchData: (state, action) => {
  //          state.ingredients = ingredientData;
        }
    }
})

export const {setIngredient, deleteIngredient, addIngredient, fetchData} = ingredientSlice.actions;

export default ingredientSlice.reducer;