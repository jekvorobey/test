export const cancelRoute = {
    path: '/',
    replace: true,
};

export const yaMapSettings = {
    apiKey: '46c69919-a571-416e-8198-189ed26c6a79',
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1',
};

export const phoneMaskOptions = Object.freeze({
    prefix: '+7',
    delimiters: [' ', ' ', '-', '-'],
    blocks: [2, 3, 3, 2, 2],
    numericOnly: true,
});
