import { getProducts } from '../../../api';
import { $logger } from '../../../services/ServiceLocator';
import { SET_PROMO_DATA } from './mutations';

export const FETCH_PROMO_DATA = 'FETCH_PROMO_DATA';
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';
export const UPDATE_PORTFOLIOS = 'UPDATE_PORTFOLIOS';
export const UPDATE_PROFILES = 'UPDATE_PROFILES';
export const UPDATE_REQUISITES = 'UPDATE_REQUISITES';
export const UPDATE_PROMOPAGE_NAME = 'UPDATE_PROMOPAGE_NAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';

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

    [UPDATE_PROFILES]({ commit }, payload = []) {
        commit(UPDATE_PROFILES, payload);
    },

    [UPDATE_PORTFOLIOS]({ commit }, payload = []) {
        commit(UPDATE_PORTFOLIOS, payload);
    },

    [UPDATE_REQUISITES]({ commit }, payload = {}) {
        commit(UPDATE_REQUISITES, payload);
    },

    [UPDATE_BREADCRUMB]({ commit }, payload) {
        commit(UPDATE_BREADCRUMB, payload);
    },

    [UPDATE_PROMOPAGE_NAME]({ commit }, payload) {
        commit(UPDATE_PROMOPAGE_NAME, payload);
    },

    [UPDATE_EMAIL]({ commit }, payload) {
        commit(UPDATE_EMAIL, payload);
    },

    [FETCH_PROMO_DATA]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_PROMO_DATA, { products: data.items.slice(0, 5), name: 'Я рекомендую' }))
            .catch(error => $logger.error(`${FETCH_PROMO_DATA} ${error}`));
    },
};
