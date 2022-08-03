export const fioClean = str => str.replace(/[^ A-Za-zЁА-яё]/g, '');

export const noSymbols = str => str.replace(/[^A-Za-zЁА-яё0-9\s]/ig, '');