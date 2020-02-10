import { storeErrorHandler } from '../../../util/store';
import { getInstagram, getMasterclasses, getMasterclass } from '../../../api';
import { SET_MASTERCLASS, SET_FEATURED, SET_INSTAGRAM_ITEMS } from './mutations';

export const FETCH_MASTERCLASS_DATA = 'FETCH_MASTERCLASS_DATA';
export const FETCH_INSTAGRAM_ITEMS = 'FETCH_INSTAGRAM_ITEMS';
export const FETCH_MASTERCLASS = 'FETCH_MASTERCLASS';
export const FETCH_FEATURED = 'FETCH_FEATURED';

export default {
    [FETCH_FEATURED]({ commit }, payload) {
        return getMasterclasses(payload)
            .then(data => commit(SET_FEATURED, data))
            .catch(error => {
                storeErrorHandler(FETCH_FEATURED, true)(error);
            });
    },

    [FETCH_MASTERCLASS]({ commit }, payload) {
        return getMasterclass(payload)
            .then(data => commit(SET_MASTERCLASS, data))
            .catch(error => {
                storeErrorHandler(FETCH_MASTERCLASS, true)(error);
            });
    },

    [FETCH_INSTAGRAM_ITEMS]({ commit }, payload) {
        return getInstagram(payload)
            .then(data => commit(SET_INSTAGRAM_ITEMS, data.slice(0, 4)))
            .catch(error => {
                storeErrorHandler(FETCH_INSTAGRAM_ITEMS, true)(error);
            });
    },

    [FETCH_MASTERCLASS_DATA]({ dispatch, commit }, payload) {
        return Promise.all([
            dispatch(FETCH_MASTERCLASS, payload),
            dispatch(FETCH_INSTAGRAM_ITEMS, payload),
            dispatch(FETCH_FEATURED, payload),
        ]);
    },
};
