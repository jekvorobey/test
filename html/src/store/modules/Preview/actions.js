import { getProduct, getProductOptions } from '@api';
import { requestStatus } from '@enums';
import { storeErrorHandler } from '@util/store';
import {
    SET_PRODUCT_PREVIEW,
    SET_PRODUCT_PREVIEW_STATUS,
    SET_PRODUCT_OPTIONS,
    SET_CODE,
    SET_OFFER_ID,
} from './mutations';

export const FETCH_PRODUCT_PREVIEW = 'FETCH_PRODUCT_PREVIEW';
export const FETCH_PRODUCT_OPTIONS = 'FETCH_PRODUCT_OPTIONS';
export const CLEAR_PRODUCT_PREVIEW_DATA = 'FETCH_PRODUCT_PREVIEW_DATA';

export default {
    [CLEAR_PRODUCT_PREVIEW_DATA]({ commit }) {
        commit(SET_PRODUCT_PREVIEW, null);
        commit(SET_CODE, null);
        commit(SET_OFFER_ID, null);
    },

    async [FETCH_PRODUCT_PREVIEW]({ dispatch, commit }, { offerId, code, clear = false }) {
        try {
            let data = null;

            if (code) {
                if (clear) dispatch(CLEAR_PRODUCT_PREVIEW_DATA);
                commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.PENDING);
                data = await getProduct(code);
                commit(SET_CODE, code);
                commit(SET_OFFER_ID, null);
            } else {
                if (clear) dispatch(CLEAR_PRODUCT_PREVIEW_DATA);
                commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.PENDING);
                data = await getProduct(undefined, offerId);
                commit(SET_OFFER_ID, offerId);
                commit(SET_CODE, null);
            }

            await dispatch(FETCH_PRODUCT_OPTIONS, data.variantGroup);
            commit(SET_PRODUCT_PREVIEW, data);
            commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.SUCCESS);
        } catch (error) {
            commit(SET_PRODUCT_PREVIEW_STATUS, requestStatus.ERROR);
            storeErrorHandler(FETCH_PRODUCT_PREVIEW, true)(error);
        }
    },

    async [FETCH_PRODUCT_OPTIONS]({ state, commit }, payload) {
        try {
            const { groupId } = state;

            if (payload) {
                if (!groupId || groupId !== payload) {
                    const data = await getProductOptions(payload);
                    commit(SET_PRODUCT_OPTIONS, { data, groupId: payload });
                }
            } else commit(SET_PRODUCT_OPTIONS, null);
        } catch (error) {
            commit(SET_PRODUCT_OPTIONS, null);
            storeErrorHandler(FETCH_PRODUCT_OPTIONS)(error);
        }
    },
};
