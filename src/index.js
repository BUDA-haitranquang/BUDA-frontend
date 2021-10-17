import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./Router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
