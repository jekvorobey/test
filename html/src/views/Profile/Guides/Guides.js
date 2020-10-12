/**
 * @Module
 */

const GuidesAsync = () => import(/* webpackChunkName: "guides-view" */ './Guides.vue');

/**
 * Модуль компонента Guides
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Guides',
            path: 'guides/',
            pathToRegexpOptions: { strict: true },
            component: GuidesAsync,
        },
    ],
};
