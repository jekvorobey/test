import { getCatalogRouteSegments, getCatalogRouteCategoryCode } from '../../../util/catalog';

export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';
export const ACTIVE_TAGS = 'activeTags';
export const ACTIVE_CATEGORY = 'activeCategory';
export const ACTIVE_PAGE = 'activePage';
export const PAGES_COUNT = 'pagesCount';

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
const pageSize = 9;

export default {
    [ACTIVE_PAGE](state, getters, { route }) {
        return route.query.page ? Number(route.query.page) : 1;
    },

    [PAGES_COUNT](state) {
        return Math.ceil(state.range / pageSize);
    },

    [ACTIVE_CATEGORY](
        state,
        getters,
        {
            route: { path },
        }
    ) {
        const { categories } = state;
        const categoryCode = getCatalogRouteCategoryCode(path);
        return getCategoryByCode(categories, categoryCode);
    },

    [ROUTE_SEGMENTS](
        state,
        getters,
        {
            route: { path },
        }
    ) {
        return getCatalogRouteSegments(path);
    },

    [FILTER_SEGMENTS](state, getters) {
        const segments = {};
        const urlSegments = getters[ROUTE_SEGMENTS];
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
