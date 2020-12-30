import { requestStatus } from '@enums';

import actions from './actions';
import mutations from './mutations';
import getters, {
    RECEIVE_METHOD_STATUS,
    ACTIVE_CERTIFICATE_STATUS,
    ACTIVE_CERTIFICATES,
    // CERTIFICATE_PAYMENT
} from './getters';

export const NAME = 'certificate';

export const CERTIFICATE_DATA = 'certificateData';
export const CERTIFICATE_TYPE = 'certificateType';
export const CERTIFICATE_AGG_STATUS = 'certificateAggregationStatus';
export const CERTIFICATE_PAYMENT = 'certificatePayment';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [CERTIFICATE_AGG_STATUS]: {
              [RECEIVE_METHOD_STATUS]: requestStatus.SUCCESS,
              [ACTIVE_CERTIFICATE_STATUS]: requestStatus.SUCCESS,
            },
            [CERTIFICATE_DATA]: null,
            [CERTIFICATE_TYPE]: null,
            [ACTIVE_CERTIFICATES]: [],
            [CERTIFICATE_PAYMENT]: null
        },
        actions,
        mutations,
        getters,
    };
}
