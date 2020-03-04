export const orderStatus = Object.freeze({
    /* оформлен */
    CREATED: 1,
    /* ожидает подтверждения */
    AWAITING_CHECK: 2,
    /* в обработке */
    IN_PROCESSING: 3,
    /* проверка */
    CHECKING: 4,
    /* передан на доставку */
    TRANSFERRED_TO_DELIVERY: 5,
    /* в процессе доставки */
    DELIVERING: 6,
    /* находится в Пункте Выдачи */
    READY_FOR_RECIPIENT: 7,
    /* доставлен */
    DONE: 8,
    /* возвращен */
    RETURNED: 9,
    /* предзаказ: ожидаем поступления товара */
    PRE_ORDER: 10,
});

export const orderPaymentStatus = Object.freeze({
    /* Оплачен */
    NOT_PAID: 1,
    /* Не оплачен */
    PAID: 2,
    /* Просрочен */
    TIMEOUT: 3,
});

export const sortFields = Object.freeze({
    NUMBER: 'number',
    CREATED_AT: 'created_at',
});
