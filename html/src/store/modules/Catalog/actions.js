import _mergeWith from 'lodash/mergeWith';

import { productGroupBase, productGroupTypes } from '@enums/product';
import { storeErrorHandler } from '@util/store';

import {
    getCatalogItems,
    getCategories,
    getBanners,
    getFilters,
    getProductGroup,
    getBrandsActive,
    getBrand,
    getProfilePromopageItemsIds,
    addProfilePromopageProductById,
    deleteProfilePromopageProductById,
} from '@api';
import { SET_LOAD_PATH as M_SET_LOAD_PATH, APPLY_DATA, SET_PREVIOUS_CATALOG_FETCH_PAYLOAD, SET_ITEMS_REFERRER_PROMO } from './mutations';
import { PREVIOUS_CATALOG_FETCH_PAYLOAD } from './index';
import {ADD_FAVORITES_ITEM, DELETE_FAVORITES_ITEM, TOGGLE_FAVORITES_ITEM} from "@store/modules/Favorites/actions";
import {IS_IN_PROMO} from "@store/modules/Catalog/getters";

function mergeFunction(objValue, srcValue) {
    if (Array.isArray(objValue)) return objValue.concat(srcValue);
    return srcValue;
}

const FETCH_FILTERS = 'FETCH_FILTERS';
const FETCH_ITEMS = 'FETCH_ITEMS';
const FETCH_BANNER = 'FETCH_BANNER';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_PRODUCT_GROUP = 'FETCH_PRODUCT_GROUP';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';
export const REFRESH_CATALOG_DATA = 'REFRESH_CATALOG_DATA';
export const CHANGE_FILTER_STATE = 'CHANGE_FILTER_STATE';
export const FETCH_ITEMS_REFERRER_PROMO = 'FETCH_ITEMS_REFERRER_PROMO';
export const TOGGLE_ITEM_REFERRER_PROMO = 'TOGGLE_ITEM_REFERRER_PROMO';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(M_SET_LOAD_PATH, payload);
    },

    [CHANGE_FILTER_STATE]({ commit }, payload) {
        commit(CHANGE_FILTER_STATE, payload);
    },

    // eslint-disable-next-line no-unused-vars
    async [FETCH_BANNER](context, payload) {
        try {
            const data = await getBanners();
            return data[6];
        } catch (error) {
            storeErrorHandler(FETCH_BANNER, true)(error);
        }
    },

    async [FETCH_CATEGORIES](context, { categories, filter }) {
        try {
            return await getCategories(categories, null, filter);
        } catch (error) {
            storeErrorHandler(FETCH_CATEGORIES)(error);
            return [];
        }
    },

    async [FETCH_FILTERS](context, { appliedFilters, excludedFilters }) {
        try {
            return await getFilters(appliedFilters, excludedFilters);
        } catch (error) {
            storeErrorHandler(FETCH_FILTERS)(error);
            return [];
        }
    },

    async [FETCH_ITEMS](context, payload) {
        try {
            return await getCatalogItems(payload);
        } catch (error) {
            storeErrorHandler(FETCH_ITEMS, true)(error);
            return [];
        }
    },

    async [FETCH_PRODUCT_GROUP](context, { type, entityCode, filter }) {
        try {
            let data;

            if (type === productGroupTypes.BRANDS) {
                const [brandsList, brandDetail] = await Promise.all([getBrandsActive(), getBrand(entityCode)]);

                const brand = brandsList[0].values.filter((brand) => brand.code === entityCode)[0];

                if (!brand || !brand.active) {
                    const error = new Error();
                    error.isCancel = false;
                    error.message = 'Brand not found in active brands';
                    error.status = 404;
                    throw error;
                }

                data = {
                    based: 'filters',
                    code: entityCode,
                    excluded_filters: ['brand'],
                    filters: { brand: [entityCode] },
                    name: brand.name,
                    preview_photo: null,
                    brand: brandDetail,
                };
            } else {
                data = await getProductGroup(type, entityCode || undefined, filter);
            }
            return data;
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_GROUP, true)(error);
        }
    },

    async [REFRESH_CATALOG_DATA]({ state, dispatch }) {
        return dispatch(FETCH_CATALOG_DATA, state[PREVIOUS_CATALOG_FETCH_PAYLOAD]);
    },

    async [FETCH_CATALOG_DATA]({ state, dispatch, commit }, payload) {
        const {
            type = null,
            entityCode = null,

            filter = {},
            routeSegments,
            filterSegments,

            searchString = null,
            page,
            orderField,
            orderDirection,

            showMore,

            pagePath,
        } = payload;

        commit(SET_PREVIOUS_CATALOG_FETCH_PAYLOAD, payload);

        const data = {};
        const fetchList = [];
        const isProductGroupChanged =
            state.type !== type || state.entityCode !== entityCode || state.searchString !== searchString;

        let mergedCategory = filter.category;
        let mergedfilter = filter;

        let based = null;
        let excludedFilters = null;
        let productGroupFilter = null;

        if (isProductGroupChanged) {
            const query = searchString ? encodeURI(searchString) : undefined;
            data.productGroup = await dispatch(FETCH_PRODUCT_GROUP, {
                type,
                entityCode,
                filter: {
                    search_string: query,
                },
            });

            data.entityCode = entityCode;
            data.type = type;

            // eslint-disable-next-line prefer-destructuring
            based = data.productGroup.based;
            excludedFilters = data.productGroup.excluded_filters;
            productGroupFilter = data.productGroup.filters;
        } else {
            data.productGroup = state.productGroup;

            // eslint-disable-next-line prefer-destructuring
            based = state.productGroup.based;
            excludedFilters = state.productGroup.excluded_filters;
            productGroupFilter = state.productGroup.filters;
        }

        mergedCategory = filter.category || productGroupFilter.category || undefined;
        mergedfilter = {
            ..._mergeWith({ ...filter }, productGroupFilter, mergeFunction),
            category: mergedCategory,
        };

        if (based === productGroupBase.FILTERS) {
            if (isProductGroupChanged) {
                fetchList.push({
                    action: FETCH_CATEGORIES,
                    payload: { categories: productGroupFilter.category_roots || [], filter: productGroupFilter },
                });
            } else {
                data.categories = state.categories;
            }

            data.baseCategoryCode = productGroupFilter.category || null;
            data.categoryCode = filter.category || null;

            fetchList.push({
                action: FETCH_FILTERS,
                payload: {
                    appliedFilters: mergedfilter,
                    excludedFilters,
                },
            });
        } else {
            data.categories = [];
            data.filters = [];
            data.baseCategoryCode = null;
            data.categoryCode = null;
        }

        data.searchString = searchString;
        data.routeSegments = routeSegments;
        data.filterSegments = filterSegments;
        data.page = page;

        fetchList.push({
            action: FETCH_ITEMS,
            payload: {
                filter: mergedfilter,
                page,
                orderField,
                orderDirection,
                pagePath,
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
                    data.filtersStateMap = {};
                    // eslint-disable-next-line no-restricted-syntax
                    for (const dataFilter of data.filters)
                        if (dataFilter.name === 'brand') {
                            data.filtersStateMap[dataFilter.name] = { isExpanded: true, showMore: false };
                        } else {
                            data.filtersStateMap[dataFilter.name] = state.filtersStateMap[dataFilter.name] || {
                                isExpanded: false,
                                showMore: false,
                            };
                        }
                    break;
                case FETCH_ITEMS:
                    {
                        const { items = [], range = 0, total = 0 } = fetchItem;
                        if (showMore) data.items = [...state.items, ...items];
                        else data.items = items;
                        data.range = range;
                        data.rangeWithoutUnion = total;

                        if (data.rangeWithoutUnion < data.range) {
                            data.rangeWithoutUnion = data.range;
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        commit(APPLY_DATA, data);
    },

    async [FETCH_ITEMS_REFERRER_PROMO]({commit}) {
        try {
            const data = await getProfilePromopageItemsIds();
            console.log('action FETCH_ITEMS_REFERRER_PROMO', data)
            commit(SET_ITEMS_REFERRER_PROMO, data);
        } catch(e) {
            console.log(e)
        }
    },

    async [TOGGLE_ITEM_REFERRER_PROMO]({ dispatch, getters }, productId) {
        try {
            const exists = getters[IS_IN_PROMO](productId);
            console.log('TOGGLE_ITEM_REFERRER_PROMO exists ', exists)

            if (!exists) await addProfilePromopageProductById(productId);
            else await deleteProfilePromopageProductById(productId);

            await dispatch(FETCH_ITEMS_REFERRER_PROMO)
        } catch(e) {
            console.log(e)
        }
    },
};
