import { login } from '../../../api';
import { $logger } from '../../../services/ServiceLocator';

export const LOGIN = 'LOGIN';

export default {
    [LOGIN]({ commit }, payload) {
        return login(payload).catch(error => $logger.error(`${LOGIN}: ${error}`));
    },
};
