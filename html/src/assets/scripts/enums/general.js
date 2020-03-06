/**
 * Имена сервисов
 */
export const injectionType = Object.freeze({
    PROGRESS: 'progress',
    LOCALIZATION: 'localization',
    ROUTER: 'router',
    STORE: 'store',
    EVENTS: 'events',
    LOGGER: 'logger',
    COOKIE: 'cookie',
    HTTP: 'http',
    CONFIG: 'config',
    DADATA: 'dadata',
    APPLICATION_CONTEXT: 'applicationContext',
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

export const requestStatus = Object.freeze({
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
});

export const responseStatus = Object.freeze({
    OK: 'ok',
    ERROR: 'error',
});

export const currencySymbol = Object.freeze({
    RUB: '&#8381;',
    USD: '&#36;',
    EUR: '&#128;',
});

export const menuCode = Object.freeze({
    HEADER: 'header_main',
    HELP: 'header_help',
    FOOTER: 'footer_main',
});

export const interval = Object.freeze({
    SECOND: 1000,
    TWO_SECONDS: 2000,
    MINUTE: 60000,
    FIVE_MINUTES: 300000,
    TEN_MINUTES: 600000,
    HOUR: 6000000,
});

export const httpCodes = Object.freeze({
    SUCCESS: 200,
    NO_CONTENT: 204,

    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEAWAY: 502,
    SERVICE_UNAVAILABLE: 504,
    GATEAWAY_TIMEOUT: 505,
});

export const socials = Object.freeze({
    VKONTAKTE: 'vkontakte',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    GOOGLE: 'google',
});

export const mimeType = Object.freeze({
    text: {
        TEXT: 'text/plain',
    },

    image: {
        JPEG: 'image/jpeg',
        PNG: 'image/png',
    },

    application: {
        PDF: 'application/pdf',
        DOC: 'application/msword',
        DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
});

export const sortDirections = Object.freeze({
    DESC: 'desc',
    ASC: 'asc',
});

export const localeDateOptions = Object.freeze({
    weekday: {
        NARROW: 'narrow',
        SHORT: 'short',
        LONG: 'long',
    },

    era: {
        NARROW: 'narrow',
        SHORT: 'short',
        LONG: 'long',
    },

    year: {
        NUMERIC: 'numeric',
        DIGIT2: '2-digit',
    },

    month: {
        NUMERIC: 'numeric',
        DIGIT2: '2-digit',
        NARROW: 'narrow',
        SHORT: 'short',
        LONG: 'long',
    },

    day: {
        NUMERIC: 'numeric',
        DIGIT2: '2-digit',
    },

    hour: {
        NUMERIC: 'numeric',
        DIGIT2: '2-digit',
    },

    minute: {
        NUMERIC: 'numeric',
        DIGIT2: '2-digit',
    },

    second: {
        NUMERIC: 'numeric',
        DIGIT2: '2-digit',
    },

    timeZoneName: {
        SHORT: 'short',
        LONG: 'long',
    },
});