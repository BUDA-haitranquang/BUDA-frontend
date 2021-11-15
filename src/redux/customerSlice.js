import { createSlice } from "@reduxjs/toolkit";
import customerData from "../assets/customerData";
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
  },
  reducers: {
    setCustomer: (state, action) => {
      state.customers = action.payload;
    },
    deleteCustomer: (state, action) => {
      const customerId = state.customers.findIndex(
        (item) => item.id === Number(action.payload)
      );
      state.customers = state.customers.filter(
        (item) => item.id === customerId
      );
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    fetchData: (state, action) => {
      state.customers = customerData;
      console.log("fetch customers");
    },
  },
});

export const { setCustomer, deleteCustomer, addCustomer, fetchData } =
  customerSlice.actions;
export default customerSlice.reducer;
