import { requestStatus } from '@enums';

import actions from './actions';
import mutations from './mutations';
import getters, {
    RECEIVE_METHOD_STATUS,
    CERTIFICATE_STATUS,
    CERTIFICATES,
} from './getters';

export const NAME = 'certificate';

export const CERTIFICATE_DATA = 'certificateData';
export const CERTIFICATE_TYPE = 'certificateType';
export const CERTIFICATE_AGG_STATUS = 'certificateAggregationStatus';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [CERTIFICATE_AGG_STATUS]: {
              [RECEIVE_METHOD_STATUS]: requestStatus.SUCCESS,
              [CERTIFICATE_STATUS]: requestStatus.SUCCESS,
            },
            [CERTIFICATE_DATA]: null,
            [CERTIFICATE_TYPE]: null,
            [CERTIFICATES]: null
        },
        actions,
        mutations,
        getters,
    };
}
