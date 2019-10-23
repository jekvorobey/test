// import { $logger } from '../../../services/ServiceLocator';
import { getProduct } from '../../../api';
import { SET_PRODUCT } from './mutations';

export const FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export default {
    [FETCH_PRODUCT]({ commit }, payload) {
        return getProduct(payload).then(data => commit(SET_PRODUCT, data));
    },

    [FETCH_PRODUCT_DATA]({ dispatch }, payload) {
        return Promise.all([dispatch(FETCH_PRODUCT, payload)]);
    },
};
