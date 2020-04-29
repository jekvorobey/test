import { preferenceEntityTypes, preferenceType } from '@enums/profile';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'preferences';
export const TYPE = 'type';
export const PREFERENCES_DATA = 'preferencesData';
export const AVAILABLE_BRANDS = 'availableBrands';
export const AVAILABLE_CATEGORIES = 'availableCategories';
export const LOAD = 'load';

export const CUSTOMER = 'customer';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,

            [TYPE]: preferenceType.PERSONAL,
            [PREFERENCES_DATA]: {
                [preferenceType.PERSONAL]: {
                    [CUSTOMER]: {
                        [preferenceEntityTypes.BRANDS]: [],
                        [preferenceEntityTypes.CATEGORIES]: [],
                    },
                },

                [preferenceType.PROFESSIONAL]: {
                    [CUSTOMER]: {
                        [preferenceEntityTypes.BRANDS]: [],
                        [preferenceEntityTypes.CATEGORIES]: [],
                    },
                },
            },

            [AVAILABLE_BRANDS]: [],
            [AVAILABLE_CATEGORIES]: [],
        },

        actions,
        mutations,
        getters,
    };
}
