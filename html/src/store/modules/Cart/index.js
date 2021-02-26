import {modalName, requestStatus} from '@enums';
import { $store } from '@services';

import actions from './actions';
import mutations from './mutations';
import getters, { PROMOCODE_STATUS } from './getters';

import { checkPermissions } from '@components/BuyButton/BuyButton.vue';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions.js';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';

function rrAddToBasket(offerId) {
    if (checkPermissions()) {
        $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
            name: modalName.general.ADD_TO_CART,
            open: true,
            state: { offerId, type: 'product' },
        });
    }
}

if (process.env.VUE_ENV === 'client') {
    window.rrAddToBasket = rrAddToBasket;
}

export const NAME = 'cart';
export const LOAD = 'load';
export const CART_DATA = 'cartData';
export const CART_STATUS = 'cartStatus';
export const FEATURED_PRODUCTS = 'featuredProducts';
export const RELATIVE_PRODUCTS = 'relativeProducts';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LOAD]: false,
            [CART_STATUS]: {
                [PROMOCODE_STATUS]: requestStatus.SUCCESS,
            },
            [CART_DATA]: {},
            [RELATIVE_PRODUCTS]: [],
            [FEATURED_PRODUCTS]: [],
        },
        actions,
        mutations,
        getters,
    };
}
