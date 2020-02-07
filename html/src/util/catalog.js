import { productGroupTypes } from '../assets/scripts/enums';

const rangeRegx = /from_\d*_to_\d*/;
const numberRegx = /\d+/g;

export function generateCategoryUrl(type, entityCode, categoryCode) {
    switch (type) {
        case productGroupTypes.CATALOG:
            return categoryCode ? `/${type}/${categoryCode}` : `/${type}`;

        case productGroupTypes.PROMO:
        case productGroupTypes.SETS:
        case productGroupTypes.BRANDS:
            return categoryCode ? `/${type}/${entityCode}/${categoryCode}` : `/${type}/${entityCode}`;

        default:
            return '/';
    }
}

export function concatCatalogRoutePath(type, entityCode, categoryCode, segments) {
    let baseRoute = '';
    switch (type) {
        case productGroupTypes.CATALOG:
            baseRoute = categoryCode ? `/${type}/${categoryCode}` : `/${type}`;
            break;
        case productGroupTypes.PROMO:
        case productGroupTypes.SETS:
        case productGroupTypes.BRANDS:
            baseRoute = categoryCode ? `/${type}/${entityCode}/${categoryCode}` : `/${type}/${entityCode}`;
            break;
        default:
            return '/';
    }

    const basePath = segments.length > 0 ? `${baseRoute}/filters` : baseRoute;
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

export function computeFilterData(pathMatch, code) {
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
    return filter;
}

export default {
    generateCategoryUrl,
    concatCatalogRoutePath,
    mapFilterSegments,
    computeFilterData,
};
