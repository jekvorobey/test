export const FILTER_SEGMENTS = 'filterSegments';
export const ACTIVE_TAGS = 'activeTags';
export const ACTIVE_CATEGORY = 'activeCategory';

function getCategoryByCode(items, code) {
    if (items) {
        let item = null;
        let found = null;

        for (let i = 0; i < items.length; i++) {
            item = items[i];
            if (item.code === code) return item;

            found = getCategoryByCode(item.items, code);
            if (found) return found;
        }
    }
    return null;
}

const rangeRegx = /from_\d*_to_\d*/;
const numberRegx = /\d+/g;

export default {
    [ACTIVE_CATEGORY](
        state,
        getters,
        {
            route: { path },
        }
    ) {
        const { categories } = state;
        const categoryCode = path.split('/').slice(2, 3)[0];
        return getCategoryByCode(categories, categoryCode);
    },

    [FILTER_SEGMENTS](
        state,
        getters,
        {
            route: {
                params: { pathMatch },
            },
        }
    ) {
        const segments = {};
        if (pathMatch) {
            const urlSegments = pathMatch.split('/').slice(1);
            for (let i = 0; i < urlSegments.length; i++) {
                const segment = urlSegments[i];
                const name = segment.split('-')[0];
                if (rangeRegx.test(segment)) {
                    const numbers = segment.match(numberRegx);
                    segments[name] = numbers.map(n => +n);
                } else {
                    if (!segments[name]) segments[name] = {};
                    segments[name][segment] = segment;
                }
            }
        }
        return segments;
    },

    [ACTIVE_TAGS](state, getters) {
        const activeTags = [];
        const filters = state.filters.filter(f => f.type !== 'range');
        const { filterSegments } = getters;
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            for (let j = 0; j < filter.items.length; j++) {
                const item = filter.items[j];
                if (filterSegments[filter.name] && filterSegments[filter.name][item.code]) activeTags.push(item);
            }
        }
        return activeTags;
    },
};
