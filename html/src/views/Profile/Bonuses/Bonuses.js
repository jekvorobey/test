/**
 * @Module
 */

const BonusesAsync = () => import(/* webpackChunkName: "bonuses-view" */ './Bonuses.vue');

/**
 * Модуль компонента Bonuses
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Bonuses',
            path: 'bonusy/',
            pathToRegexpOptions: { strict: true },
            component: BonusesAsync,

            meta: {
                skipScroll: true,
            },
        },
    ],
};
