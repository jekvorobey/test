export const cartItemTypes = Object.freeze({
    PRODUCT: 'product',
    MASTERCLASS: 'masterclass',
    BUNDLE_PRODUCT: 'bundle_product',
    CERTIFICATE: 'certificate',
});

export const productGroupTypes = Object.freeze({
    CATALOG: 'catalog',
    NEW: 'new',
    PROMO: 'promo',
    SETS: 'sets',
    BRANDS: 'brands',
    BESTSELLERS: 'bestsellers',
    SEARCH: 'search',
    PRODUCT: 'product',
});

export const catalogItemTypes = Object.freeze({
    PRODUCT: 'product',
    BANNER: 'banner',
});

export const productGroupBase = {
    FILTERS: 'filters',
    PRODUCTS: 'products',
};

export const productBadges = Object.freeze({
    NEW: 1,
    BESTSELLERS: 2,
});

export const productGroupSortFields = Object.freeze({
    NAME: 'name',
    CREATED_AT: 'created_at',
});
