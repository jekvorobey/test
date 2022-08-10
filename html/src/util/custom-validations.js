export const fioClean = str => str.replace(/[^ A-Za-zЁА-яё]/g, '');

export const noSymbols = str => str.replace(/[^A-Za-zЁА-яё0-9\s]/ig, '');

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};