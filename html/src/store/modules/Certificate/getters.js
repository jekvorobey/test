export const RECEIVE_METHOD_STATUS = 'receiveMethodStatus';
export const CERTIFICATE_STATUS = 'certificateStatus';
export const CERTIFICATES = 'certificates';
export const CERTIFICATE_AGG_STATUS = 'certificateAggregationStatus';

export default {
    [RECEIVE_METHOD_STATUS]: (state) => state[CERTIFICATE_AGG_STATUS][RECEIVE_METHOD_STATUS] || requestStatus.SUCCESS,
    [CERTIFICATE_STATUS]: (state) => state[CERTIFICATE_AGG_STATUS][CERTIFICATE_STATUS] || requestStatus.SUCCESS,
    [CERTIFICATES]: (state) => state[CERTIFICATES],
};
