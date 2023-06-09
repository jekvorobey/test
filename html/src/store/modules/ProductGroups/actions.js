import { storeErrorHandler } from '@util/store';
import { getProductGroups, getBrandsActive } from '@api';
import { productGroupTypes } from '@enums/product';
import { SET_ITEMS_MORE, SET_ITEMS, SET_LOAD_PATH as M_SET_LOAD_PATH, SET_TYPE as M_SET_TYPE } from './mutations';

export const SET_TYPE = 'SET_TYPE';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const FETCH_ITEMS = 'FETCH_ITEMS';

export default {
    async [FETCH_ITEMS]({ commit }, { type, page, orderField, orderDirection, showMore }) {
        try {
            let productGroups;

            if (type === productGroupTypes.BRANDS) {
                const activeBrandsList = await getBrandsActive({
                    params: {
                        is_visible: true,
                    },
                });
                productGroups = {
                    items: activeBrandsList[0].values,
                    range: activeBrandsList[0].values.length,
                };
            } else {
                productGroups = await getProductGroups(type, page, orderField, orderDirection);
            }

            const { items, range } = productGroups;

            if (showMore) commit(SET_ITEMS_MORE, { items, range });
            else commit(SET_ITEMS, { items, range });
            commit(SET_TYPE, type);
        } catch (error) {
            storeErrorHandler(FETCH_ITEMS, true)(error);
        }
    },

    [SET_TYPE]({ commit }, payload) {
        commit(M_SET_TYPE, payload);
    },

    [SET_LOAD_PATH]({ commit }, payload) {
        commit(M_SET_LOAD_PATH, payload);
    },
};
