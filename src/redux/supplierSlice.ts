import { createSlice } from "@reduxjs/toolkit";
//import customerData from "../assets/customerData";
const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
  },
  reducers: {
    setSupplier: (state, action) => {
      state.suppliers = action.payload;
    },
    deleteSupplier: (state, action) => {
      const supplierId = state.suppliers.findIndex(
        (item) => item.id === Number(action.payload)
      );
      state.suppliers = state.suppliers.filter(
        (item) => item.id === supplierId
      );
    },
    addSupplier: (state, action) => {
      state.suppliers.push(action.payload);
    },
    fetchData: (state, action) => {
      // state.suppliers = supplierData;
    },
  },
});

export const { setSupplier, deleteSupplier, addSupplier, fetchData } =
  supplierSlice.actions;
export default supplierSlice.reducer;
