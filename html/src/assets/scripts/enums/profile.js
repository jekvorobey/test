export const genderType = Object.freeze({
    FEMALE: 1,
    MALE: 2,
});

export const referralOrderSortFields = Object.freeze({
    NAME: 'name',
});

export const billingOperationType = Object.freeze({
    EARNING: 1, //начисление
    PAYMENT: 2, // оплата заказа
    REFUND: 3, // возврат
    WITHDRAW: 4, // вывод средств
    ADJUSTMENT: 5, // корректировка
});

export const cardIdentificationStatus = Object.freeze({
    SUCCESS: 'success', // удачно
    FAIL: 'fail', // неудачно
    ERROR: 'error', // ошибка
});
