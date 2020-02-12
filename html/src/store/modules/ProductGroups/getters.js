import { generateCategoryUrl } from '../../../util/catalog';
import { productGroupTypes } from '../../../assets/scripts/enums';

function prepareBrand({ id, name, code }) {
    return { id, name, to: generateCategoryUrl(code, null) };
}

const ITEMS = 'items';
export const BRANDS_CATALOG = 'brandsCatalog';

export default {
    [BRANDS_CATALOG]({ items = [] }) {
        const itemsMap = {};
        for (let i = 0; i < items.length; i++) {
            const item = prepareBrand(items[i]);
            const letter = item.name.slice(0, 1).toUpperCase();
            const map = itemsMap[letter];
            if (!map) itemsMap[letter] = { id: letter, name: letter, items: [item] };
            else map[ITEMS].push(item);
        }

        return itemsMap;
    },
};
