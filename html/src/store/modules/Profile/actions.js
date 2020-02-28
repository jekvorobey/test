import store, { storeErrorHandler } from '../../../util/store';
import { getProducts } from '../../../api';
import { SET_PROMO_DATA } from './mutations';

export const FETCH_PROMO_DATA = 'FETCH_PROMO_DATA';
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';
export const UPDATE_PROMOPAGE_NAME = 'UPDATE_PROMOPAGE_NAME';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const DELETE_ENTITY = 'DELETE_ENTITY';
export const DELETE_ALL_ENTITIES = 'DELETE_ALL_ENTITIES';

export default {
    [UPDATE_ENTITIES]({ commit }, payload) {
        commit(UPDATE_ENTITIES, payload);
    },

    [DELETE_ENTITY]({ commit }, payload) {
        commit(DELETE_ENTITY, payload);
    },

    [DELETE_ALL_ENTITIES]({ commit }, payload) {
        commit(DELETE_ALL_ENTITIES, payload);
    },

    [UPDATE_BREADCRUMB]({ commit }, payload) {
        commit(UPDATE_BREADCRUMB, payload);
    },

    [UPDATE_PROMOPAGE_NAME]({ commit }, payload) {
        commit(UPDATE_PROMOPAGE_NAME, payload);
    },

    [FETCH_PROMO_DATA]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_PROMO_DATA, { products: data.items.slice(0, 5), name: 'Я рекомендую' }))
            .catch(error => storeErrorHandler(FETCH_PROMO_DATA, true)(error));
    },
};
