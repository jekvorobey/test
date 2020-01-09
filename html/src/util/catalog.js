const rangeRegx = /from_\d*_to_\d*/;
const numberRegx = /\d+/g;

export function generateCategoryUrl(brandCode, code) {
    if (brandCode) return code ? `/brand/${brandCode}/${code}` : `/brand/${brandCode}`;
    return code ? `/catalog/${code}` : `/catalog`;
}

export function concatBrandRoutePath(brandCode, categoryCode, segments) {
    const baseRoute = categoryCode ? `/brand/${brandCode}/${categoryCode}` : `/brand/${brandCode}`;
    const basePath = segments.length > 0 ? `${baseRoute}/filters` : baseRoute;
    return basePath.concat(...segments.map(s => `/${s}`));
}

export function concatCatalogRoutePath(categoryCode, segments) {
    const baseRoute = categoryCode ? `/catalog/${categoryCode}` : '/catalog';
    const basePath = segments.length > 0 ? `${baseRoute}/filters` : baseRoute;
    return basePath.concat(...segments.map(s => `/${s}`));
}

export function mapFilterSegments(urlSegments) {
    const segments = {};
    for (let i = 0; i < urlSegments.length; i++) {
        const segment = urlSegments[i];
        const name = segment.split('-')[0];
        if (rangeRegx.test(segment)) {
            const numbers = segment.match(numberRegx);
            segments[name] = numbers.map(n => +n);
        } else {
            if (!segments[name]) segments[name] = {};
            segments[name][segment] = segment;
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

export default { generateCategoryUrl, concatCatalogRoutePath, concatBrandRoutePath, mapFilterSegments };
