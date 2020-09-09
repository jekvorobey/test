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

export const dayMonthLongDateSettings = Object.freeze({
    day: localeDateOptions.day.NUMERIC,
    month: localeDateOptions.month.LONG,
});

export const hourMinuteTimeSettings = Object.freeze({
    hour: localeDateOptions.hour.DIGIT2,
    minute: localeDateOptions.month.DIGIT2,
});

export const cancelRoute = Object.freeze({
    path: '/',
    replace: true,
});

export const yaMapSettings = Object.freeze({
    apiKey: 'fff2295f-9b6e-45b1-be7e-5bb163c84513',
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
