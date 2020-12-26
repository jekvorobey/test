import { requestStatus } from '@enums';
import { storeErrorHandler } from '@util/store';

import {
  activateCertificate,
  fetchCertificates,
} from '@api';

import {
  ACTIVE_CERTIFICATE_STATUS,
} from './getters';

import {
  SET_DATA,
  SET_STATUS,
  SET_CERTIFICATES,
} from './mutations';

export const FETCH_CERTIFICATES = 'FETCH_CERTIFICATES';
export const AMOUNT_FROM_CERTIFICATES = 'AMOUNT_FROM_CERTIFICATES';
export const ACTIVATE_CERTIFICATE = 'ACTIVATE_CERTIFICATE';

export default {
  async [ACTIVATE_CERTIFICATE]({ commit, state }, payload) {
    try {
      commit(SET_STATUS, { name: ACTIVE_CERTIFICATE_STATUS, value: requestStatus.PENDING });
      const data = await activateCertificate({ pin: payload/*, data: state.checkoutData*/ });
      commit(SET_STATUS, { name: ACTIVE_CERTIFICATE_STATUS, value: requestStatus.SUCCESS });
      commit(SET_DATA, data);
    } catch (error) {
      commit(SET_STATUS, { name: ACTIVE_CERTIFICATE_STATUS, value: requestStatus.ERROR });
      storeErrorHandler(ACTIVATE_CERTIFICATE, true)(error);
    }
  },

  async [FETCH_CERTIFICATES]({ commit }) {
    try {
        const { cards } = await fetchCertificates();
        commit(SET_CERTIFICATES, cards);
    } catch (error) {
        storeErrorHandler(FETCH_CERTIFICATES)(error);
    }
  },

};
