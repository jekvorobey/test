import { DEFAULT_PAGE } from '@constants';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'seo';
export const LOAD_PATH = 'loadPath';

export const ITEMS = 'items';
export const ACTIVE_PAGE = 'activePage';
export const RANGE = 'range';
export const GALLERY_IMAGES = 'galleryImages';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',
            [ITEMS]: [],
            [RANGE]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
            [GALLERY_IMAGES]: [],
        },

        actions,
        mutations,
        getters,
    };
}
