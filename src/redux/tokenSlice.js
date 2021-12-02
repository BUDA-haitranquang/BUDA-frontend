import { createSlice } from "@reduxjs/toolkit";
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    isAuth: false,
    jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJidWRhdGVzdGVyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjE2MzgwMjkyMjMsInVzZXJJRCI6MiwiaWF0IjoxNjM3ODU2NDIzfQ.zKL3ssN8wj9Zdkr2fUS-8B8VrA0akQi2gx16hf_T4yFyoP1qGC3fNdqi550357PfRipoiOSScnaoik8fD9r-jQ",
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
