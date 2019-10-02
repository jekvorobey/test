import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'landing',
    namespaced: true,
    state: {
        categoryLinks: [
            {
                id: 1,
                title: 'Уход за волосами',
                to: '/',
            },
            {
                id: 2,
                title: 'Для лица и тела',
                to: '/',
            },
            {
                id: 3,
                title: 'Для рук и ног',
                to: '/',
            },
            {
                id: 4,
                title: 'Макияж',
                to: '/',
            },
            {
                id: 5,
                title: 'Для ногтей',
                to: '/',
            },
            {
                id: 6,
                title: 'Инструменты',
                to: '/',
            },
            {
                id: 7,
                title: 'Аксессуары',
                to: '/',
            },
            {
                id: 8,
                title: 'Мужская коллекция',
                to: '/',
            },
        ],
        newProducts: [],
        bestsellerProducts: [],
    },
    actions,
    mutations,
    getters,
};
