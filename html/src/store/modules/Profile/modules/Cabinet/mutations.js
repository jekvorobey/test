export const SET_CABINET_DATA = 'SET_CABINET_DATA';

export const SET_LOAD = 'SET_LOAD';
export const SET_CAN_EDIT_CODE = 'SET_CAN_EDIT_CODE';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PHONE = 'UPDATE_PHONE';

export const UPDATE_ACTIVITIES = 'UPDATE_ACTIVITIES';
export const UPDATE_REQUISITES = 'UPDATE_REQUISITES';
export const UPDATE_CREDENTIAL = 'UPDATE_CREDENTIAL';
export const UPDATE_PERSONAL = 'UPDATE_PERSONAL';
export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const DELETE_SOCIAL = 'DELETE_SOCIAL';
export const DELETE_CERTIFICATE = 'DELETE_CERTIFICATE';

export const UPDATE_FILES = 'UPDATE_FILES';
export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const ADD_PORTFOLIO = 'ADD_PORTFOLIO';
export const DELETE_PORTFOLIO = 'DELETE_PORTFOLIO';
export const CLEAR_PORTFOLIO_DATA = 'CLEAR_PORTFOLIO_DATA';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_CAN_EDIT_CODE](state, payload) {
        state.canEditReferralCode = payload || false;
    },

    [SET_CABINET_DATA](state, payload = {}) {
        const {
            can_edit_referral_code,
            referral_partner,
            referral_personal_discount,
            has_password,

            avatar,
            first_name,
            last_name,
            middle_name,
            birthday,
            gender,
            phone,
            email,
            portfolio,
            activities,
            activitiesAll,

            social,
            certificates,

            legal_info_company_name,
            legal_info_company_address,
            legal_info_inn,
            legal_info_payment_account,
            legal_info_bik,
            legal_info_bank,
            legal_info_bank_correspondent_account,
            payment_city,
        } = payload;

        state.canEditReferralCode = can_edit_referral_code || false;
        state.referralPartner = referral_partner || false;
        state.hasPassword = has_password || false;

        state.avatar = avatar;
        state.firstName = first_name;
        state.lastName = last_name;
        state.middleName = middle_name;
        state.birthday = birthday;
        state.gender = gender;
        state.phone = phone;
        state.email = email;
        state.portfolio = portfolio;
        state.activities = activities;
        state.allActivities = activitiesAll;
        state.referralPersonalDiscount = referral_personal_discount;

        state.social = social;
        state.certificates = certificates;

        state.requisites = {
            name: legal_info_company_name || null,
            address: legal_info_company_address || null,
            inn: legal_info_inn || null,
            account: legal_info_payment_account || null,
            bik: legal_info_bik || null,
            bank: legal_info_bank || null,
            correspondentAccount: legal_info_bank_correspondent_account || null,
            payment_city: payment_city || null,
        };
    },

    [UPDATE_PERSONAL](state, payload = {}) {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.middleName = payload.middleName;
        state.birthday = payload.birthday;
        state.gender = payload.gender;
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

    [ADD_PORTFOLIO](state, payload) {
        if (payload) state.editablePortfolio.push(payload);
    },

    [DELETE_PORTFOLIO](state, index) {
        state.editablePortfolio.splice(index, 1);
    },

    [CLEAR_PORTFOLIO_DATA](state) {
        state.files = [];
        state.editablePortfolio = [{ id: 0, name: null, link: null }];
    },

    [UPDATE_FILES](state, payload) {
        state.files = payload || [];
    },

    [UPDATE_PORTFOLIO](state, payload) {
        state.portfolio = payload || [];
    },
};
