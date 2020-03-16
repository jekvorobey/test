import { $logger } from '@services';
import { getProducts } from '@api';
import { SET_FEATURED_PRODUCTS } from './mutations';

export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';

export default {
    [FETCH_FEATURED_PRODUCTS]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_FEATURED_PRODUCTS, data.items))
            .catch(error => {
                $logger.error(`${FETCH_FEATURED_PRODUCTS} ${error}`);
                return {};
            });
    },
};
