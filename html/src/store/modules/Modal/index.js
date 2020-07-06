import { modalName } from '@enums';
import { $store } from '@services';

import actions, { CHANGE_MODAL_STATE } from './actions';
import mutations from './mutations';
import getters from './getters';
import store from '@util/store';

export const NAME = 'modal';
export const MODALS = 'modals';

if (process.env.VUE_ENV === 'client') {
    function rrQuickView(offerId) {
        $store.dispatch(`${NAME}/${CHANGE_MODAL_STATE}`, {
            name: modalName.general.QUICK_VIEW,
            open: true,
            state: { offerId },
        });
    }

    window.rrQuickView = rrQuickView;
}

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [MODALS]: {},
        },
        actions,
        mutations,
        getters,
    };
}
