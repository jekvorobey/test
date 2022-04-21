import { validationMixin } from 'vuelidate';
import {
    helpers,
    required as r,
    minLength as minl,
    maxLength as maxl,
    minValue as minv,
    maxValue as maxv,
    sameAs as sa,
} from 'vuelidate/lib/validators';

import {
    password as passwordRegx,
    tel as telRegx,
    email as emailRegx,
    referrerCode as referrerCodeRegx,
    nameRu as nameRuRegx,
} from '@regex/validation';
import { countCheckdigit } from '@util';

function innValidation(value) {
    const inn = value || '';

    let isCorrect = false;
    let checkdigit;
    let firstCheckdigit;
    let secondCheckdigit;

    /* ИНН может быть 10 или 12-значным и в каждом случае имеет свою логику проверки */
    switch (inn.length) {
        case 10:
            checkdigit = countCheckdigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (checkdigit === parseInt(inn[9], 10)) isCorrect = true;
            break;
        case 12:
            firstCheckdigit = countCheckdigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            secondCheckdigit = countCheckdigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (firstCheckdigit === parseInt(inn[10], 10) && secondCheckdigit === parseInt(inn[11], 10))
                isCorrect = true;
            break;
        default:
    }

    return isCorrect;
}

// Рассчетный счет
function rsValidation(rs, bik) {
    if (!bik) bik = '';
    if (!rs) rs = '';
    const bikRs = bik.toString().slice(-3) + rs;
    let checksum = 0;
    const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
    for (let i in coefficients) checksum += coefficients[i] * (bikRs[i] % 10);
    const v = checksum % 10 === 0;
    return v;
}

function rsWithParams(prop) {
    return helpers.withParams({ type: 'rs', bik: prop }, function (value, parentVm) {
        return rsValidation(value, helpers.ref(prop, this, parentVm));
    });
}

// Бик
function bikValidation(bik) {
    if (!bik) bik = '';
    if (bik instanceof Number) bik = bik.toString();
    return bik.length === 9 && !/\D/.test(bik);
}

// Создание пароля
export const hasUpperCase = (password) => /[A-Z]/.test(password);
export const hasLowerCase = (password) => /[a-z]/.test(password);
export const hasNumbers = (password) => /\d/.test(password);

export const nameRu = helpers.regex('nameRu', nameRuRegx);
export const referrerCode = helpers.regex('referrerCode', referrerCodeRegx);
export const password = helpers.regex('password', passwordRegx);
export const tel = helpers.regex('tel', telRegx);
export const email = helpers.regex('email', emailRegx);
export const inn = innValidation;
export const required = r;
export const sameAs = sa;
export const minLength = minl;
export const maxLength = maxl;
export const minValue = minv;
export const maxValue = maxv;
export const bik = bikValidation;
export const rs = rsWithParams;

export const fio = (value) => {
    let chunks = value
        .trim()
        .split(' ')
        .filter((chunk) => chunk !== ' ' && chunk !== '');

    return chunks.length === 3;
};

export default validationMixin;
