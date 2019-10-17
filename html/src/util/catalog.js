const rangeRegx = /from_\d*_to_\d*/;
const numberRegx = /\d+/g;

export function concatCatalogRoutePath(categoryCode, segments) {
    const baseRoute = categoryCode ? `/catalog/${categoryCode}` : '/catalog';
    const basePath = segments.length > 0 ? `${baseRoute}/filters` : baseRoute;
    return basePath.concat(...segments.map(s => `/${s}`));
}

export function getCategoryByCode(items, code) {
    if (items) {
        let item = null;
        let found = null;

        for (let i = 0; i < items.length; i++) {
            item = items[i];
            if (item.code === code) return item;

            found = getCategoryByCode(item.items, code);
            if (found) return found;
        }
    }
    return null;
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

export default { concatCatalogRoutePath, getCategoryByCode, mapFilterSegments };
