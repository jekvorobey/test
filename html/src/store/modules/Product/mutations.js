import { pointType } from '@enums/checkout';

const pickupPointTypes = [
    {
        id: pointType.TYPE_PICKUP_POINT,
        title: 'Пункт выдачи заказа',
    },
    {
        id: pointType.TYPE_POSTOMAT,
        title: 'Постомат',
    },
    {
        id: pointType.TYPE_RU_POST_OFFICE,
        title: 'Отделение почты России',
    },
    {
        id: pointType.SERVICE_TERMINAL,
        title: 'Терминал',
    },
];

export const SET_REFERRER_CODE = 'SET_REFERRER_CODE';

export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCT_OPTIONS = 'SET_PRODUCT_OPTIONS';
export const SET_PICKUP_POINTS = 'SET_PICKUP_POINTS';
export const SET_MASTERCLASSES = 'SET_MASTERCLASSES';

export const SET_BANNERS = 'SET_BANNERS';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';

export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';
export const SET_SELECTED_PICKUP_POINT_TYPE = 'SET_SELECTED_PICKUP_POINT_TYPE';

export const SET_PRODUCT_BUNDLES = 'SET_PRODUCT_BUNDLES';

export default {
    [SET_PRODUCT](state, payload = {}) {
        state.productCode = payload.code;
        state.product = payload;
    },

    [SET_MASTERCLASSES](state, payload) {
        const { items = [] } = payload || {};
        state.masterClasses = items;
    },

    [SET_PICKUP_POINTS](state, payload) {
        state.pickupPoints = payload || [];
        state.pickupPointTypes = pickupPointTypes.filter((t) => state.pickupPoints.some((p) => p.methodID === t.id));
    },

    [SET_SELECTED_PICKUP_POINT](state, { point, index }) {
        state.selectedIndex = index;
        state.selectedPickupPoint = point;
    },

    [SET_SELECTED_PICKUP_POINT_TYPE](state, payload) {
        state.selectedPickupPointType = payload;
    },

    [SET_PRODUCT_OPTIONS](state, payload = null) {
        state.productOptions = payload;
    },

    [SET_REFERRER_CODE](state, payload) {
        state.referrerCode = payload || null;
    },

    [SET_BANNERS](state, payload = []) {
        state.banners = payload;
    },

    [SET_FEATURED_PRODUCTS](state, payload = {}) {
        const { items = [], range = 0 } = payload;
        state.featuredProducts = { items: items.slice(0, 6), range: range || 0 };
    },

    [SET_PRODUCT_BUNDLES](state, payload = []) {
        state.productBundles = payload;
    },
};
