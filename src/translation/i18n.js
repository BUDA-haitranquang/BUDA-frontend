import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/en/translation";
import translationVI from "../locales/vi/translation";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

let loadPath = "../locales/{{lng}}/{{ns}}.json";

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    // detection: {
    //   order: ["cookie", "querystring"],
    //   lookupCookie: "lang",
    // },
    resources,
    // fallbackLng: "en",
    // lng: window.localStorage.getItem('language'),
    supportedLngs: ["en", "vi"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "language",
      caches: ["localStorage"]
    }
    // ns:[
    //     "common",
    //     "error",
    // ],
    // backend: {
    //   // backend: Http,
    //   loadPath: loadPath,
    //   // backendOption: {
    //   //   loadPath: "/v3/locales/{{lng}}/{{ns}}.json",
    //   // },
    // },
  });

export const changeLanguageHandler = (lang) => {
  window.localStorage.setItem('language', lang);
  i18n.changeLanguage(lang);
};

export default i18n;
