export const discountType = Object.freeze({
    PRODUCT: 1, // Скидка на товар
    DELIVERY: 2, // Скидка на доставку,
    CART: 3, // Скидка на корзину,
    CUSTOM: 4, // Скидка для Вас,
    PROMOCODE: 5, // Скидка по промокоду,
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
