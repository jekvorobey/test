import {
    login,
    checkSession,
    sendSMS,
    checkCode,
    registerByPassword,
    addSocialAccount,
    logout,
    loginByPassword,
    loginBySocial,
} from '../../../api';

import { SET_HAS_SESSION } from './mutations';
import { $logger } from '../../../services/ServiceLocator';
import { responseStatus } from '../../../assets/scripts/constants';

export const LOGIN_BY_SOCIAL = 'LOGIN_BY_SOCIAL';
export const LOGIN_BY_PASSWORD = 'LOGIN_BY_PASSWORD';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const CHECK_SESSION = 'CHECK_SESSION';

export const SEND_SMS = 'SEND_SMS';
export const CHECK_CODE = 'CHECK_CODE';
export const REGISTER_BY_PASSWORD = 'REGISTER_BY_PASSWORD';
export const ADD_SOCIAL_ACCOUNT = 'ADD_SOCIAL_ACCOUNT';

export default {
    [SEND_SMS]({ commit }, phone) {
        return sendSMS(phone).then(({ status, error = 'invalid phone' }) => {
            if (status === true || status === responseStatus.OK) return;
            $logger.error(`${SEND_SMS}: ${error}`);
            return Promise.reject(error);
        });
    },

    [CHECK_CODE]({ commit }, code) {
        return checkCode(code).then(({ isCodeValid, status, error = 'invalid code' }) => {
            if (isCodeValid || status === true || status === responseStatus.OK) return isCodeValid;
            $logger.error(`${CHECK_CODE}: ${error}`);
            return Promise.reject(error);
        });
    },

    [REGISTER_BY_PASSWORD]({ commit }, password) {
        return registerByPassword(password)
            .then(({ status, error = 'Invalid password' }) => {
                if (status === true || status === responseStatus.OK) {
                    commit(SET_HAS_SESSION, true);
                    return;
                }
                return Promise.reject(error);
            })
            .catch(error => {
                $logger.error(`${REGISTER_BY_PASSWORD}: ${error || 'something went wrong'}`);
            });
    },

    [ADD_SOCIAL_ACCOUNT]({ commit }, payload) {
        return Promise.resolve();
    },

    [LOGIN_BY_PASSWORD]({ commit }, payload) {
        return loginByPassword(payload).then(({ status, error = 'Wrong password or login' }) => {
            if (status === true || status === responseStatus.OK) {
                commit(SET_HAS_SESSION, true);
                return;
            }
            $logger.error(`${LOGIN_BY_PASSWORD}: ${error}`);
            return Promise.reject(error);
        });
    },

    [LOGIN_BY_SOCIAL]({ commit }, payload) {
        return loginBySocial(payload)
            .then(({ url }) => {
                document.location.href = url;
            })
            .catch(error => $logger.error(`${LOGIN_BY_SOCIAL}: ${error}`));
    },

    [LOGOUT]({ commit }, payload) {
        return logout(payload)
            .then(() => commit(SET_HAS_SESSION, false))
            .catch(error => $logger.error(`${LOGOUT}: ${error}`));
    },

    [CHECK_SESSION]({ commit }, payload) {
        return (
            checkSession(payload)
                // .then(() => commit(SET_HAS_SESSION, true)) // todo имплементировать потом
                .catch(error => {
                    commit(SET_HAS_SESSION, false);
                    $logger.error(`${CHECK_SESSION}: ${error}`);
                })
        );
    },
};
