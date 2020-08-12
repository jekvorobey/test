import { DEFAULT_PAGE } from '@constants';
import { masterclassFilterName } from '@enums/catalog';
import { storeErrorHandler } from '@util/store';

import { getMasterclasses, getMasterclass, getCatalogMasterclasses, getMasterclassFilters } from '@api';
import { SET_MASTERCLASS, SET_FEATURED, SET_ITEMS, SET_ITEMS_MORE, SET_QUERY_PARAMS, SET_FILTERS } from './mutations';

export const FETCH_MASTERCLASS_CATALOG_DATA = 'FETCH_MASTERCLASS_CATALOG_DATA';
export const FETCH_MASTERCLASS_ITEMS = 'FETCH_MASTERCLASS_ITEMS';
export const FETCH_MASTERCLASS_FILTERS = 'FETCH_MASTERCLASS_FILTERS';

export const FETCH_MASTERCLASS_DATA = 'FETCH_MASTERCLASS_DATA';
export const FETCH_MASTERCLASS = 'FETCH_MASTERCLASS';
export const FETCH_FEATURED = 'FETCH_FEATURED';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_MASTERCLASS_ITEMS](
        { commit, state },
        { page = DEFAULT_PAGE, sortDirection, sortField, filter, showMore }
    ) {
        try {
            // Если фильтр не указан, значит берем первое дефолтное значение в фильтре
            if (!filter[masterclassFilterName.TIME]) {
                const { filters = [] } = state;
                const { items } = filters.find((f) => f.name === masterclassFilterName.TIME) || { items: [] };

                // если такого фильтр есть, и у него есть хотя бы 1 вариант - выбираем первый
                if (items.length > 0) {
                    const { code } = items[0];
                    filter = {
                        ...filter,
                        [masterclassFilterName.TIME]: code,
                    };
                }
            }

            const data = await getCatalogMasterclasses(page, sortDirection, sortField, filter);
            commit(SET_QUERY_PARAMS, { page });
            if (showMore) commit(SET_ITEMS_MORE, data);
            else commit(SET_ITEMS, data);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASS_ITEMS, true)(error);
        }
    },

    // eslint-disable-next-line no-unused-vars
    async [FETCH_MASTERCLASS_FILTERS]({ commit }, payload) {
        try {
            const excludedFilters = ['place_name']; // фильтр 'Места' пока скрыт
            const { items } = await getMasterclassFilters(excludedFilters);
            commit(SET_FILTERS, items);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASS_FILTERS)(error);
        }
    },

    async [FETCH_MASTERCLASS]({ commit }, { code }) {
        try {
            const data = await getMasterclass(code);
            commit(SET_MASTERCLASS, data);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASS, true)(error);
        }
    },

    async [FETCH_FEATURED]({ commit }, payload) {
        try {
            const data = await getMasterclasses(payload);
            commit(SET_FEATURED, data);
        } catch (error) {
            storeErrorHandler(FETCH_FEATURED)(error);
        }
    },

    async [FETCH_MASTERCLASS_DATA]({ dispatch }, payload) {
        return Promise.all([dispatch(FETCH_MASTERCLASS, payload), dispatch(FETCH_FEATURED, payload)]);
    },

    async [FETCH_MASTERCLASS_CATALOG_DATA]({ dispatch }, payload) {
        try {
            await dispatch(FETCH_MASTERCLASS_FILTERS, payload);
            await dispatch(FETCH_MASTERCLASS_ITEMS, payload);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASS_CATALOG_DATA, true)(error);
        }
    },
};
