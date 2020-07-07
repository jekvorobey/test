export const modalName = Object.freeze({
    general: {
        LOGIN: 'login-modal',
        REGISTRATION: 'registration-modal',
        QUICK_VIEW: 'quick-view-modal',
        ADD_TO_CART: 'add-to-cart-modal',
        CITY_SELECTION: 'city-selection-modal',
        NOTIFICATION: 'notification-modal',
        AUTH: 'auth-modal',
    },

    product: {
        GALLERY: 'gallery-modal',
    },

    checkout: {
        RECIPIENT_EDIT: 'checkout-recipient-modal',
        DATE_EDIT: 'checkout-date-modal',
        PICKUP_POINT: 'checkout-pickup-point-modal',
    },

    profile: {
        MESSAGE: 'message-modal',
        ADDRESS_EDIT: 'address-edit-modal',
        REFERRAL_CODE_EDIT: 'referral-code-edit-modal',
        PASSWORD_EDIT: 'password-edit-modal',
        PORTFOLIO_EDIT: 'portfolio-edit-modal',
        EMAIL_EDIT: 'email-edit-modal',
        PHONE_EDIT: 'phone-edit-modal',
        NAVIGATION: 'navigation-modal',
        PREFERENCE_EDIT: 'preference-edit-modal',

        PROMO_ADD_BY_LINK: 'promopage-add-by-link-modal',
        PROMO_ADD: 'promopage-add-modal',
        PROMO_EDIT: 'promopage-edit-modal',

        RETURN_REASON: 'return-reason-modal',
    },

    cart: {
        CLEAR_CART: 'clear-cart-modal',
    },
});

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
    RETAIL_ROCKET: 'retailRocket',
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
    TWO_SECONDS: 2 * 1000,
    MINUTE: 60 * 1000,
    FIVE_MINUTES: 5 * 60 * 1000,
    TEN_MINUTES: 10 * 60 * 1000,
    HALF_HOUR: 30 * 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
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

export const fileExtension = Object.freeze({
    application: {
        PDF: 'pdf',
        DOC: 'doc',
        DOCX: 'docx',
    },

    image: {
        JPEG: 'jpeg',
        PNG: 'png',
        WEBP: 'webp',
    },
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

    video: {
        MOV: 'video/quicktime',
        MP4: 'video/mp4',
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

export const cookieNames = Object.freeze({
    REFERRAL: 'referral',
    IBT_GEOLOCATION: 'ibt_geoc',
});

export const authMode = Object.freeze({
    LOGIN: 0,
    REGISTRATION: 1,
});

export const themeCodes = Object.freeze({
    PROMOCODE: 1,
});

export const returnReasons = Object.freeze({
    MARRIAGE: 'Брак',
    WRONG: 'Не тот товар в заказе',
    PACKAGE: 'Вскрыта оригинальная упаковка',
    TIME: 'Истекает срок годности товара',
    QUALITY: 'Товар ненадлежащего качества',
    DESCRIPTION: 'Товар не соответствует описанию',
    DECISION: 'Изменил решение о покупке',
    OTHER: 'Другое',
});

export const dayOfTheWeek = Object.freeze({
    0: 'воскресенье',
    1: 'понедельник',
    2: 'вторник',
    3: 'среда',
    4: 'четверг',
    5: 'пятница',
    6: 'суббота',
});

export const agreementTypes = Object.freeze({
    PUBLIC_OFFER: 'public-offer',
    PERSONAL_POLICY: 'personal-policy',
});
