import { injectable } from 'inversify';
import { injectionType } from '@enums/general';
import { injectableClass, injectClass } from '@util/container';
import { LOCALIZATIONS, LOCALE, FALLBACK_LOCALE } from '@store';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
injectableClass(VueI18n);

/**
 * Инициализация нового экземпляра i18n
 */
export default function createLocalization(container) {
    const store = container.get(injectionType.STORE);
    const localizations = {};

    for (const key in store.state[LOCALIZATIONS]) {
        const localization = store.state[LOCALIZATIONS][key];
        localizations[key] = localization.main;
    }

    const locale = store.state[LOCALE];
    const fallbackLocale = store.state[FALLBACK_LOCALE];

    const i18n = new VueI18n({
        locale, // set locale
        fallbackLocale,
        messages: localizations,
    });

    const localizationService = new Vue({
        i18n,
    });

    container.bind(injectionType.LOCALIZATION).toConstantValue(localizationService);
    return i18n;
}
