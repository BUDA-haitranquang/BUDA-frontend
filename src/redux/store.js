import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import customerReducer from "./customerSlice";
import productReducer from "./productSlice";
import ingredientReducer from './ingredientSlice';
import supplierReducer from './supplierSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import tokenReducer from './tokenSlice'
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  customer: customerReducer,
  product: productReducer,
  ingredient: ingredientReducer,
  supplier:supplierReducer,
  token:tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
});

export const persistor = persistStore(store);

export default store;
