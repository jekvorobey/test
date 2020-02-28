import { $logger } from '../../../services/ServiceLocator';
import { productGroupTypes } from '../../../assets/scripts/enums';
import { storeErrorHandler } from '../../../util/store';
import { getAllActiveCategories } from '../../../util/catalog';
import { getCatalogItems, getCategories, getBanners, getBrand, getFilters, getProductGroup } from '../../../api';
import {
    SET_FILTERS,
    SET_ITEMS,
    SET_ITEMS_MORE,
    SET_CATEGORIES,
    SET_BANNER,
    SET_LOAD_PATH as M_SET_LOAD_PATH,
    SET_CATEGORY_CODE,
    SET_BRAND_CODE,
    SET_PRODUCT_GROUP,
    SET_TYPE,
    SET_ENTITY_CODE,
    APPLY_DATA,
} from './mutations';

const productGroupBase = {
    FILTERS: 'filters',
    PRODUCTS: 'products',
};

const FETCH_FILTERS = 'FETCH_FILTERS';
const FETCH_ITEMS = 'FETCH_ITEMS';
const FETCH_BANNER = 'FETCH_BANNER';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_PRODUCT_GROUP = 'FETCH_PRODUCT_GROUP';

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
            storeErrorHandler(FETCH_CATEGORIES, true)(error);
        }
    },

    async [FETCH_FILTERS]({ commit }, { categoryCode, excludedFilters }) {
        try {
            return await getFilters(categoryCode || undefined, excludedFilters || undefined);
        } catch (error) {
            storeErrorHandler(FETCH_FILTERS, true)(error);
        }
    },

    async [FETCH_ITEMS]({ commit, state }, payload) {
        try {
            return await getCatalogItems(payload);
        } catch (error) {
            storeErrorHandler(FETCH_ITEMS, true)(error);
        }
    },

    async [FETCH_PRODUCT_GROUP]({ commit }, { type, entityCode }) {
        try {
            return await getProductGroup(type, entityCode);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_GROUP, true)(error);
        }
    },

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
        let excludedFilters = null;
        let mergedfilter = filter;

        if (entityCode) {
            if (state.entityCode !== entityCode) {
                data.productGroup = await dispatch(FETCH_PRODUCT_GROUP, {
                    type,
                    entityCode,
                });
                const { based, filters: productGroupFilter } = data.productGroup;
                if (based === productGroupBase.FILTERS)
                    data.categories = await dispatch(FETCH_CATEGORIES, { code: productGroupFilter.category });
                else data.categories = [];
            } else {
                data.productGroup = state.productGroup;
                data.categories = state.categories;
            }

            const { excluded_filters, based, filters: productGroupFilter } = data.productGroup;

            excludedFilters = excluded_filters;
            mergedfilter = {
                ...filter,
                ...productGroupFilter,
                category: filter.category || productGroupFilter.category || null,
            };

            if (state.categoryCode !== mergedfilter.category) {
                if (based === productGroupBase.FILTERS) {
                    data.categoryCode = mergedfilter.category;
                    data.activeCategories = getAllActiveCategories(data.categories, mergedfilter.category);
                    data.filters = await dispatch(FETCH_FILTERS, {
                        categoryCode: mergedfilter.category,
                        excludedFilters,
                    });
                } else {
                    data.categoryCode = '';
                    data.activeCategories = [];
                    data.filters = [];
                }
            }
        } else {
            data.productGroup = null;

            if (state.type !== type) {
                data.categories = await dispatch(FETCH_CATEGORIES);
                data.banner = await dispatch(FETCH_BANNER);
            } else data.categories = state.categories;

            if (state.categoryCode !== mergedfilter.category) {
                data.categoryCode = mergedfilter.category;
                data.activeCategories = getAllActiveCategories(data.categories, mergedfilter.category);

                data.filters = await dispatch(FETCH_FILTERS, {
                    categoryCode: mergedfilter.category,
                    excludedFilters,
                });
            }
        }

        data.entityCode = entityCode;
        data.type = type;

        data.routeSegments = routeSegments;
        data.filterSegments = filterSegments;
        data.page = page;

        const itemsData = await dispatch(FETCH_ITEMS, {
            filter: { ...mergedfilter, category: mergedfilter.category || undefined },
            page,
            orderField,
            orderDirection,
        });

        commit(APPLY_DATA, data);
        if (showMore) commit(SET_ITEMS_MORE, itemsData);
        else commit(SET_ITEMS, itemsData);
    },
};
