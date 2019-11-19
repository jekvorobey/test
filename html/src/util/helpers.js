import _isDate from 'lodash/isDate';
import _isString from 'lodash/isString';
import _isNaN from 'lodash/isNaN';

/**
 * Переводит переменную даты в строку.
 *
 * @param  {Date}   date Объект даты.
 * @return {string}      Строка даты.
 */
export function dateToString(date) {
    date = _isDate(date) ? date : new Date(date);

    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

/* Проверка на touch device.
 *
 * @return {boolean} Результат проверки.
 */
export function isTouch() {
    return typeof window !== 'undefined' && 'ontouchstart' in window;
}

/**
 * Получить только числа из строки.
 *
 * @param  {string} str Исходная строка.
 * @return {string} Str.
 */
export function rawPhone(str) {
    if (!_isString(str)) return null;
    return str.match(/\d+/g).join('');
}

/**
 * Скролит контейнер на определенное значение с анимацией.
 *
 * @param {*} element DOM Элемент.
 * @param {number} to Конечное значение скролла.
 * @param {number} duration Время.
 */
export function scrollTo(element, to, duration = 1000) {
    const start = element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = duration === 0 ? 0 : 20;

    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad =
        duration === 0
            ? () => to
            : (t, b, c, d) => {
                  t /= d / 2;
                  if (t < 1) return (c / 2) * t * t + b;
                  t -= 1;
                  return (-c / 2) * (t * (t - 2) - 1) + b;
              };

    let interval;
    const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime >= duration) clearInterval(interval);
    };
    interval = setInterval(animateScroll, increment);
}

/**
 * Random int
 *
 * @param min
 * @param max
 * @returns {Number}
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
}

/**
 * Random int Inclusive
 *
 * @param min
 * @param max
 * @returns {Number}
 */
export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

/**
 * Make "10000" like "10 000".
 *
 * @param number
 * @param decimals
 * @param dec_point
 * @param thousands_sep
 * @returns {string | void}
 */
export function preparePrice(number, decimals, dec_point, thousands_sep) {
    let minus = '';

    // input sanitation & defaults
    decimals = Math.abs(decimals);
    if (_isNaN(decimals)) decimals = 2;
    if (dec_point === undefined) dec_point = ',';
    if (thousands_sep === undefined) thousands_sep = ' ';

    if (number < 0) {
        minus = '-';
        number *= -1;
    }
    number = (Number(number) || 0).toFixed(decimals);
    // eslint-disable-next-line
    const i = `${parseInt(number)}`;

    let j = i.length;
    if (j > 3) j %= 3;
    else j = 0;

    const km = j ? i.substr(0, j) + thousands_sep : '';
    const kw = i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands_sep}`);
    const kd =
        decimals && Math.abs(number - i) > 0
            ? dec_point +
              Math.abs(number - i)
                  .toFixed(decimals)
                  .replace(/-/, 0)
                  .slice(2)
            : '';

    return minus + km + kw + kd;
}

/**
 * Вычисляет контрольное число.
 *
 * @param  {string}   str          Исходная строка.
 * @param  {number[]} coefficients Коэффициенты контрольной суммы.
 * @return {number}                Контрольное число.
 */
export function countCheckdigit(str, coefficients) {
    const checksum = coefficients.reduce((sum, coefficient, index) => sum + coefficient * str[index], 0);

    return (checksum % 11) % 10;
}

export default { countCheckdigit, preparePrice, scrollTo, rawPhone, isTouch, dateToString };
