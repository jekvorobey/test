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

export const REDIRECTS = 'redirects';
export const CATEGORIES_CATALOG = 'categoriesCatalog';
export const HEADER_MENU = 'headerMenu';
export const HELP_MENU = 'helpMenu';
export const FOOTER_MENU = 'footerMenu';
export const BANNER_THROUGH = 'bannerThrough';
export const IS_BANNER_THROUGH = 'isBannerThrough';

export default {
    [REDIRECTS](state) {
        return state[REDIRECTS];
    },

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

    [BANNER_THROUGH](state) {
        return state[BANNER_THROUGH]
    },

    [IS_BANNER_THROUGH](state) {
        return state[BANNER_THROUGH] && state[BANNER_THROUGH].length > 0
    }
};
