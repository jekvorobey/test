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

export const preferenceType = Object.freeze({
    PERSONAL: 1, // Личные предпочтения
    PROFESSIONAL: 2, // Профессиональные
});

export const preferenceEntityTypes = Object.freeze({
    BRANDS: 'brands',
    CATEGORIES: 'categories',
});

export const returnFormSteps = Object.freeze({
    SELECT: 1,
    CHECK: 2,
    DOCUMENTS: 3,
    FORM: 4,
    RESULT: 5,
});

export const referralSource = Object.freeze({
    PROMOCODE: 1, // промокод
    LINK: 2, // реферальная ссылка
});

export const bonusStatus = Object.freeze({
    DELAYED: 1, //- на удержании
    ACTIVE: 2, //- активный
    FINISHED: 3, // - завершен
    TAKEN: 4, // - списание
});

export const returnMethods = Object.freeze({
    COURIER: 1,
    OUTPOST: 2,
    POST: 3,
})