import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import cabinet from './modules/Cabinet';
import preferences from './modules/Preferences';
import addresses from './modules/Addresses';
import orders from './modules/Orders';
import seo from './modules/Seo';
import promopage from './modules/Promopage';
import documents from './modules/Documents';
import referral from './modules/Referral';
import billing from './modules/Billing';
import promocodes from './modules/Promocodes';

export const NAME = 'profile';
export const BREADCRUMBS = 'breadcrumbs';

export const PROMO_DATA = 'promoData';
export const MESSAGES_DATA = 'messagesData';

export const AVAILABLE_PROFILES = 'availableProfiles';
export const AVAILABLE_CATEGORIES = 'availableCategories';
export const AVAILABLE_BRANDS = 'availableBrands';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [BREADCRUMBS]: [],

            [MESSAGES_DATA]: {
                messages: [
                    {
                        id: 56835,
                        name: null,
                        lastName: null,
                        title: 'Начисление баллов за заказ №125-7865564-6',
                        message:
                            'Добрый день, Владимир! Мы разобрались в вашей ситуации — 1500 бонусов за заказ №125-7, Добрый день, Владимир! Мы разобрались в вашей ситуации — 1500 бонусов за заказ №125-7',
                        isRead: false,
                        isSystem: true,
                        date: '2019-07-28',
                    },
                    {
                        id: 56822,
                        name: 'Владимир',
                        lastName: 'Соколов',
                        title: 'Доставка в Зеленоград',
                        message: 'Ок, спасибо!',
                        isRead: true,
                        isSystem: false,
                        date: '2019-07-18',
                    },
                    {
                        id: 56577,
                        name: null,
                        lastName: null,
                        title: 'Оплата через юрлицо',
                        message: 'Всегда рады вам помочь!',
                        isRead: true,
                        isSystem: true,
                        date: '2019-07-02',
                    },
                    {
                        id: 56547,
                        name: null,
                        lastName: null,
                        title: 'Шампуни Aveda',
                        message:
                            'К сожалению, пока что шампуней Aveda нет в наличии. Но вы можете обратить внимание на...',
                        isRead: true,
                        isSystem: true,
                        date: '2019-07-02',
                    },
                ],

                messageDetail: null,
            },
        },
        actions,
        mutations,
        getters,

        modules: {
            cabinet: cabinet(),
            preferences: preferences(),
            addresses: addresses(),
            orders: orders(),
            seo: seo(),
            promopage: promopage(),
            documents: documents(),
            referral: referral(),
            billing: billing(),
            promocodes: promocodes(),
        },
    };
}
