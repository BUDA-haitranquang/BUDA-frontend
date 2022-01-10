import { createSlice } from "@reduxjs/toolkit";
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    isAuth: false,
    jwt: "",
    refreshJwt: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.isAuth = true;
      state.jwt = action.payload;
    },
    addRefreshToken: (state, action) => {
      state.refreshJwt = action.payload;
    },
    removeToken: (state) => {
      state.isAuth = false;
      state.jwt = "";
    },
  },
});

export const { addToken, addRefreshToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
