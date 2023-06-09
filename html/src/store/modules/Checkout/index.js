import { requestStatus } from '@enums';

import getters, {
    RECEIVE_METHOD_STATUS,
    BONUS_STATUS,
    CERTIFICATE_STATUS,
    PROMOCODE_STATUS,
    ADDRESS_STATUS,
    TICKET_STATUS,
    PAYMENT_METHOD_STATUS,
    CHECKOUT_FIRST_LOADED,
} from './getters';

import actions from './actions';
import mutations from './mutations';

export const NAME = 'checkout';
export const CHECKOUT_DATA = 'checkoutData';
export const CHECKOUT_TYPE = 'checkoutType';
export const CHECKOUT_STATUS = 'checkoutStatus';

export const PROFESSIONS = 'professions';
export const ORDER = 'order';
export const CITY_FIAS = 'cityFias';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [CHECKOUT_STATUS]: {
                [RECEIVE_METHOD_STATUS]: requestStatus.SUCCESS,
                [BONUS_STATUS]: requestStatus.SUCCESS,
                [CERTIFICATE_STATUS]: requestStatus.SUCCESS,
                [PROMOCODE_STATUS]: requestStatus.SUCCESS,
                [ADDRESS_STATUS]: requestStatus.SUCCESS,
                [PAYMENT_METHOD_STATUS]: requestStatus.SUCCESS,
                [TICKET_STATUS]: requestStatus.SUCCESS,
            },
            [CHECKOUT_FIRST_LOADED]: false,
            [CHECKOUT_DATA]: null,
            [CHECKOUT_TYPE]: null,
            [ORDER]: null,
            [PROFESSIONS]: [],
            [CITY_FIAS]: null,
        },
        actions,
        mutations,
        getters,
    };
}
