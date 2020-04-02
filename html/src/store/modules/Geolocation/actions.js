import { setCity } from '@api';
import { MUTATE_SELECTED_CITY } from './mutations';
import { storeErrorHandler } from '@util/store';

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export default {
    async [SET_SELECTED_CITY]({ commit }, payload) {
        try {
            const { name, fias_id } = payload;
            await setCity({ name, fias_id });
            commit(MUTATE_SELECTED_CITY, payload);
        } catch (error) {
            storeErrorHandler(SET_SELECTED_CITY)(error);
        }
    },
};
