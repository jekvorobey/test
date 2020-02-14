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

    async [CHECK_CODE]({ commit }, code) {
        try {
            const { isCodeValid, status, error = 'Invalid code' } = await checkCode(code);
            if (isCodeValid || status === true || status === responseStatus.OK) return isCodeValid;
            $logger.error(`${CHECK_CODE}: ${error}`);
            return Promise.reject(error);
        } catch (error) {
            storeErrorHandler(CHECK_CODE)(error);
        }
    },

    async [REGISTER_BY_PASSWORD]({ commit }, password) {
        try {
            await registerByPassword(password);
            commit(SET_HAS_SESSION, true);
        } catch (error) {
            storeErrorHandler(LOGIN_BY_PASSWORD)(error);
        }
    },

    async [GET_SOCIAL_LINK]({ commit }, { backUrl, driver, redirectUrl }) {
        try {
            const { url } = await getSocialLink({ backUrl, driver, redirectUrl });
            return url;
        } catch (error) {
            storeErrorHandler(LOGIN_BY_PASSWORD)(error);
        }
    },

    async [LOGIN_BY_PASSWORD]({ commit }, payload) {
        try {
            await loginByPassword(payload);
            commit(SET_HAS_SESSION, true);
        } catch (error) {
            storeErrorHandler(LOGIN_BY_PASSWORD)(error);
        }
    },

    async [LOGIN_BY_SOCIAL]({ commit }, { driver, query }) {
        try {
            const { url } = await loginBySocial(driver, query);
            commit(SET_HAS_SESSION, true);
            return url;
        } catch (error) {
            storeErrorHandler(LOGIN_BY_SOCIAL)(error);
        }
    },

    async [LOGOUT]({ commit }) {
        try {
            await logout();
            commit(SET_HAS_SESSION, false);
        } catch (error) {
            storeErrorHandler(CHECK_SESSION)(error);
        }
    },

    async [CHECK_SESSION]({ commit }) {
        try {
            const { is_login } = await checkSession();
            commit(SET_HAS_SESSION, is_login);
        } catch (error) {
            commit(SET_HAS_SESSION, false);
            storeErrorHandler(CHECK_SESSION)(error);
        }
    },
};
