import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'catalog';
export const CATEGORY_ID = 'categoryId';
export const CATEGORY_CODE = 'categoryCode';
export const CATEGORIES = 'categories';
export const ITEMS = 'items';
export const FILTERS = 'filters';
export const RANGE = 'range';
export const BANNER = 'banner';
export const LOAD = 'load';

const filters = [
    {
        id: 1,
        title: 'Цена р.',
        name: 'price',
        type: 'range',
        max: 1000,
        min: 0,
    },
    {
        id: 2,
        title: 'Бренды',
        name: 'brand',
        type: 'check',
        items: [
            {
                id: 1,
                name: 'L’Oreal Paris',
                code: 'brand-loreal',
            },
            {
                id: 2,
                name: 'Maybelline',
                code: 'brand-maybelline',
            },
            {
                id: 3,
                name: 'Pupa',
                code: 'brand-pupa',
            },
        ],
    },
    {
        id: 3,
        title: 'Средства',
        name: 'tool',
        type: 'check',
        values: [],
        items: [
            {
                id: 1,
                name: 'Жидкая помада для губ',
                code: 'tool-zhidkaya_pomada_dlya_gub',
            },
            {
                id: 2,
                name: 'Помада для губ',
                code: 'tool-pomada_dlya_gub',
            },
            {
                id: 3,
                name: 'Гигиеническая помада для губ',
                code: 'tool-gigienicheskaya_pomada_dlya_gub',
            },
        ],
    },
    {
        id: 4,
        title: 'Эффекты',
        name: 'effect',
        type: 'radio',
        items: [
            {
                id: 1,
                name: 'Глянцевая',
                code: 'effect-glyancevaya',
            },
            {
                id: 2,
                name: 'Матовая',
                code: 'effect-matovaya',
            },
            {
                id: 3,
                name: 'Перламутровая',
                code: 'effect-perlamutrovaya',
            },
        ],
    },
];

export default {
    name: NAME,
    namespaced: true,
    state: {
        [LOAD]: false,
        [BANNER]: {},
        [CATEGORY_ID]: null,
        [CATEGORY_CODE]: null,
        [CATEGORIES]: [],
        [ITEMS]: [],
        [RANGE]: 0,
        [FILTERS]: filters,
    },
    actions,
    mutations,
    getters,
};
