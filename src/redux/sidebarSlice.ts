import { createSlice } from "@reduxjs/toolkit";
//import customerData from "../assets/customerData";
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    focus: "",
  },
  reducers: {
    setFocus: (state, action) => {
      state.focus = action.payload;
    } 
  },
});

export const { setFocus } = sidebarSlice.actions;
export default sidebarSlice.reducer;
