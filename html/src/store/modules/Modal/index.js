import { modalName } from '@enums';
import { $store } from '@services';

import actions, { CHANGE_MODAL_STATE } from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'modal';
export const MODALS = 'modals';
export const MODALS_SHOW_COUNT = 'modalsShowCount';

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
            [MODALS_SHOW_COUNT]: {},
        },
        actions,
        mutations,
        getters,
    };
}
