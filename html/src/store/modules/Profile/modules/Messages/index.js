import { DEFAULT_PAGE } from '@constants';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'messages';
export const LOAD_PATH = 'loadPath';

export const CHAT_ID = 'chatId';
export const TITLE = 'title';
export const ITEMS = 'items';
export const MESSAGES = 'messages';
export const THEMES = 'themes';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',

            [TITLE]: '',
            [CHAT_ID]: null,
            [ITEMS]: [],
            [MESSAGES]: [],
            [THEMES]: [],
        },

        actions,
        mutations,
        getters,
    };
}
