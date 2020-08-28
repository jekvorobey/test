import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes } from '@enums/product';
import { menuCode } from '@enums';

function prepareCategory({ id, name, code, items = [] }) {
    return {
        id,
        name,
        to: generateCategoryUrl(productGroupTypes.CATALOG, null, code),
        items: items.map((i) => prepareCategory(i)),
    };
}

const CATEGORIES = 'categories';
const MENU = 'menu';
const BADGES = 'badges';

export const CATEGORIES_CATALOG = 'categoriesCatalog';
export const HEADER_MENU = 'headerMenu';
export const HELP_MENU = 'helpMenu';
export const FOOTER_MENU = 'footerMenu';
export const BADGES_MAP = 'badgesMap';

export default {
    [CATEGORIES_CATALOG](state) {
        const categories = state[CATEGORIES] || [];
        return categories.map((c) => prepareCategory(c));
    },

    [HEADER_MENU](state) {
        const menu = state[MENU];
        return menu.find((m) => m.code === menuCode.HEADER) || {};
    },

    [HELP_MENU](state) {
        const menu = state[MENU];
        return menu.find((m) => m.code === menuCode.HELP) || {};
    },

    [FOOTER_MENU](state) {
        const menu = state[MENU];
        return menu.find((m) => m.code === menuCode.FOOTER) || {};
    },

    [BADGES_MAP](state) {
        const badges = state[BADGES];
        const map = {};

        // eslint-disable-next-line no-restricted-syntax
        for (const badge of badges) if (badge.code) map[badge.code] = badge;
        return map;
    },
};
