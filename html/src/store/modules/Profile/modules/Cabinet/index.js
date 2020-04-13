import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'cabinet';

export const CAN_BUY = 'canBuy';
export const REFERRAL_PARTNER = 'referralPartner';
export const HAS_PASSWORD = 'hasPassword';

export const AVATAR = 'avatar';
export const FIRST_NAME = 'firstName';
export const LAST_NAME = 'lastName';
export const MIDDLE_NAME = 'middleName';
export const BIRTHDAY = 'birthday';
export const GENDER = 'gender';
export const PHONE = 'phone';
export const EMAIL = 'email';
export const PORTFOLIO = 'portfolio';
export const ACTIVITIES = 'activities';
export const All_ACTIVITIES = 'allActivities';

export const SOCIAL = 'social';
export const CERTIFICATES = 'certificates';
export const REQUISITES = 'requisites';

export const LOAD = 'load';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,
            [CAN_BUY]: false,
            [REFERRAL_PARTNER]: false,
            [HAS_PASSWORD]: false,

            [AVATAR]: null,
            [FIRST_NAME]: null,
            [LAST_NAME]: null,
            [MIDDLE_NAME]: null,
            [BIRTHDAY]: null,
            [GENDER]: null,
            [PHONE]: null,
            [EMAIL]: null,
            [PORTFOLIO]: [],
            [ACTIVITIES]: [],
            [All_ACTIVITIES]: [],

            [SOCIAL]: [],

            [REQUISITES]: {
                name: null,
                address: null,
                inn: null,
                account: null,
                bank: null,
                bik: null,
                correspondentAccount: null,
            },
        },

        actions,
        mutations,
        getters,
    };
}
