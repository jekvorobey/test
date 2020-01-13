/**
 * @Module
 */

const AddressesAsync = () => import(/* webpackChunkName: "addresses-view" */ './Addresses.vue');

/**
 * Модуль компонента Addresses
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Addresses',
            path: 'addresses',
            component: AddressesAsync,
        },
    ],
};
