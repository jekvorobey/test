import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes } from '@enums/product';
import { menuCode } from '@enums/general';

function prepareCategory({ id, name, code, items = [] }) {
    return {
        id,
        name,
        to: generateCategoryUrl(productGroupTypes.CATALOG, null, code),
        items: items.map(i => prepareCategory(i)),
    };
}

const CATEGORIES = 'categories';
const MENU = 'menu';

export const CATEGORIES_CATALOG = 'categoriesCatalog';
export const HEADER_MENU = 'headerMenu';
export const HELP_MENU = 'helpMenu';
export const FOOTER_MENU = 'footerMenu';

export default {
    [CATEGORIES_CATALOG](state) {
        const categories = state[CATEGORIES] || [];
        return categories.map(c => prepareCategory(c));
    },

    [HEADER_MENU](state) {
        const menu = state[MENU];
        return menu.find(m => m.code === menuCode.HEADER) || {};
    },

    [HELP_MENU](state) {
        const menu = state[MENU];
        return menu.find(m => m.code === menuCode.HELP) || {};
    },

    [FOOTER_MENU](state) {
        const menu = state[MENU];
        return menu.find(m => m.code === menuCode.FOOTER) || {};
    },
};
