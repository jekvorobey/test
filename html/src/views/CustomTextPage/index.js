import hasSession from '@router/middleware/hasSession';

/**
 * @Module
 */

const CustomTextPageAsync = () => import(/* webpackChunkName: "custom-text-page" */ './CustomTextPage.vue');

/**
 * Модуль компонента CustomTextPage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'CustomTextPage',
            path: '/custom-text-page', // ! Заглушка. Потом нужно будет удалить.
            component: CustomTextPageAsync,
        },
    ],
};
