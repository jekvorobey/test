import { verificationCodeType } from '@enums/auth';
import { storeErrorHandler } from '@util/store';
import {
    getProfile,
    changeProfileRequisites,
    changeProfileActivities,
    changeProfilePortfolio,
    changeProfileCredential,
    changeProfilePersonal,
    sendCode,
    changeProfileAvatar,
    deleteProfileAvatar,
    changeProfilePassword,
    deleteProfileSocial,
    uploadProfileCertificate,
    deleteProfileCertificate,
    loadProfileCertificate,
    changeProfileReferralCode,
} from '@api';
import { SET_CABINET_DATA, UPDATE_PHONE, UPDATE_EMAIL } from './mutations';

export const FETCH_CABINET_DATA = 'FETCH_CABINET_DATA';
export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const UPDATE_ACTIVITIES = 'UPDATE_ACTIVITIES';
export const UPDATE_CREDENTIAL = 'UPDATE_CREDENTIAL';
export const UPDATE_PERSONAL = 'UPDATE_PERSONAL';
export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_REQUISITES = 'UPDATE_REQUISITES';
export const UPDATE_REFERRER_CODE = 'UPDATE_REFERRER_CODE';

export const UPLOAD_CERTIFICATE = 'UPLOAD_CERTIFICATE';
export const LOAD_CERTIFICATE = 'LOAD_CERTIFICATE';
export const DELETE_CERTIFICATE = 'DELETE_CERTIFICATE';

export const DELETE_AVATAR = 'DELETE_AVATAR';
export const DELETE_SOCIAL = 'DELETE_SOCIAL';

export const SEND_CODE = 'SEND_CODE';

export const SET_LOAD = 'SET_LOAD';

export const SET_CAN_EDIT_CODE = 'SET_CAN_EDIT_CODE';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    [SET_CAN_EDIT_CODE]({ commit }, payload) {
        commit(SET_CAN_EDIT_CODE, payload);
    },

    async [SEND_CODE]({ state, commit }, { destination, type }) {
        try {
            await sendCode(destination, type);
        } catch (error) {
            storeErrorHandler(SEND_CODE, true)(error);
        }
    },

    async [UPLOAD_CERTIFICATE]({ commit }, payload) {
        try {
            return await uploadProfileCertificate(payload);
        } catch (error) {
            storeErrorHandler(UPLOAD_CERTIFICATE, true)(error);
        }
    },

    async [LOAD_CERTIFICATE]({ commit }, name) {
        try {
            return await loadProfileCertificate(name);
        } catch (error) {
            storeErrorHandler(LOAD_CERTIFICATE, true)(error);
        }
    },

    async [DELETE_CERTIFICATE]({ commit }, id) {
        try {
            await deleteProfileCertificate(id);
        } catch (error) {
            storeErrorHandler(DELETE_CERTIFICATE, true)(error);
        }
    },

    async [UPDATE_PASSWORD]({ commit }, payload) {
        try {
            await changeProfilePassword(payload);
            commit(UPDATE_PASSWORD, true);
        } catch (error) {
            storeErrorHandler(UPDATE_PASSWORD, true)(error);
        }
    },

    async [UPDATE_AVATAR]({ commit }, payload) {
        try {
            const { name, url } = await changeProfileAvatar(payload);
            commit(UPDATE_AVATAR, url);
        } catch (error) {
            storeErrorHandler(UPDATE_AVATAR, true)(error);
        }
    },

    async [DELETE_AVATAR]({ commit }, payload) {
        try {
            await deleteProfileAvatar(payload);
            commit(UPDATE_AVATAR, null);
        } catch (error) {
            storeErrorHandler(DELETE_AVATAR, true)(error);
        }
    },

    async [DELETE_SOCIAL]({ commit }, social) {
        try {
            await deleteProfileSocial(social.driver);
            commit(DELETE_SOCIAL, social);
        } catch (error) {
            storeErrorHandler(DELETE_SOCIAL, true)(error);
        }
    },

    async [UPDATE_CREDENTIAL]({ commit }, { value, code, type }) {
        try {
            await changeProfileCredential(code, type);
            switch (type) {
                case verificationCodeType.PROFILE_PHONE:
                    commit(UPDATE_PHONE, value);
                    break;
                case verificationCodeType.PROFILE_EMAIL:
                    commit(UPDATE_EMAIL, value);
                    break;
            }
        } catch (error) {
            storeErrorHandler(UPDATE_CREDENTIAL, true)(error);
        }
    },

    async [UPDATE_PERSONAL]({ commit }, payload = {}) {
        try {
            await changeProfilePersonal(payload);
            commit(UPDATE_PERSONAL, payload);
        } catch (error) {
            storeErrorHandler(UPDATE_PERSONAL, true)(error);
        }
    },

    async [UPDATE_ACTIVITIES]({ state, commit }, payload = []) {
        try {
            await changeProfileActivities(payload.map((a) => a.id));
            commit(UPDATE_ACTIVITIES, payload);
        } catch (error) {
            storeErrorHandler(UPDATE_ACTIVITIES, true)(error);
        }
    },

    async [UPDATE_PORTFOLIO]({ commit }, payload = []) {
        try {
            await changeProfilePortfolio(payload);
            commit(UPDATE_PORTFOLIO, payload);
        } catch (error) {
            storeErrorHandler(UPDATE_PORTFOLIO, true)(error);
        }
    },

    async [UPDATE_REQUISITES]({ commit }, payload = {}) {
        try {
            const {
                name = null,
                address = null,
                inn = null,
                account = null,
                bank = null,
                bik = null,
                correspondentAccount = null,
            } = payload;

            await changeProfileRequisites(name, address, inn, account, bank, bik, correspondentAccount);
            commit(UPDATE_REQUISITES, payload);
        } catch (error) {
            storeErrorHandler(UPDATE_REQUISITES, true)(error);
        }
    },

    async [UPDATE_REFERRER_CODE]({ commit }, code) {
        try {
            return await changeProfileReferralCode(code);
        } catch (error) {
            storeErrorHandler(UPDATE_REFERRER_CODE, true)(error);
        }
    },

    async [FETCH_CABINET_DATA]({ commit }, isServer) {
        try {
            const data = await getProfile();
            commit(SET_CABINET_DATA, data);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_CABINET_DATA, true)(error);
        }
    },
};
