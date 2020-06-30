import { productGroupTypes } from '@enums/product';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const MasterclassAsync = () => import(/* webpackChunkName: "masterclass-view" */ './Masterclass.vue');
const MasterclassModuleAsync = () => import(/* webpackChunkName: "masterclasses-view" */ '@store/modules/Masterclass');

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

            meta: {
                middleware: [registerModule(MasterclassModuleAsync)],
            },
        },
    ],
};
