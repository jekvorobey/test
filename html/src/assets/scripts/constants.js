/**
 * Сюда пишем все константы проекта
 */

export const MIN_SCROLL_VALUE = 1;

/**
 * Имена сервисов
 */
export const serviceName = Object.freeze({
    PROGRESS: 'progress',
    ROUTER: 'router',
    STORE: 'store',
    EVENTS: 'events',
    LOGGER: 'logger',
    COOKIE: 'cookie',
    HTTP: 'http',
    CONFIG: 'config',
    DADATA: 'dadata',
});

/**
 * Имена событий
 */
export const eventName = Object.freeze({
    SCROLL: 'scroll',
    RESIZE: 'resize',
});

/**
 * Брейкпоинты проекта.
 */
export const breakpoints = Object.freeze({
    mobileSm: 320,
    mobile: 480,
    mobileLg: 640,
    tablet: 768,
    tabletLg: 1024,
    desktop: 1280,
    desktopLg: 1600,
    desktopXl: 1920,
});

export const cartItemTypes = Object.freeze({
    PRODUCT: 'product',
    MASTERCLASS: 'masterclass',
});

export const receiveMethods = Object.freeze({
    DELIVERY: 1,
    EXPRESS: 2,
    PICKUP: 3,
});

export const deliveryMethods = Object.freeze({
    OUTPOST_PICKUP: 1,
    POSTOMAT_PICKUP: 2,
    DELIVERY: 3,
    EXPRESS: 4,
});

export const deliveryTypes = Object.freeze({
    SPLIT: 1,
    CONSOLIDATION: 2,
});

export const requestStatus = Object.freeze({
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
});

export const suggestionTypes = Object.freeze({
    REGION: 'region',
    AREA: 'area',
    CITY: 'city',
    SETTLEMENT: 'settlement',
    STREET: 'street',
    HOUSE: 'house',
});

export const currencySymbol = Object.freeze({
    RUB: '&#8381;',
    USD: '&#36;',
    EUR: '&#128;',
});
