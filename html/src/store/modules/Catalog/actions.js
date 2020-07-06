import { $logger } from '@services';
import { productGroupTypes, productGroupBase } from '@enums/product';
import { storeErrorHandler } from '@util/store';
import { getAllActiveCategories } from '@util/catalog';

import { getCatalogItems, getCategories, getBanners, getBrand, getFilters, getProductGroup, getProducts } from '@api';
import { SET_LOAD_PATH as M_SET_LOAD_PATH, APPLY_DATA } from './mutations';

const FETCH_FILTERS = 'FETCH_FILTERS';
const FETCH_ITEMS = 'FETCH_ITEMS';
const FETCH_BANNER = 'FETCH_BANNER';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_PRODUCT_GROUP = 'FETCH_PRODUCT_GROUP';
//const FETCH_CATALOG_INFO = 'FETCH_CATALOG_INFO';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(M_SET_LOAD_PATH, payload);
    },

    async [FETCH_BANNER]({ commit }, payload) {
        try {
            const data = await getBanners();
            return data[6];
        } catch (error) {
            storeErrorHandler(FETCH_BANNER, true)(error);
        }
    },

    async [FETCH_CATEGORIES]({ commit }, { code } = {}) {
        try {
            return await getCategories(code);
        } catch (error) {
            storeErrorHandler(FETCH_CATEGORIES)(error);
            return [];
        }
    },

    async [FETCH_FILTERS]({ commit }, { categoryCode, excludedFilters }) {
        try {
            return await getFilters(categoryCode || undefined, excludedFilters || undefined);
        } catch (error) {
            storeErrorHandler(FETCH_FILTERS)(error);
            return [];
        }
    },

    async [FETCH_ITEMS]({ commit, state }, payload) {
        try {
            return await getProducts(payload);
        } catch (error) {
            storeErrorHandler(FETCH_ITEMS)(error);
            return [];
        }
    },

    async [FETCH_PRODUCT_GROUP]({ commit }, { type, entityCode }) {
        try {
            return await getProductGroup(type, entityCode || undefined);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_GROUP, true)(error);
        }
    },

    // async [FETCH_CATALOG_INFO]({ commit }, { type, entityCode }) {
    //     try {
    //         return await getProductGroup(type, entityCode);
    //     } catch (error) {
    //         storeErrorHandler(FETCH_CATALOG_INFO, true)(error);
    //     }
    // },

    async [FETCH_CATALOG_DATA]({ state, dispatch, commit }, payload) {
        const {
            type,
            entityCode,

            filter,
            routeSegments,
            filterSegments,

            page,
            orderField,
            orderDirection,

            showMore,
        } = payload;

        const data = {};
        const fetchList = [];

        let mergedfilter = filter;

        let based = null;
        let excludedFilters = null;
        let productGroupFilter = null;

        //if (type === productGroupTypes.CATALOG) data.info = await dispatch(FETCH_CATALOG_INFO);

        if (state.type !== type || state.entityCode !== entityCode) {
            data.productGroup = await dispatch(FETCH_PRODUCT_GROUP, {
                type,
                entityCode,
            });

            data.entityCode = entityCode;
            data.type = type;

            based = data.productGroup.based;
            excludedFilters = data.productGroup.excluded_filters;
            productGroupFilter = data.productGroup.filters;

            if (based === productGroupBase.FILTERS) {
                fetchList.push({ action: FETCH_CATEGORIES, payload: { code: productGroupFilter.category } });
            } else {
                data.categories = [];
                data.activeCategories = [];
            }
        } else {
            data.productGroup = state.productGroup;
            data.categories = state.categories;

            based = state.productGroup.based;
            excludedFilters = state.productGroup.excluded_filters;
            productGroupFilter = state.productGroup.filters;
        }

        mergedfilter = {
            ...filter,
            ...productGroupFilter,
            category: filter.category || productGroupFilter.category || null,
        };

        if (state.baseCategoryCode !== productGroupFilter.category || state.categoryCode !== filter.category) {
            if (based === productGroupBase.FILTERS) {
                data.baseCategoryCode = productGroupFilter.category;
                data.categoryCode = filter.category;

                fetchList.push({
                    action: FETCH_FILTERS,
                    payload: {
                        categoryCode: mergedfilter.category,
                        excludedFilters,
                    },
                });
            } else {
                data.baseCategoryCode = null;
                data.categoryCode = null;
                data.filters = [];
            }
        } else {
            data.categoryCode = state.categoryCode;
            data.baseCategoryCode = state.baseCategoryCode;
        }

        data.routeSegments = routeSegments;
        data.filterSegments = filterSegments;
        data.page = page;

        fetchList.push({
            action: FETCH_ITEMS,
            payload: {
                filter: { ...mergedfilter, category: mergedfilter.category || undefined },
                page,
                orderField,
                orderDirection,
            },
        });

        const fetchData = await Promise.all(fetchList.map((method) => dispatch(method.action, method.payload)));

        for (let i = 0; i < fetchList.length; i++) {
            const method = fetchList[i];
            const fetchItem = fetchData[i];

            switch (method.action) {
                case FETCH_CATEGORIES:
                    data.categories = fetchItem;
                    break;
                case FETCH_FILTERS:
                    data.filters = fetchItem;
                    break;
                case FETCH_ITEMS:
                    const { items = [], range = 0 } = fetchItem;
                    if (showMore) data.items = [...state.items, ...items];
                    else data.items = items;
                    data.range = range;
                    break;
                default:
                    break;
            }
        }

        commit(APPLY_DATA, data);
    },
};
