/**
 * @module Regex
 */

/**
 * Упрощённая дата (для разбиения по скобочным группам).
 *
 * @example
 * const dateStr = '01.01.1970';
 * const matchResult = dateStr.match(Regex.dateMatch);
 * const dateObj = new Date(+result[3], result[2] - 1, +result[1]);
 */
export const dateMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/;

/**
 * Часть matchMedia со значением (для получения численного значения брейкпоинта).
 *
 * @example
 * const breakpoint = Variables.media.tablet;
 * // breakpointValue = 768
 * const breakpointValue = Number(breakpoint.media.match(Regex.mediaMatch)[1]);
 */
export const mediaMatch = /max-width: (\d+)px/;

/**
 * Позиция между разрядами в цене (для проставления пробелов через replace).
 *
 * @example
 * let str = '9999999';
 * // str = '9 999 999';
 * str.replace(Regex.priceReplace, ' ');
 */
export const priceReplace = /\B(?=(\d{3})+(?!\d))/g;

/**
 * Проверка на внещний урл
 */
export const externalUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
