/**
 * @Module
 */

const CustomAsync = () => import(/* webpackChunkName: "custom-view" */ './Custom.vue');

/**
 * Модуль компонента CustomTextPage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Custom',
            path: '/custom', // ! Заглушка. Потом нужно будет удалить.
            component: CustomAsync,
        },
    ],
};
