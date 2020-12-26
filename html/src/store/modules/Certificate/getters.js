export const RECEIVE_METHOD_STATUS = 'receiveMethodStatus';
export const ACTIVE_CERTIFICATE_STATUS = 'certificateStatus';
export const ACTIVE_CERTIFICATES = 'activeCertificates';
export const CERTIFICATE_AGG_STATUS = 'certificateAggregationStatus';
export const CERTIFICATE_PAYMENT = 'certificatePayment';

export default {
    [RECEIVE_METHOD_STATUS]: (state) => state[CERTIFICATE_AGG_STATUS][RECEIVE_METHOD_STATUS] || requestStatus.SUCCESS,
    [ACTIVE_CERTIFICATE_STATUS]: (state) => state[CERTIFICATE_AGG_STATUS][ACTIVE_CERTIFICATE_STATUS] || requestStatus.SUCCESS,
    [ACTIVE_CERTIFICATES]: (state) => state[ACTIVE_CERTIFICATES],
    [CERTIFICATE_PAYMENT]: (state) => state[CERTIFICATE_PAYMENT],
};
