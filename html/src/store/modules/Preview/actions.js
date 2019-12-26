import { getProduct } from '../../../api';
import { SET_PRODUCT_PREVIEW } from './mutations';
import { $logger } from '../../../services/ServiceLocator';

export const FETCH_PRODUCT_PREVIEW = 'FETCH_PRODUCT_PREVIEW';

export default {
    [FETCH_PRODUCT_PREVIEW]({ commit }, payload) {
        return getProduct(payload)
            .then(data => commit(SET_PRODUCT_PREVIEW, data))
            .catch(error => {
                $logger.error(`${FETCH_PRODUCT_PREVIEW} ${error}`);
            });
    },
};
