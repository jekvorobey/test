import { $context } from '@services';
import { productGroupTypes } from '@enums/product';
import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';

const rangeRegx = /from_\d*_to_\d*/;
const numberRegx = /\d+/g;

function getSpeakerString(speaker, withProfession = false) {
    const fullName = `${speaker.firstName} ${speaker.lastName}`;
    return withProfession ? `${fullName}, ${speaker.profession}` : fullName;
}

export function generateAbsoluteProductUrl(categoryCode, code, refCode) {
    if (refCode) return `${$context.baseURL}/${productGroupTypes.CATALOG}/${categoryCode}/${code}?refCode=${refCode}`;
    return `${$context.baseURL}/${productGroupTypes.CATALOG}/${categoryCode}/${code}`;
}

export function generateAbsoluteMasterclassUrl(code, refCode) {
    if (refCode) return `${$context.baseURL}/masterclasses/${code}?refCode=${refCode}`;
    return `${$context.baseURL}/masterclasses/${code}`;
}

export function generateProductUrl(categoryCode, code, refCode) {
    if (refCode) return `/${productGroupTypes.CATALOG}/${categoryCode}/${code}?refCode=${refCode}`;
    return `/${productGroupTypes.CATALOG}/${categoryCode}/${code}`;
}

export function generateMasterclassUrl(code, refCode) {
    if (refCode) return `/masterclasses/${code}?refCode=${refCode}`;
    return `/masterclasses/${code}`;
}

export function generateSearchUrl(search_string) {
    return `/${productGroupTypes.SEARCH}/?search_string=${search_string}`;
}

export function generateTicketDownloadUrl(orderId, basketItemId) {
    return orderId && basketItemId && `/v1/lk/order/${orderId}/tickets?basket_item_id=${basketItemId}`;
}

export function generateCategoryUrl(type, entityCode, categoryCode) {
    switch (type) {
        case productGroupTypes.CATALOG:
        case productGroupTypes.NEW:
        case productGroupTypes.BESTSELLERS:
        case productGroupTypes.SEARCH:
            return categoryCode ? `/${type}/${categoryCode}` : `/${type}/`;

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
        case productGroupTypes.BESTSELLERS:
        case productGroupTypes.SEARCH:
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
    return basePath.concat(...segments.map((s) => `/${s}`));
}

export function concatMasterclassesRoutePath(segments) {
    const baseRoute = '/masterclasses/';
    const basePath = segments.length > 0 ? `${baseRoute}filters` : baseRoute;
    return basePath.concat(...segments.map((s) => `/${s}`));
}

export function mapFilterSegments(urlSegments) {
    const segments = {};
    for (let i = 0; i < urlSegments.length; i++) {
        const segment = urlSegments[i];
        const name = segment.split('-')[0];
        const value = segment.split('-')[1];
        if (rangeRegx.test(segment)) {
            const numbers = segment.match(numberRegx);
            segments[name] = numbers.map((n) => +n);
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

export function computeFilterMasterclassData(pathMatch) {
    const filter = {};
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

export function prepareProductImage(image, desktopSize, tabletSize) {
    return {
        ...image,
        desktop: desktopSize && {
            webp: `${generatePictureSourcePath(
                desktopSize,
                desktopSize,
                image.id,
                fileExtension.image.WEBP
            )}, ${generatePictureSourcePath(desktopSize * 2, desktopSize * 2, image.id, fileExtension.image.WEBP)} 2x`,
            orig: `${generatePictureSourcePath(desktopSize, desktopSize, image.id)}, ${generatePictureSourcePath(
                desktopSize * 2,
                desktopSize * 2,
                image.id
            )} 2x`,
        },
        tablet: tabletSize && {
            webp: `${generatePictureSourcePath(
                tabletSize,
                tabletSize,
                image.id,
                fileExtension.image.WEBP
            )}, ${generatePictureSourcePath(tabletSize * 2, tabletSize * 2, image.id, fileExtension.image.WEBP)} 2x`,
            orig: `${generatePictureSourcePath(tabletSize, tabletSize, image.id)}, ${generatePictureSourcePath(
                tabletSize * 2,
                tabletSize * 2,
                image.id
            )} 2x`,
        },
        default: generatePictureSourcePath(desktopSize, desktopSize, image.id),
    };
}

export function prepareMasterclassSpeakers(speakers = []) {
    if (speakers.length > 0 && speakers.length <= 2) return getSpeakerString(speakers[0], true);
    if (speakers.length > 2) return `${getSpeakerString(speakers[0])}, ${getSpeakerString(speakers[1])} и др.`;
}

export default {
    generateCategoryUrl,
    concatCatalogRoutePath,
    mapFilterSegments,
    computeFilterData,
};
