import { preferenceType, preferenceEntityTypes } from '@enums/profile';
import { EQUAL_PREFERENCES } from './index';

const TYPE = 'type';
const PREFERENCES_DATA = 'preferencesData';
const CUSTOMER = 'customer';
const AVAILABLE_BRANDS = 'availableBrands';
const AVAILABLE_CATEGORIES = 'availableCategories';
const ALL_PREFERENCES = 'allPreferences';

const BRANDS_MAP = 'brandsMap';
const CATEGORIES_MAP = 'categoriesMap';
export const EQUAL_PREFERENCES_MAP = 'equalPreferencesMap';

export const BRANDS = 'brands';
export const CATEGORIES = 'categories';

export const GET_CUSTOMER_BY_TYPE = 'GET_CUSTOMER_BY_TYPE';

export default {
    [BRANDS](state, getters) {
        const brandsMap = getters[BRANDS_MAP];
        const availableBrands = state[AVAILABLE_BRANDS];
        return availableBrands.filter((b) => !!brandsMap[b.id]);
    },

    [CATEGORIES](state, getters) {
        const categoriesMap = getters[CATEGORIES_MAP];
        const availableCategories = state[AVAILABLE_CATEGORIES];
        return availableCategories.filter((c) => !!categoriesMap[c.id]);
    },

    [BRANDS_MAP](state, getters) {
        const isEqual = !!getters[EQUAL_PREFERENCES_MAP][preferenceEntityTypes.BRANDS];
        const type = isEqual ? preferenceType.PERSONAL : state[TYPE];
        const brands = state[PREFERENCES_DATA][type][CUSTOMER][BRANDS] || [];
        const map = {};
        for (const brandId of brands) map[brandId] = brandId;
        return map;
    },

    [CATEGORIES_MAP](state, getters) {
        const isEqual = !!getters[EQUAL_PREFERENCES_MAP][preferenceEntityTypes.CATEGORIES];
        const type = isEqual ? preferenceType.PERSONAL : state[TYPE];
        const categories = state[PREFERENCES_DATA][type][CUSTOMER][CATEGORIES] || [];
        const map = {};
        for (const categoryId of categories) map[categoryId] = categoryId;
        return map;
    },

    [EQUAL_PREFERENCES_MAP](state) {
        const equalPreferences = state[EQUAL_PREFERENCES] || [];
        const map = {};
        for (const entityType of equalPreferences) map[entityType] = entityType;
        return map;
    },

    [GET_CUSTOMER_BY_TYPE]: (state) => (type) => {
        return state[PREFERENCES_DATA][type][CUSTOMER] || {};
    },
};
