import { generateCategoryUrl } from '../util/catalog';
import { productGroupTypes } from '../assets/scripts/enums';

function prepareCategory({ id, name, code, items = [] }) {
    return {
        id,
        name,
        to: generateCategoryUrl(productGroupTypes.CATALOG, null, code),
        items: items.map(i => prepareCategory(i)),
    };
}

const CATEGORIES = 'categories';
export const CATEGORIES_CATALOG = 'categoriesCatalog';

export default {
    [CATEGORIES_CATALOG](state) {
        const categories = state[CATEGORIES] || [];
        return categories.map(c => prepareCategory(c));
    },
};
