import { getCategoryByCode, mapFilterSegments } from '../../../util/catalog';

export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';
export const ACTIVE_TAGS = 'activeTags';
export const ACTIVE_CATEGORY = 'activeCategory';
export const ACTIVE_PAGE = 'activePage';
export const PAGES_COUNT = 'pagesCount';

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
            route: {
                params: { code },
            },
        }
    ) {
        const { categories } = state;
        return getCategoryByCode(categories, code);
    },

    [ROUTE_SEGMENTS](
        state,
        getters,
        {
            route: {
                params: { pathMatch },
            },
        }
    ) {
        return pathMatch ? pathMatch.split('/') : [];
    },

    [FILTER_SEGMENTS](state, getters) {
        const urlSegments = getters[ROUTE_SEGMENTS];
        return mapFilterSegments(urlSegments);
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
