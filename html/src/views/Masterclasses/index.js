import { productGroupTypes } from '@enums/product';

/**
 * @Module
 */

const MasterclassesAsync = () => import(/* webpackChunkName: "masterclasses-view" */ './Masterclasses.vue');

/**
 * Модуль компонента Masterclasses
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'CatalogMasterclasses',
            path: '/masterclasses',
            component: MasterclassesAsync,
            meta: {
                skipScroll: true,
            },
        },
    ],
};
