import { storeErrorHandler } from '@util/store';

import { getLanding } from '@api';
import { SET_LANDING } from './mutations';
import { agreementTypes } from '@enums';

export const FETCH_LANDING = 'FETCH_LANDING';

export default {
    async [FETCH_LANDING]({ commit }, { code }) {
        try {
            let preparedCode = code.replace(/\/+/, '').replace(/\/+$/, '');
            if (Object.values(agreementTypes).includes(preparedCode)) {
                preparedCode = `agreements/${preparedCode}`;
            }

            const data = await getLanding(preparedCode);
            commit(SET_LANDING, data);
        } catch (error) {
            storeErrorHandler(FETCH_LANDING, true)(error);
        }
    },
};
