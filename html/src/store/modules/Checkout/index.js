import { requestStatus } from '../../../assets/scripts/enums/general';

import getters, {
    RECEIVE_METHOD_STATUS,
    BONUS_STATUS,
    CERTIFICATE_STATUS,
    PROMOCODE_STATUS,
    ADDRESS_STATUS,
} from './getters';

import actions from './actions';
import mutations from './mutations';

export const NAME = 'checkout';
export const CHECKOUT_DATA = 'checkoutData';
export const CHECKOUT_TYPE = 'checkoutType';
export const CHECKOUT_STATUS = 'checkoutStatus';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [CHECKOUT_STATUS]: {
            [RECEIVE_METHOD_STATUS]: requestStatus.SUCCESS,
            [BONUS_STATUS]: requestStatus.SUCCESS,
            [CERTIFICATE_STATUS]: requestStatus.SUCCESS,
            [PROMOCODE_STATUS]: requestStatus.SUCCESS,
            [ADDRESS_STATUS]: requestStatus.SUCCESS,
        },
        [CHECKOUT_DATA]: { input: {}, summary: {} },
        [CHECKOUT_TYPE]: null,
    },
    actions,
    mutations,
    getters,
};
