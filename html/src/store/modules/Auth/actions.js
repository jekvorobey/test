import { $logger } from '../../../services/ServiceLocator';
import { responseStatus } from '../../../assets/scripts/enums';
import { storeErrorHandler } from '../../../util/store';

import {
    login,
    checkSession,
    sendSMS,
    checkCode,
    registerByPassword,
    getSocialLink,
    logout,
    loginByPassword,
    loginBySocial,
} from '../../../api';

import { SET_HAS_SESSION } from './mutations';

export const LOGIN_BY_SOCIAL = 'LOGIN_BY_SOCIAL';
export const LOGIN_BY_PASSWORD = 'LOGIN_BY_PASSWORD';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const CHECK_SESSION = 'CHECK_SESSION';

export const SEND_SMS = 'SEND_SMS';
export const CHECK_CODE = 'CHECK_CODE';
export const REGISTER_BY_PASSWORD = 'REGISTER_BY_PASSWORD';
export const GET_SOCIAL_LINK = 'GET_SOCIAL_LINK';

export default {
    [SEND_SMS]({ commit }, phone) {
        return sendSMS(phone);
    },

    [CHECK_CODE]({ commit }, code) {
        return checkCode(code).then(({ isCodeValid, status, error = 'Invalid code' }) => {
            if (isCodeValid || status === true || status === responseStatus.OK) return isCodeValid;
            $logger.error(`${CHECK_CODE}: ${error}`);
            return Promise.reject(error);
        });
    },

    [REGISTER_BY_PASSWORD]({ commit }, password) {
        return registerByPassword(password)
            .then(() => {
                commit(SET_HAS_SESSION, true);
            })
            .catch(error => {
                $logger.error(`${REGISTER_BY_PASSWORD}: ${error || 'Something went wrong'}`);
            });
    },

    [GET_SOCIAL_LINK]({ commit }, { url, driver, redirectUrl }) {
        return getSocialLink(url, driver, redirectUrl)
            .then(({ url }) => url)
            .catch(error => {
                $logger.error(`${GET_SOCIAL_LINK}: ${error || 'Something went wrong'}`);
            });
    },

    [LOGIN_BY_PASSWORD]({ commit }, payload) {
        return loginByPassword(payload).then(() => {
            commit(SET_HAS_SESSION, true);
        });
    },

    [LOGIN_BY_SOCIAL]({ commit }, { driver, query }) {
        return loginBySocial(driver, query)
            .then(({ url }) => {
                commit(SET_HAS_SESSION, true);
                return url;
            })
            .catch(error => storeErrorHandler(LOGIN_BY_SOCIAL, true)(error));
    },

    [LOGOUT]({ commit }, payload) {
        return logout(payload)
            .then(() => commit(SET_HAS_SESSION, false))
            .catch(error => $logger.error(`${LOGOUT}: ${error}`));
    },

    [CHECK_SESSION]({ commit }, payload) {
        return checkSession(payload)
            .then(() => commit(SET_HAS_SESSION, true))
            .catch(error => {
                commit(SET_HAS_SESSION, false);
                $logger.error(`${CHECK_SESSION}: ${error}`);
            });
    },
};
