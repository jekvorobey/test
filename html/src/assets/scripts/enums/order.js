export const orderStatus = Object.freeze({
    /* предзаказ: ожидаем поступления товара */
    PRE_ORDER: 0,

    /* оформлен */
    CREATED: 1,

    /* ожидает проверки АОЗ */
    AWAITING_CHECK: 2,

    /* проверка АОЗ */
    CHECKING: 3,

    /* Ожидает подтверждения мерчантом */
    AWAITING_CONFIRMATION: 4,

    /* в обработке */
    IN_PROCESSING: 5,

    /* передан на доставку */
    TRANSFERRED_TO_DELIVERY: 6,

    /* в процессе доставки */
    DELIVERING: 7,

    /* находится в Пункте Выдачи */
    READY_FOR_RECIPIENT: 8,

    /* доставлен */
    DONE: 9,

    /* возвращен */
    RETURNED: 10,

    // реально НЕ СУЩЕСТВУЕТ в системе, вместо него флаг в ордере
    CANCELED: 100,
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

export const deliveryStatus = Object.freeze({
    //внутренние статусы [1, 20]
    /** создан */
    STATUS_CREATED: 1,

    //статусы доставки в случае "нормального" процесса доставки [21, 40]
    /** принят на склад в пункте отправления */
    STATUS_ON_POINT_IN: 21,
    /** в пути */
    STATUS_ON_WAY: 22,
    /** прибыл на склад в пункте назначения */
    STATUS_ON_POINT_OUT: 23,
    /** передана на доставку в пункте назначения */
    STATUS_DELIVERING: 24,
    /** готов к выдаче в пункте назначения */
    STATUS_READY_FOR_RECIPIENT: 25,
    /** доставлен получателю */
    STATUS_DONE: 26,

    //статусы по возвратам [41, 60]
    /** возвращен с доставки */
    STATUS_RETURNED_FROM_DELIVERY: 41,
    /** частичный возврат */
    STATUS_PARTIAL_RETURN: 42,
    /** подготовлен возврат */
    STATUS_RETURN_READY: 43,
    /** возвращается отправителю */
    STATUS_RETURNING: 44,
    /** возвращен отправителю */
    STATUS_RETURNED: 45,

    //проблемные и отмененные статусы [61, 80]
    /** утеряна */
    STATUS_LOST: 61,
    /** возникла проблема */
    STATUS_PROBLEM: 62,
    /** отменена */
    STATUS_CANCEL: 63,

    //нестандартные статусы [91, 100]
    /** неизвестный статус */
    STATUS_UNKNOWN: 91,
    /** n/a */
    STATUS_NA: 92,
});
