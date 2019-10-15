/**
 * @module Regex
 */

/**
 * Имена (латинские и русские буквы, тире и пробелы).
 */
export const nameAll = /^[ \-a-zа-яё]*$/i;

/**
 * Русские имена (русские буквы, тире и пробелы).
 */
export const nameRu = /^[ \-а-яё]*$/i;

/**
 * Английские имена (латинские буквы, тире и пробелы).
 */
export const nameEn = /^[ \-a-z]*$/i;

/**
 * Пароль (как минимум 1 заглавная и строчная латинские буквы и 1 цифра).
 */
export const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).*$/;

/**
 * Телефонный номер (+7(000) 000-00-00).
 */
export const tel = /^\+7\(\d{3}\) \d{3}(?:-\d{2}){2}$/;

/**
 * КПП (0000AA000).
 */
export const kpp = /^\d{4}[\dA-Z]{2}\d{3}$/;

/**
 * Дата (полная проверка корректности).
 */
export const date = /^(?:31(\.)(?:0?[13578]|1[02])\1|(?:29|30)(\.)(?:0?[,13-9]|1[0-2])\2)(?:1[6-9]|[2-9]\d)?\d{2}$|^29(\.)0?2\3(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])0{2})$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:0?[1-9]|1[0-2])\4(?:1[6-9]|[2-9]\d)?\d{4}$/;

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
 * Email для unicode
 */
export const email = /^(([^\s"(),.:;<>@[\]]+(\.[^\s"(),.:;<>@[\]]+)*)|(".+"))@(([^\s"(),.:;<>@[\]]+\.)+[^\s"(),.:;<>@[\]]{2,})$/i;

export default { mediaMatch, priceReplace, email, tel, dateMatch, date, kpp, password, nameEn, nameRu, nameAll };
