import { mapFilterSegments, getAllActiveCategories } from '@util/catalog';
import {FAVORITES_MAP, IS_IN_FAVORITES} from "@store/modules/Favorites/getters";
import {ITEMS_REFERRER_PROMO} from "@store/modules/Catalog/index";

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
export const IS_IN_PROMO = 'isInPromo';
export const IS_GLUING_IN_PROMO = 'isGluingInPromo';

const pageSize = 12;

export default {
    [ACTIVE_CATEGORIES]({ categories, baseCategoryCode, categoryCode }) {
        return getAllActiveCategories(categories, categoryCode || baseCategoryCode);
    },

    [ROOT_CATEGORY]({ baseCategoryCode }, { activeCategories }) {
        return activeCategories.find((c) => c.code === baseCategoryCode);
    },

    [BREADCRUMBS](state, { rootCategory, activeCategories }) {
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
        return pathMatch ? pathMatch.split('/').filter((s) => s !== '') : [];
    },

    [FILTER_SEGMENTS](state, getters) {
        const urlSegments = getters[ROUTE_SEGMENTS];
        return mapFilterSegments(urlSegments);
    },

    [ACTIVE_TAGS](state, getters) {
        const activeTags = [];
        const { filters = [] } = state;
        const { filterSegments = {} } = getters;
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            if (Array.isArray(filter.items))
                for (let j = 0; j < filter.items.length; j++) {
                    const item = filter.items[j];
                    if (filterSegments[filter.name] && filterSegments[filter.name][item.code])
                        activeTags.push({ ...item, segment: `${filter.name}-${item.code}` });
                }
            else if (filter.type === 'range') {
                if (filterSegments[filter.name] && filter.name === 'price') {
                    const values = filterSegments[filter.name];
                    activeTags.push({
                        ...filter,
                        name: `Цена: от ${values[0]} до ${values[1]}`,
                        segment: `${filter.name}-from_${values[0]}_to_${values[1]}`,
                    });
                }
            }
        }
        return activeTags;
    },

    [IS_IN_PROMO]: (state) => (id) => {
        return state[ITEMS_REFERRER_PROMO].includes(id)
    },

    [IS_GLUING_IN_PROMO]: (state) => (listIds) => {
        for (let i = 0; i < listIds.length; i++) {
            if (!state[ITEMS_REFERRER_PROMO].includes(listIds[i])) {
                return false
            }
        }
        return true
    }
};
