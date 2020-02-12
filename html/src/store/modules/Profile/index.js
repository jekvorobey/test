import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'profile';
export const BREADCRUMBS = 'breadcrumbs';

export const PROMO_DATA = 'promoData';
export const CABINET_DATA = 'cabinetData';
export const PREFERENCES_DATA = 'preferencesData';
export const MESSAGES_DATA = 'messagesData';

export const PRO_PREFERENCES_DATA = 'proPreferencesData';

export const AVAILABLE_PROFILES = 'availableProfiles';
export const AVAILABLE_CATEGORIES = 'availableCategories';
export const AVAILABLE_BRANDS = 'availableBrands';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [BREADCRUMBS]: [],

        [PROMO_DATA]: null,

        [AVAILABLE_BRANDS]: [
            { id: 1, name: 'L’Oreal Paris' },
            { id: 2, name: 'Carolina Herrera' },
            { id: 3, name: 'Crystal' },
            { id: 4, name: 'Arabesque Perfumes' },
            { id: 5, name: 'gli elementi' },
            { id: 6, name: 'Gliss Kur' },
            { id: 7, name: 'Jimmy Choo' },
            { id: 8, name: 'ADIDAS' },
        ],

        [AVAILABLE_CATEGORIES]: [
            { id: 1, name: 'Кондиционер: Смываемый' },
            { id: 2, name: 'Лицо' },
            { id: 3, name: 'Глаза: Тени' },
            { id: 4, name: 'Глаза: Подводка' },
        ],

        [AVAILABLE_PROFILES]: [
            {
                id: 1,
                name: 'Стилист',
            },
            {
                id: 2,
                name: 'Визажист',
            },
            {
                id: 3,
                name: 'Парикмахер',
            },
            {
                id: 4,
                name: 'Нейл-мастер',
            },
            {
                id: 5,
                name: 'Колорист',
            },
        ],

        [CABINET_DATA]: {
            name: 'Динис',
            lastName: 'Базгутдинов',
            middleName: '',

            bornDate: null,
            sex: 'Мужской',
            phone: '+7 916 123-45-67',
            email: 'disbag@gmail.com',

            portfolios: [
                {
                    id: 1,
                    name: 'Работы в Инстаграме',
                    ref: 'https://www.instagram.com/shpilka',
                },
                {
                    id: 2,
                    name: 'Портфолио «Свадебные прически»',
                    ref: 'https://www.vargaevamarina.com/',
                },
            ],

            profiles: [
                {
                    id: 1,
                    name: 'Стилист',
                },
                {
                    id: 2,
                    name: 'Визажист',
                },
            ],

            requisites: {
                name: null,
                inn: null,
                bik: null,
                bank: null,
                account: null,
                correspondentAccount: null,
                address: null,
            },
        },

        [PREFERENCES_DATA]: {
            brands: [
                { id: 3, name: 'Crystal' },
                { id: 4, name: 'Arabesque Perfumes' },
                { id: 5, name: 'gli elementi' },
            ],

            categories: [
                { id: 1, name: 'Кондиционер: Смываемый' },
                { id: 2, name: 'Лицо' },
            ],
        },

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
                    message: 'К сожалению, пока что шампуней Aveda нет в наличии. Но вы можете обратить внимание на...',
                    isRead: true,
                    isSystem: true,
                    date: '2019-07-02',
                },
            ],

            messageDetail: null,
        },

        [PRO_PREFERENCES_DATA]: {
            brands: [{ id: 5, name: 'gli elementi' }],
            categories: [{ id: 1, name: 'Кондиционер: Смываемый' }],
        },
    },
    actions,
    mutations,
    getters,
};
