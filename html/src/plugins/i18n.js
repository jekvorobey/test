import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import ruLocalization from '../assets/localization/ru';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'ru', // set locale
    fallbackLocale: 'en',
    messages: {
        ru: ruLocalization,
    }, // set locale messages
});

const loadedLanguages = ['ru']; // our default language that is preloaded

function setI18nLanguage(lang) {
    i18n.locale = lang;
    axios.defaults.headers.common['Accept-Language'] = lang;
    document.querySelector('html').setAttribute('lang', lang);
    return lang;
}

export function loadLanguageAsync(lang) {
    if (i18n.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            return import(/* webpackChunkName: "lang-[request]" */ `../assets/localization/${lang}`).then(msgs => {
                i18n.setLocaleMessage(lang, msgs.default);
                loadedLanguages.push(lang);
                return setI18nLanguage(lang);
            });
        }
        return Promise.resolve(setI18nLanguage(lang));
    }
    return Promise.resolve(lang);
}

export default i18n;
