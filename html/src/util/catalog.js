const catalogPathRegx = /^.*filters\//;

export function concatCatalogRoutePath(categoryCode, segments) {
    const baseRoute = categoryCode ? `/catalog/${categoryCode}` : '/catalog';
    const basePath = segments.length > 0 ? `${baseRoute}/filters` : baseRoute;
    return basePath.concat(...segments.map(s => `/${s}`));
}

export function getCatalogRouteSegments(path) {
    const matches = path.match(catalogPathRegx);
    return Array.isArray(matches) ? path.replace(matches[0], '').split('/') : [];
}

export function getCatalogRouteCategoryCode(path) {
    return path ? path.split('/').slice(2, 3)[0] : null;
}

export default { concatCatalogRoutePath, getCatalogRouteCategoryCode, getCatalogRouteSegments };
