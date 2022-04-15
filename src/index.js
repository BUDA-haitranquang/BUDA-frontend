import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import AppRouter from "./Router";
import i18n from "./translation/i18n";

ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById("root")
);
