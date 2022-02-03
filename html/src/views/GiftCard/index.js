/**
 * @Module
 */

const GiftCardAsync = () => import(/* webpackChunkName: "certificate-view" */ './GiftCard.vue');
const GiftCardTestAsync = () => import(/* webpackChunkName: "certificate-test-view" */ './GiftCardTest.vue');

/**
 * Модуль компонента University
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/podarocnye-sertifikaty',
            component: GiftCardAsync,
        },
        {
            path: '/podarocnye-sertifikaty/test',
            component: GiftCardTestAsync,
        },
    ],
};
