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
 * Получить только числа из строки и +.
 *
 * @param  {string} str Исходная строка.
 * @return {string} Str.
 */
export function rawPhone(str) {
    if (!_isString(str)) return null;
    return str.replace(/[^\d+]/g, '');
}

/**
 * Склонение слов в заисимости от числа
 *
 * @param  {string} number Исходное число по которому склоняют
 * @param  {Array} words Варианты склонения пример ['товар','товара','товаров']
 * @return {string} Str.
 */

export function pluralize(number, words) {
    const word = (n) => {
        n = Math.abs(n) % 100;
        switch (n) {
            // 11-14 товаров, но 21 товар, 22-24 товара
            case 14:
            case 13:
            case 12:
            case 11:
                return words[2];
            default: {
                const numberTwo = n % 10;
                switch (numberTwo) {
                    case 2:
                    case 3:
                    case 4:
                        return words[1];
                    case 1:
                        return words[0];
                    default:
                        return words[2];
                }
            }
        }
    };

    return word(number);
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

function round(n, precision) {
    const prec = 10 ** precision;
    return Math.round(n * prec) / prec;
}

export function shortNumberFormat(n) {
    const abbrev = [' тыс', ' млн', ' млрд'];
    let base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
    const suffix = abbrev[Math.min(2, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? round(n / 1000 ** base, 2) + suffix : `${n}`;
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

/**
 * Маскирует номер карты, кроме последних 4х цифр
 *
 * @param  {string}  number Номер карты.
 */
export function maskCardNumber(number = '') {
    return number.replace(/\d{4}(?=\d{4})/g, '**** ');
}

/**
 * Add
 *
 * @param date
 * @param days
 * @returns {Number}
 */
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function downloadFile(path) {
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('class', 'download-input');
    downloadLink.setAttribute('href', path);
    downloadLink.setAttribute('download', 'download');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

export function saveToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.className = 'clipboard-input';
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();

    let successful = false;

    try {
        successful = document.execCommand('copy');
    } catch (err) {
        successful = false;
    }

    document.body.removeChild(textArea);
    return successful;
}

export function formatPhoneNumber(str, code = 7) {
    const countryCode = Number(code);
    // Filter only numbers from the input
    const cleaned = `${str}`.replace(/\D/g, '');
    const regex = new RegExp(`^(${countryCode}|)?(\\d{3})(\\d{3})(\\d{2})(\\d{2})$`);
    // Check if the input is of correct
    const match = cleaned.match(regex);

    if (match) {
        // Remove the matched extension code
        // Change this to format for any country code.
        const intlCode = match[1] ? `+${countryCode} ` : '';
        return [intlCode, ' ', match[2], ' ', match[3], '-', match[4], '-', match[5]].join('');
    }

    return null;
}

/**
 * returns the absolute position of an element regardless of position/float issues
 * @param {HTMLElement} el - element to return position for
 * @returns {object} { x: num, y: num }
 */
export function getPosition(el) {
    let x = 0;
    let y = 0;

    while (el != null && (el.tagName || '').toLowerCase() !== 'html') {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;
    }

    return { x: parseInt(x, 10), y: parseInt(y, 10) };
}

/**
 * Parse date from string
 */
export function getDate(string) {
    // Safari не умеет парсить даты вида yyyy-mm-dd, так что заменяем "-" на "/"
    return new Date(string.replace(/-/g, '/'));
}

/**
 * Determine whether the color is light or dark
 * @param {*} color
 */
export function isLightColor(color) {
    // Variables for red, green, blue values
    let r;
    let g;
    let b;
    let hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +`0x${color.slice(1).replace(color.length < 5 && /./g, '$&$&')}`;

        r = color >> 16;
        g = (color >> 8) & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    // eslint-disable-next-line
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    return hsp > 127.5;
}

/**
 * Calculate grid step size
 * @param {*} range
 * @param {*} targetSteps
 */
export function calculateStepSize(range, targetSteps) {
    // calculate an initial guess at step size
    const tempStep = range / targetSteps;

    // get the magnitude of the step size
    const mag = Math.floor(Math.log10(tempStep));
    const magPow = 10 ** mag;

    // calculate most significant digit of the new step size
    let magMsd = Math.round(tempStep / magPow + 0.5);

    // promote the MSD to either 1, 2, or 5
    if (magMsd > 5) magMsd = 10;
    else if (magMsd > 2) magMsd = 5;
    else if (magMsd > 1) magMsd = 2;

    return magMsd * magPow;
}

export default {
    calculateStepSize,
    countCheckdigit,
    preparePrice,
    scrollTo,
    rawPhone,
    isTouch,
    dateToString,
    getRandomInt,
    getRandomIntInclusive,
    getPosition,
    getDate,
    pluralize,
};
