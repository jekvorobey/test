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
            path: 'bonuses',
            component: BonusesAsync,

            meta: {
                skipScroll: true,
            },
        },
    ],
};
