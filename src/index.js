import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./Router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div style={{
          display:"flex", 
          flexDirection:"column", 
          justifyContent: "space-between",
          minHeight: "100vh"}}>
          <AppRouter />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
