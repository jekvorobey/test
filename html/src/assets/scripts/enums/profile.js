export const genderType = Object.freeze({
    FEMALE: 1,
    MALE: 2,
});

export const referralOrderSortFields = Object.freeze({
    NAME: 'name',
    QTY: 'qty',
    SOURCE: 'source',
    ORDER_DATE: 'order_date',
    CUSTOMER_ID: 'customer_id',
    PRICE_PRODUCT: 'price_product',
    PRICE_COMMISSION: 'price_commission'
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

export const userStatus = Object.freeze({
    CREATED: 1, // Создан
    NEW: 2, // Новый (заполнен телефон и портфолио)
    CONSIDERATION: 3, // На проверке
    REJECTED: 4, // Отклонен
    ACTIVE: 5, // Активный
    PROBLEM: 6, // Проблемный
    BLOCK: 7, // Заблокирован
    POTENTIAL_RP: 8, // Потенциальный реф. партнер
    TEMPORARILY_SUSPENDED: 9, // Временно приостановлен
})