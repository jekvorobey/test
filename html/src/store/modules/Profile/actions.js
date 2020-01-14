import { getProducts } from '../../../api';
import { $logger } from '../../../services/ServiceLocator';
import { SET_PROMO_DATA } from './mutations';

export const FETCH_PROMO_DATA = 'FETCH_PROMO_DATA';
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';

export default {
    [FETCH_PROMO_DATA]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_PROMO_DATA, { products: data.items.slice(0, 5) }))
            .catch(error => $logger.error(`${FETCH_PROMO_DATA} ${error}`));
    },

    [UPDATE_BREADCRUMB]({ commit }, payload) {
        commit(UPDATE_BREADCRUMB, payload);
    },
};
