import { validationMixin as mixin } from 'vuelidate';
import {
    helpers,
    required as r,
    minLength as minl,
    maxLength as maxl,
    minValue as minv,
    maxValue as maxv,
    sameAs as sa,
} from 'vuelidate/lib/validators';

import Regex from './regex';
import Helpers from './helpers';

const innValidation = value => {
    const inn = value;

    let isCorrect = false;
    let checkdigit;
    let firstCheckdigit;
    let secondCheckdigit;

    /* ИНН может быть 10 или 12-значным и в каждом случае имеет свою логику проверки */
    switch (inn.length) {
        case 10:
            checkdigit = Helpers.countCheckdigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (checkdigit === parseInt(inn[9], 10)) isCorrect = true;
            break;
        case 12:
            firstCheckdigit = Helpers.countCheckdigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            secondCheckdigit = Helpers.countCheckdigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (firstCheckdigit === parseInt(inn[10], 10) && secondCheckdigit === parseInt(inn[11], 10))
                isCorrect = true;
            break;
        default:
    }

    return isCorrect;
};

export const password = helpers.regex('password', Regex.password);
export const tel = helpers.regex('tel', Regex.tel);
export const email = helpers.regex('email', Regex.email);
export const inn = innValidation;
export const required = r;
export const sameAs = sa;
export const minLength = minl;
export const maxLength = maxl;
export const minValue = minv;
export const maxValue = maxv;
export const validationMixin = mixin;
