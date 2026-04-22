import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

function getInitialLang(): "en" | "ar" {
  if (typeof document === "undefined") return "en"; // SSR
  const match = document.cookie.match(/(?:^|;\s*)i18n_lang=([^;]+)/);
  const val = match?.[1];
  return val === "en" || val === "ar" ? val : "en";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: getInitialLang(),
    resources: {
      en: { common: en },
      ar: { common: ar },
    },
    defaultNS: "common",
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: { escapeValue: false },
  });
}

export default i18n;