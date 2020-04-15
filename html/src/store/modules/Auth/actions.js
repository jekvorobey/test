import { $logger } from '@services';
import { responseStatus } from '@enums';
import { storeErrorHandler } from '@util/store';

import {
    checkSession,
    login,
    loginByPassword,
    loginBySocial,
    logout,
    registerByPassword,
    getSocialLink,
    sendCode,
    checkCode,
    resetPassword,
    getUser,
} from '@api';
import { SET_HAS_SESSION, SET_USER } from './mutations';

export const CHECK_SESSION = 'CHECK_SESSION';

export const LOGOUT = 'LOGOUT';
export const LOGIN_BY_SOCIAL = 'LOGIN_BY_SOCIAL';
export const LOGIN_BY_PASSWORD = 'LOGIN_BY_PASSWORD';

export const GET_SOCIAL_LINK = 'GET_SOCIAL_LINK';
export const REGISTER_BY_PASSWORD = 'REGISTER_BY_PASSWORD';
export const SEND_SMS = 'SEND_SMS';
export const CHECK_CODE = 'CHECK_CODE';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const FETCH_USER = 'FETCH_USER';

export const SET_REFERRER_CODE = 'SET_REFERRER_CODE';

export default {
    async [SEND_SMS]({ commit }, { phone, type }) {
        try {
            await sendCode(phone, type);
        } catch (error) {
            storeErrorHandler(SEND_SMS, true)(error);
        }
    },

    async [CHECK_CODE]({ commit }, { code, type }) {
        try {
            await checkCode(code, type);
        } catch (error) {
            storeErrorHandler(CHECK_CODE, true)(error);
        }
    },

    async [GET_SOCIAL_LINK]({ commit }, { backUrl, driver, redirectUrl }) {
        try {
            const { url } = await getSocialLink({ backUrl, driver, redirectUrl });
            return url;
        } catch (error) {
            storeErrorHandler(GET_SOCIAL_LINK, true)(error);
        }
    },

    async [LOGIN_BY_PASSWORD]({ dispatch }, payload) {
        try {
            await loginByPassword(payload);
            dispatch(CHECK_SESSION, true);
        } catch (error) {
            storeErrorHandler(LOGIN_BY_PASSWORD, true)(error);
        }
    },

    async [LOGIN_BY_SOCIAL]({ dispatch }, { driver, query }) {
        try {
            const { url } = await loginBySocial(driver, query);
            dispatch(CHECK_SESSION, true);
            return url;
        } catch (error) {
            storeErrorHandler(LOGIN_BY_SOCIAL, true)(error);
        }
    },

    async [LOGOUT]({ dispatch, commit }) {
        try {
            await logout();
            dispatch(CHECK_SESSION, true);
        } catch (error) {
            commit(SET_HAS_SESSION, false);
            storeErrorHandler(LOGOUT)(error);
        }
    },

    async [REGISTER_BY_PASSWORD]({ dispatch, commit }, password) {
        try {
            await registerByPassword(password);
            dispatch(CHECK_SESSION, true);
        } catch (error) {
            commit(SET_HAS_SESSION, false);
            storeErrorHandler(REGISTER_BY_PASSWORD, true)(error);
        }
    },

    async [RESET_PASSWORD]({ commit }, { phone, password }) {
        try {
            await resetPassword(phone, password);
        } catch (error) {
            storeErrorHandler(RESET_PASSWORD, true)(error);
        }
    },

    async [CHECK_SESSION]({ commit }, force) {
        try {
            const { is_login } = await checkSession(force);
            commit(SET_HAS_SESSION, is_login);
            return is_login;
        } catch (error) {
            commit(SET_HAS_SESSION, false);
            storeErrorHandler(CHECK_SESSION, true)(error);
            return false;
        }
    },

    [SET_REFERRER_CODE]({ commit }, code) {
        commit(SET_REFERRER_CODE, code);
    },

    async [FETCH_USER]({ commit }) {
        try {
            let user = null;
            const { can_buy: canBuy, referral_code: referralCode, referral_partner: referralPartner } = await getUser();
            user = { canBuy, referralCode, referralPartner };
            commit(SET_USER, user);
            return user;
        } catch (error) {
            user = {};
            commit(SET_HAS_SESSION, false);
            commit(SET_USER, user);
            storeErrorHandler(FETCH_USER)(error);
            return user;
        }
    },
};
