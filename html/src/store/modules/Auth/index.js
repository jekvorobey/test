import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'auth';
export const HAS_SESSION = 'hasSession';

export const USER = 'user';
export const REFERRAL_CODE = 'referralCode';
export const REFERRAL_PARTNER = 'referralPartner';
export const CAN_BUY = 'canBuy';
export const UNREAD_MESSAGES = 'unreadMessages';
export const STATUS = 'status';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [HAS_SESSION]: false,
            [USER]: null,
            [UNREAD_MESSAGES]: 0,
        },
        actions,
        mutations,
        getters,
    };
}
