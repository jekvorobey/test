export const discountType = Object.freeze({
    PRODUCT: 1, // Скидка маркетплейса,
    DELIVERY: 2, // Скидка на доставку,
    CART: 3, // Скидка на корзину,
    CUSTOM: 4, // Персональная скидка,
    PROMOCODE: 5, // Скидка по промокоду,
});

export const promocodeDiscountType = Object.freeze({
    OFFER: 1, // Скидка на Оффер
    BUNDLE: 2, // Скидка на Бандл
    BRAND: 3, // Скидка на Бренд
    CATEGORY: 4, // Скидка на Категорию
    DELIVERY: 5, // Скидка на Доставку
    CART: 6, // Скидка на Сумму корзины
});

export const promocodeType = Object.freeze({
    PRODUCT: 1, // Промокод на скидку (товар, корзина)
    DELIVERY: 2, // Промокод на бесплатную доставку,
    GIFT: 3, // Промокод на подарок,
    BONUS: 4, // Промокод на бонусы,
});

export const receiveMethods = Object.freeze({
    DELIVERY: 1,
    PICKUP: 2,
    EXPRESS: 3,
});

export const deliveryMethods = Object.freeze({
    OUTPOST_PICKUP: 1,
    POSTOMAT_PICKUP: 2,
    DELIVERY: 3,
    EXPRESS: 4,
});

export const deliveryTypes = Object.freeze({
    SPLIT: 1,
    CONSOLIDATION: 2,
});

export const pointType = Object.freeze({
    /**
     * Пункт выдачи заказа
     */
    TYPE_PICKUP_POINT: 1,

    /**
     * Постомат
     */
    TYPE_POSTOMAT: 2,

    /**
     * Отделение почты России
     */
    TYPE_RU_POST_OFFICE: 3,

    /**
     * Терминал
     */
    SERVICE_TERMINAL: 4,
});

export const paymentTypes = Object.freeze({
    PREPAYMENT_ONLINE: 1,
    POST_PAYMENT: 2,
    CREDIT: 3,
    B2B_SBERBANK: 4,
    BANK_TRANSFER_FOR_LEGAL: 5,
});
