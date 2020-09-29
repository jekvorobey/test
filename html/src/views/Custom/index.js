import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const CustomAsync = () => import(/* webpackChunkName: "custom-view" */ './Custom.vue');
const CustomModuleAsync = () => import(/* webpackChunkName: "custom-view" */ '@store/modules/Custom');

/**
 * Модуль компонента CustomTextPage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '*',
            name: 'Custom',
            component: CustomAsync,

            meta: {
                middleware: [registerModule(CustomModuleAsync)],
            },
        },
    ],
};
