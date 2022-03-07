import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import AppRouter from "./Router";

ReactDOM.render(
  <React.Fragment>
    <SnackbarProvider
      maxSnack={1}
      // hideIconVariant={true}
      // classes={{
      //   variantSuccess: "snackSuccess",
      //   variantError: "snackError",
      //   variantWarning: "snackWarning",
      //   variantInfo: "snackInfo",
      // }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
          >
            <AppRouter />
            {/* <Footer /> */}
          </div>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </React.Fragment>,
  document.getElementById("root")
);
