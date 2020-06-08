import { productGroupTypes } from '@enums/product';

/**
 * @Module
 */

const MasterclassAsync = () => import(/* webpackChunkName: "master-class-view" */ './Masterclass.vue');

/**
 * Модуль компонента Masterclass
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Masterclass',
            path: '/masterclasses/:code',
            component: MasterclassAsync,
        },
    ],
};
