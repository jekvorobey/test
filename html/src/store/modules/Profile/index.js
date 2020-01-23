import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'profile';
export const PROMO_DATA = 'promoData';
export const CABINET_DATA = 'cabinetData';
export const BREADCRUMBS = 'breadcrumbs';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [BREADCRUMBS]: [],
        [PROMO_DATA]: null,
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

            availableProfiles: [
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
        },
    },
    actions,
    mutations,
    getters,
};
