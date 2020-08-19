import { getProduct } from '@api';
import { requestStatus } from '@enums';
import { storeErrorHandler } from '@util/store';
import { SET_PRODUCT_PREVIEW, SET_PRODUCT_PREVIEW_STATUS } from './mutations';

export const FETCH_PRODUCT_PREVIEW = 'FETCH_PRODUCT_PREVIEW';

export default {
    async [FETCH_PRODUCT_PREVIEW]({ commit }, { offerId, code }) {
        try {
            commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.PENDING);
            let data = null;
            if (code) data = await getProduct(code);
            else data = await getProduct(undefined, offerId);
            commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.SUCCESS);
            commit(SET_PRODUCT_PREVIEW, data);
        } catch (error) {
            commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.ERROR);
            storeErrorHandler(FETCH_PRODUCT_PREVIEW, true)(error);
        }
    },
};
