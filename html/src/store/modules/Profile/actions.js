import { getProducts } from '../../../api';
import { $logger } from '../../../services/ServiceLocator';
import { SET_PROMO_DATA } from './mutations';

export const FETCH_PROMO_DATA = 'FETCH_PROMO_DATA';

export default {
    [FETCH_PROMO_DATA]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_PROMO_DATA, { products: data.items.slice(0, 5) }))
            .catch(error => $logger.error(`${FETCH_PROMO_DATA} ${error}`));
    },
};
