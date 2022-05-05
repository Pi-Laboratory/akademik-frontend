import en from "../locales/en/translations.json";
import id from "../locales/id/translations.json";

const translations = {
  en,
  id
}

export const useTranslations = (language = "id")=> {
  return translations[language];
}