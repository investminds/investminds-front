import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/locale/en.json";
import ptBr from "../assets/locale/ptBr.json";

export const supoortedLocales = {
  en: "English",
  ptBr: "Português",
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: Object.keys(supoortedLocales),
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    ptBr: {
      translation: ptBr,
    },
  },
});

export default i18n;
