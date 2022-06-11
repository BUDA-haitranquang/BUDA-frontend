import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import AppRouter from "./Router";
import i18n from "./translation/i18n";
import ThemeProvider from "./theme/globalTheme";
import FallbackLoading from "./components/FallbackLoading";
import { Box } from "@mui/material";
ReactDOM.render(
  <React.Fragment>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<FallbackLoading />}>
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
          <ThemeProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    minHeight: "100vh",
                  }}
                >
                  {/* <SidebarGlobal /> */}
                  <AppRouter />
                  {/* <Footer /> */}
                </div>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </SnackbarProvider>
      </Suspense>
    </I18nextProvider>
  </React.Fragment>,
  document.getElementById("root")
);
