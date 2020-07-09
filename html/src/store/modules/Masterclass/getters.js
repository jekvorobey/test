import { MASTERCLASSES_PAGE_SIZE } from '@constants/masterclasses';
import { mapFilterSegments } from '@util/catalog';

export const ACTIVE_PAGE = 'activePage';
export const PAGES_COUNT = 'pagesCount';
export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';

export const NULLABLE_FILTERS = 'nullableFilters';

function getNullItem(filter) {
    let name = null;

    switch (filter.name) {
        case 'profession':
            name = 'Все темы';
            break;
        case 'place_city':
            name = 'Все города';
            break;
        case 'place_name':
            name = 'Все места';
            break;
        case 'type':
            name = 'Все типы событий';
            break;
    }

    if (name) return { id: 'all', code: null, name };
}

function prepareFilter(filter) {
    const items = filter.items;
    const nullItem = getNullItem(filter);
    const preparedItems = nullItem ? [nullItem, ...filter.items] : filter.items;
    const f = { ...filter, items: preparedItems };
    return f;
}

export default {
    [NULLABLE_FILTERS](state) {
        const { filters = [] } = state;
        return filters.map(prepareFilter);
    },

    [PAGES_COUNT](state) {
        return Math.ceil(state.range / MASTERCLASSES_PAGE_SIZE);
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
};
