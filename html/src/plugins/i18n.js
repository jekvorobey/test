import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import flatpickr from 'flatpickr';
import ruLocalization, { flatpickrLocale } from '../assets/localization/ru';
import enLocalization from '../assets/localization/en';
import ServiceLocator from '../services/ServiceLocator';

Vue.use(VueI18n);

const defaultL = 'ru';
const i18n = new VueI18n({
    locale: defaultL, // set locale
    fallbackLocale: 'en',
    messages: {
        ru: ruLocalization,
        en: enLocalization,
    }, // set locale messages
});

flatpickr.localize(flatpickrLocale);

const loadedLanguages = [defaultL, 'en']; // our default language that is preloaded

function setI18nLanguage(lang) {
    i18n.locale = lang;
    axios.defaults.headers.common['Accept-Language'] = lang;
    document.querySelector('html').setAttribute('lang', lang);
    ServiceLocator.$store().dispatch('SET_LOCALE', lang);
    return lang;
}

export function loadLanguageAsync(lang) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            return import(/* webpackChunkName: "lang-[request]" */ `../assets/localization/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default);
                flatpickr.localize(msgs.flatpickrLocale);
                loadedLanguages.push(lang);
                return setI18nLanguage(lang);
            });
        }
        return Promise.resolve(setI18nLanguage(lang));
    }
    return Promise.resolve(lang);
}

export const defaultLang = defaultL;
export default i18n;
