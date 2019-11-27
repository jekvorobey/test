import { login, checkSession } from '../../../api';
import { $logger } from '../../../services/ServiceLocator';
import { SET_HAS_SESSION } from './mutations';

export const LOGIN = 'LOGIN';
export const CHECK_SESSION = 'CHECK_SESSION';

export default {
    [LOGIN]({ commit }, payload) {
        return login(payload)
            .then(() => commit(SET_HAS_SESSION, true))
            .catch(error => $logger.error(`${LOGIN}: ${error}`));
    },

    [CHECK_SESSION]({ commit }, payload) {
        return checkSession(payload)
            .then(() => commit(SET_HAS_SESSION, true)) // todo имплементировать потом
            .catch(error => {
                commit(SET_HAS_SESSION, false);
                $logger.error(`${CHECK_SESSION}: ${error}`);
            });
    },
};
