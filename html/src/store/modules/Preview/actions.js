import { getProduct } from '../../../api';
import { SET_PRODUCT_PREVIEW, SET_PRODUCT_PREVIEW_STATUS } from './mutations';
import { $logger } from '../../../services/ServiceLocator';
import { requestStatus } from '../../../assets/scripts/enums/general';

export const FETCH_PRODUCT_PREVIEW = 'FETCH_PRODUCT_PREVIEW';

export default {
    [FETCH_PRODUCT_PREVIEW]({ commit }, payload) {
        commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.PENDING);
        return getProduct(payload)
            .then(data => {
                commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.SUCCESS);
                commit(SET_PRODUCT_PREVIEW, data);
            })
            .catch(error => {
                commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.ERROR);
                $logger.error(`${FETCH_PRODUCT_PREVIEW} ${error}`);
            });
    },
};
