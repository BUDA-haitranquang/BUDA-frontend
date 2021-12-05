import { createSlice } from "@reduxjs/toolkit";
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    isAuth: false,
    jwt: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.isAuth = true;
      state.jwt = action.payload;
    },
    removeToken: (state) => {
      state.isAuth = false;
      state.jwt = "";
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
