import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en', // Domyślny język
        supportedLngs: ['en', 'pl', 'de'], // Obsługiwane języki
        nonExplicitSupportedLngs: true, // Obsługuje kody jak 'en-US' -> 'en'
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
        // Dodanie funkcji obsługującej brakujące tłumaczenia
        load: 'languageOnly', // Używa tylko 'en', pomijając 'en-US'
        missingKeyHandler: (lng, ns, key, fallbackValue) => {
            console.warn(`Missing key: ${key} in ${lng}`);
        },
    });

export default i18n;
