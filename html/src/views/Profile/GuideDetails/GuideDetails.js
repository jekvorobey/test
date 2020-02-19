/**
 * @Module
 */

const GuideDetailsAsync = () => import(/* webpackChunkName: "guide-details-view" */ './GuideDetails.vue');

/**
 * Модуль компонента GuideDetails
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'GuideDetails',
            path: 'guides/:guideId',
            component: GuideDetailsAsync,
        },
    ],
};
