import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import customerReducer from "./customerSlice";
import productReducer from "./productSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  customer: customerReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
});

export const persistor = persistStore(store);

export default store;
