import { preferenceEntityTypes, preferenceType } from '@enums/profile';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'preferences';
export const TYPE = 'type';
export const PREFERENCES_DATA = 'preferencesData';
export const AVAILABLE = 'available';
export const EQUAL_PREFERENCES = 'equalPreferences';
export const LOAD = 'load';

const BRANDS = 'brands';
const CATEGORIES = 'categories';

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
                    [EQUAL_PREFERENCES]: [],
                },

                [preferenceType.PROFESSIONAL]: {
                    [CUSTOMER]: {
                        [preferenceEntityTypes.BRANDS]: [],
                        [preferenceEntityTypes.CATEGORIES]: [],
                    },
                    [EQUAL_PREFERENCES]: [],
                },
            },

            [AVAILABLE]: {
                [preferenceEntityTypes.BRANDS]: [],
                [preferenceEntityTypes.CATEGORIES]: [],
            },
        },

        actions,
        mutations,
        getters,
    };
}
