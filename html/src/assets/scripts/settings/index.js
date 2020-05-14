import { localeDateOptions } from '@enums';

export const digit2DateSettings = Object.freeze({
    day: localeDateOptions.day.DIGIT2,
    month: localeDateOptions.month.DIGIT2,
    year: localeDateOptions.year.DIGIT2,
});

export const numericYearDateSettings = Object.freeze({
    day: localeDateOptions.day.DIGIT2,
    month: localeDateOptions.month.DIGIT2,
    year: localeDateOptions.year.NUMERIC,
});

export const monthLongDateSettings = Object.freeze({
    day: localeDateOptions.day.NUMERIC,
    month: localeDateOptions.month.LONG,
    year: localeDateOptions.year.NUMERIC,
});

export const cancelRoute = Object.freeze({
    path: '/',
    replace: true,
});

export const yaMapSettings = Object.freeze({
    apiKey: '46c69919-a571-416e-8198-189ed26c6a79',
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1',
});

export const phoneMaskOptions = Object.freeze({
    prefix: '+7',
    delimiters: [' ', ' ', '-', '-'],
    blocks: [2, 3, 3, 2, 2],
    numericOnly: true,
});
