import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./next-i18next.config";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(r => console.log("i18n initialized"));

export default i18n;
