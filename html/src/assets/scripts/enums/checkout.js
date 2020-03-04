export const discountType = Object.freeze({
    PRODUCT: 1, // Скидка на товар
    DELIVERY: 2, // Скидка на доставку,
    CART: 3, // Скидка на корзину,
    CUSTOM: 4, // Скидка для Вас,
    PROMOCODE: 5, // Скидка по промокоду,
});

export const receiveMethods = Object.freeze({
    DELIVERY: 1,
    EXPRESS: 2,
    PICKUP: 3,
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
