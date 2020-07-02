import { productGroupTypes } from '@enums/product';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const MasterclassesAsync = () => import(/* webpackChunkName: "masterclasses-view" */ './Masterclasses.vue');
const MasterclassModuleAsync = () => import(/* webpackChunkName: "masterclasses-view" */ '@store/modules/Masterclass');

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
                middleware: [registerModule(MasterclassModuleAsync)],
                skipScroll: true,
            },
        },

        {
            path: '/masterclasses/filters/*',
            component: MasterclassesAsync,

            meta: {
                middleware: [registerModule(MasterclassModuleAsync)],
                skipScroll: true,
            },
        },
    ],
};
