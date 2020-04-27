import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { cardIdentificationStatus } from '@enums/profile';

export const NAME = 'billing';
export const LOAD_PATH = 'loadPath';

export const CARD_CREATION_STATUS = 'cardCreationStatus';
export const SELECTED_CARD = 'selectedCard';
export const BILLING_DATA = 'billingData';
export const ITEMS = 'items';
export const ACTIVE_PAGE = 'activePage';
export const RANGE = 'range';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',

            [CARD_CREATION_STATUS]: cardIdentificationStatus.FAIL,
            [SELECTED_CARD]: null,
            [BILLING_DATA]: { cards: [] },
            [ITEMS]: [],
            [RANGE]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },

        actions,
        mutations,
        getters,
    };
}
