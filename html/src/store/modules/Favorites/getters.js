import { $logger } from '@services';
import { favoritesItemTypes } from '@enums/favorites';

export const FAVORITES = 'Favorites';

export const FAVORITES_ITEMS_COUNT = 'favoritesItemsCount';
export const FAVORITES_TYPES = 'favorytesTypes';
export const IS_IN_FAVORITES = 'IS_IN_FAVORITES';

const itemTypes = Object.values(favoritesItemTypes);

export default {

    [FAVORITES_ITEMS_COUNT]: (state, getters) => {
        const itemsCount = getters[FAVORITES_TYPES].reduce((accum, current) => {
            let count = 0;
            if (Array.isArray(current.items)) {
                for (let i = 0; i < current.items.length; i++) {
                    const item = current.items[i];
                    count += item.count;
                }
                return accum + count;
            }
            return accum;
        }, 0);
        return itemsCount;
    },

    [FAVORITES_TYPES]: (state) => {
        const types = itemTypes.reduce((accum, current) => {
            const type = state.favoritesData[current];

            if (type) accum.push(type);
            return accum;
        }, []);
        return types;
    },

    [IS_IN_FAVORITES]: (state, getters) => (type, id) => {
        const data = state.favoritesData[type, id];
        return data && data.items.some((i) => i.id === id);
    },
};
