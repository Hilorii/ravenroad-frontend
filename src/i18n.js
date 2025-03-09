import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'pl', 'de'],
        nonExplicitSupportedLngs: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        detection: {
            order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag'],
            caches: ['localStorage', 'cookie'],
        },
        load: 'languageOnly',
        missingKeyHandler: (lng, ns, key, fallbackValue) => {
            console.warn(`Missing key: ${key} in ${lng}`);
        },
    });

export default i18n;
