/**
 * Сюда пишем все константы проекта
 */

export const MIN_SCROLL_VALUE = 100;

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
});

/**
 * Имена событий
 */
export const eventName = Object.freeze({
    SCROLL: 'scroll',
    RESIZE: 'resize',
});
