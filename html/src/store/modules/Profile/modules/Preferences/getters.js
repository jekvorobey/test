const CUSTOMER = 'customer';
const AVAILABLE_BRANDS = 'availableBrands';
const AVAILABLE_CATEGORIES = 'availableCategories';

export const BRANDS = 'brands';
export const CATEGORIES = 'categories';

export default {
    [BRANDS](state) {
        const brands = state[CUSTOMER][BRANDS] || [];
        const availableBrands = state[AVAILABLE_BRANDS];
        return availableBrands.filter(b => brands.includes(b.id));
    },

    [CATEGORIES](state) {
        const categories = state[CUSTOMER][CATEGORIES] || [];
        const availableCategories = state[AVAILABLE_CATEGORIES];
        return availableCategories.filter(c => categories.includes(c.id));
    },
};
