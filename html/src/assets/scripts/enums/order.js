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

    // Частично возвращен - реально не существует в системе, вместо него флаг в заказе is_partially_cancelled
    PARTIALLY_CANCELED: 110,
});

export const orderPaymentStatus = Object.freeze({
    /* Не оплачен */
    NOT_PAID: 1,

    /* Оплачен */
    PAID: 2,

    /* Просрочен */
    TIMEOUT: 3,

    /* средства захолдированы */
    HOLD: 4,

    /* ошибка */
    ERROR: 5,
});

export const sortFields = Object.freeze({
    NUMBER: 'number',
    CREATED_AT: 'created_at',
});

export const deliveryStatus = Object.freeze({
    /** Предзаказ: ожидаем поступления товара*/
    STATUS_WAITING_TO_ARRIVE: 0,
    
    // внутренние статусы [1, 20]
    /** создан */
    STATUS_CREATED: 1,
    /** Ожидает проверки АОЗ*/
    STATUS_WAITING_AOZ_INSPECTION: 2,
    /** Проверка АОЗ*/
    STATUS_AOZ_INSPECTION: 3,
    /** Ожидает подтверждения Мерчантом*/
    STATUS_WAITING_MERCHANT_CONFIRM: 4,
    /** На комплектации*/
    STATUS_PACKAGE: 5,
    /** Готова к отгрузке*/
    STATUS_READY_TO_SHIP: 6,
    /** Передана Логистическому Оператору*/
    STATUS_AT_LOGISTIC_OPERATOR: 7,

    // статусы доставки в случае "нормального" процесса доставки [21, 40]
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

    // статусы по возвратам [41, 60]
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

    // проблемные и отмененные статусы [61, 80]
    /** утеряна */
    STATUS_LOST: 61,
    /** возникла проблема */
    STATUS_PROBLEM: 62,
    /** отменена */
    STATUS_CANCEL: 63,

    // нестандартные статусы [91, 100]
    /** неизвестный статус */
    STATUS_UNKNOWN: 91,
    /** n/a */
    STATUS_NA: 92,
});

export const filterField = Object.freeze({
    ALL_TIME: 'all_time',
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
});
