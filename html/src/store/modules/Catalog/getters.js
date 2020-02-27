import { mapFilterSegments, getActiveCategories } from '../../../util/catalog';
import { productGroupTypes } from '../../../assets/scripts/enums';

export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';
export const ACTIVE_TAGS = 'activeTags';
export const ACTIVE_CATEGORY = 'activeCategory';
export const ACTIVE_PAGE = 'activePage';
export const PAGES_COUNT = 'pagesCount';
export const ACTIVE_CATEGORIES = 'activeCategories';
export const ROOT_CATEGORY = 'rootCategory';
export const BREADCRUMBS = 'breadcrumbs';
export const SHOW_PANEL = 'showPanel';

const pageSize = 12;

const productGroupBase = {
    FILTERS: 'filters',
    PRODUCTS: 'products',
};

export default {
    [ROOT_CATEGORY](
        { categories, productGroup },
        { activeCategories },
        {
            route: {
                params: { type, code },
            },
        }
    ) {
        const { filters } = productGroup || {};
        return filters ? activeCategories.find(c => c.code === filters.category) : null;
    },

    [ACTIVE_CATEGORIES](
        { categories, productGroup },
        getters,
        {
            route: {
                params: { code },
            },
        }
    ) {
        const activeCategories = [];
        const { filters } = productGroup || {};

        let rootCategoryCode = filters ? code || filters.category : code;

        let found = null;
        for (let i = 0; i < categories.length; i++) {
            const rootCategory = categories[i];
            found = getActiveCategories(rootCategoryCode, rootCategory, activeCategories);
            if (found) {
                activeCategories.unshift(found);
                break;
            }
        }
        return activeCategories;
    },

    [BREADCRUMBS](state, { activeCategories, rootCategory }) {
        const index = activeCategories.indexOf(rootCategory);
        return index !== -1 ? activeCategories.slice(index + 1) : activeCategories;
    },

    [ACTIVE_PAGE](state, getters, { route }) {
        return route.query.page ? Number(route.query.page) : 1;
    },

    [PAGES_COUNT](state) {
        return Math.ceil(state.range / pageSize);
    },

    [ACTIVE_CATEGORY](state, { activeCategories }) {
        return activeCategories[activeCategories.length - 1];
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
                if (filterSegments[filter.name] && filterSegments[filter.name][item.code])
                    activeTags.push({ ...item, segment: `${filter.name}-${item.code}` });
            }
        }
        return activeTags;
    },
};
