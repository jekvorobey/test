import { productGroupTypes } from '../../assets/scripts/enums';

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
            path: `/${productGroupTypes.MASTERCLASSES}/:code`,
            component: MasterclassAsync,
        },
    ],
};
