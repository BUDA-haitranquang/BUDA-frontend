import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import i18n from "src/translation/i18n";
import ThemeProvider from "src/theme/globalTheme";
import FallbackLoading from "src/components/FallbackLoading";
import App from "src/App";

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
                <div>
                  <App />
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
