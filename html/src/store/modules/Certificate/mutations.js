export const SET_DATA = 'SET_DATA';
export const SET_TYPE = 'SET_TYPE';
export const SET_STATUS = 'SET_STATUS';
export const SET_CERTIFICATES = 'SET_CERTIFICATES';
export const SET_CERTIFICATE_PAYMENT = 'SET_CERTIFICATE_PAYMENT';

export default {
  [SET_STATUS](state, payload = {}) {
      state.certificateAggregationStatus[payload.name] = payload.value;
  },

  [SET_TYPE](state, payload = null) {
      state.certificateType = payload;
  },

  [SET_DATA](state, payload = null) {
      state.certificateData = payload;
  },

  [SET_CERTIFICATES](state, payload = null) {
      state.activeCertificates = payload;
  },

  [SET_CERTIFICATE_PAYMENT](state, payload = null) {
      state.certificatePayment = payload;
  },
};
