import { DEFAULT_PAGE } from '@constants';
import { BONUSES_PAGE_SIZE } from '@constants/profile';
import { storeErrorHandler } from '@util/store';

import { getBonusesData } from '@api';
import { SET_BONUSES_DATA, SET_ITEMS, SET_ITEMS_MORE } from './mutations';

export const FETCH_BONUSES_DATA = 'FETCH_BONUSES_DATA';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_BONUSES_DATA](
        { dispatch, commit },
        { page = DEFAULT_PAGE, perPage = BONUSES_PAGE_SIZE, showMore = false }
    ) {
        try {
            const data = await getBonusesData(page, perPage);
            commit(SET_BONUSES_DATA, data);

            const {
                bonuses: { items, total: range },
            } = data;

            if (showMore) commit(SET_ITEMS_MORE, { items, range });
            else commit(SET_ITEMS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_BONUSES_DATA, true)(error);
        }
    },
};
