import { productGroupTypes } from '@enums/product';

const rangeRegx = /from_\d*_to_\d*/;
const numberRegx = /\d+/g;

export function generateProductUrl(categoryCode, code) {
    return `/${productGroupTypes.CATALOG}/${categoryCode}/${code}`;
}

export function generateCategoryUrl(type, entityCode, categoryCode) {
    switch (type) {
        case productGroupTypes.CATALOG:
        case productGroupTypes.NEW:
            return categoryCode ? `/${type}/${categoryCode}` : `/${type}/`;

        case productGroupTypes.MASTERCLASSES:
            return entityCode ? `/${type}/${entityCode}` : `/${type}/`;

        case productGroupTypes.PROMO:
        case productGroupTypes.SETS:
        case productGroupTypes.BRANDS:
            return categoryCode ? `/${type}/${entityCode}/${categoryCode}/` : `/${type}/${entityCode}/`;

        default:
            return '/';
    }
}

export function concatCatalogRoutePath(type, entityCode, categoryCode, segments) {
    let baseRoute = '';
    switch (type) {
        case productGroupTypes.CATALOG:
        case productGroupTypes.NEW:
            baseRoute = categoryCode ? `/${type}/${categoryCode}/` : `/${type}/`;
            break;
        case productGroupTypes.PROMO:
        case productGroupTypes.SETS:
        case productGroupTypes.BRANDS:
            baseRoute = categoryCode ? `/${type}/${entityCode}/${categoryCode}/` : `/${type}/${entityCode}/`;
            break;
        default:
            return '/';
    }

    const basePath = segments.length > 0 ? `${baseRoute}filters` : baseRoute;
    return basePath.concat(...segments.map(s => `/${s}`));
}

export function mapFilterSegments(urlSegments) {
    const segments = {};
    for (let i = 0; i < urlSegments.length; i++) {
        const segment = urlSegments[i];
        const name = segment.split('-')[0];
        const value = segment.split('-')[1];
        if (rangeRegx.test(segment)) {
            const numbers = segment.match(numberRegx);
            segments[name] = numbers.map(n => +n);
        } else {
            if (!segments[name]) segments[name] = {};
            segments[name][value] = value;
        }
    }
    return segments;
}

export function getAllActiveCategories(categories, rootCode) {
    const activeCategories = [];
    let found = null;
    for (let i = 0; i < categories.length; i++) {
        const rootCategory = categories[i];
        found = getActiveCategories(rootCode, rootCategory, activeCategories);
        if (found) {
            activeCategories.unshift(found);
            break;
        }
    }

    return activeCategories;
}

export function getActiveCategories(code, item, activeItems = []) {
    if (item.code === code) return item;

    if (Array.isArray(item.items)) {
        for (let i = 0; i < item.items.length; i++) {
            const child = item.items[i];
            const found = getActiveCategories(code, child, activeItems);
            if (found) {
                activeItems.unshift(found);
                return item;
            }
        }
    }
    return false;
}

export function computeFilterData(pathMatch, code = null) {
    const filter = { category: code };
    const routeSegments = pathMatch ? pathMatch.split('/') : [];
    const filterSegments = mapFilterSegments(routeSegments);
    const filterNames = Object.keys(filterSegments);

    for (let i = 0; i < filterNames.length; i++) {
        const filterName = filterNames[i];
        const segment = filterSegments[filterName];

        if (Array.isArray(segment)) filter[filterName] = segment;
        else filter[filterName] = Object.keys(segment);
    }
    return { filter, routeSegments, filterSegments };
}

export default {
    generateCategoryUrl,
    concatCatalogRoutePath,
    mapFilterSegments,
    computeFilterData,
};
