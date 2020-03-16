import { generateCategoryUrl } from '@util/catalog';

function prepareBrand({ id, name, code, items = [] }) {
    return { id, name, to: code ? generateCategoryUrl(code, null) : null, items: items.map(i => prepareBrand(i)) };
}

const ITEMS = 'items';
export const BRANDS_CATALOG = 'brandsCatalog';

export default {
    [BRANDS_CATALOG](state) {
        const items = state[ITEMS] || [];
        return items.map(i => prepareBrand(i));
    },
};
