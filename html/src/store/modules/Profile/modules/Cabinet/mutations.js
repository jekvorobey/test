export const SET_CABINET_DATA = 'SET_CABINET_DATA';

export const SET_LOAD = 'SET_LOAD';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PHONE = 'UPDATE_PHONE';
export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const UPDATE_ACTIVITIES = 'UPDATE_ACTIVITIES';
export const UPDATE_REQUISITES = 'UPDATE_REQUISITES';
export const UPDATE_CREDENTIAL = 'UPDATE_CREDENTIAL';
export const UPDATE_PERSONAL = 'UPDATE_PERSONAL';
export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const DELETE_SOCIAL = 'DELETE_SOCIAL';
export const DELETE_CERTIFICATE = 'DELETE_CERTIFICATE';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_CABINET_DATA](state, payload = {}) {
        state.canBuy = payload.canBuy;
        state.referralPartner = payload.referral_partner;
        state.hasPassword = payload.has_password;

        state.avatar = payload.avatar;
        state.firstName = payload.first_name;
        state.lastName = payload.last_name;
        state.middleName = payload.middle_name;
        state.birthday = payload.birthday;
        state.gender = payload.gender;
        state.phone = payload.phone;
        state.email = payload.email;
        state.portfolio = payload.portfolio;
        state.activities = payload.activities;
        state.allActivities = payload.activitiesAll;

        state.social = payload.social;
        state.certificates = payload.certificates;
        state.requisites = payload.requisites;
    },

    [UPDATE_PERSONAL](state, payload = {}) {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.middleName = payload.middleName;
        state.birthday = payload.birthday;
        state.gender = payload.gender;
    },

    [UPDATE_PORTFOLIO](state, payload = []) {
        state.portfolio = payload;
    },

    [UPDATE_REQUISITES](state, payload = {}) {
        state.requisites = payload;
    },

    [UPDATE_ACTIVITIES](state, payload = []) {
        state.activities = payload;
    },

    [UPDATE_PHONE](state, payload) {
        state.phone = payload;
    },

    [UPDATE_EMAIL](state, payload) {
        state.email = payload;
    },

    [UPDATE_AVATAR](state, payload) {
        state.avatar = payload;
    },

    [UPDATE_PASSWORD](state, payload) {
        state.hasPassword = payload;
    },

    [DELETE_SOCIAL](state, payload) {
        const index = state.social.indexOf(payload);
        if (index < 0) return;
        state.social.splice(index, 1);
    },
};
