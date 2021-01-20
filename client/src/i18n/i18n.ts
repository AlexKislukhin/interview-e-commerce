import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import ruTranslation from "./locales/ru/translation.json";

const resources = {
    en: enTranslation,
    ru: ruTranslation,
};

i18next.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: true,
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
});

export default i18next;
