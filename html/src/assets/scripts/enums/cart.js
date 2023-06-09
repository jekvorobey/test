export const cartErrors = Object.freeze({
    PRODUCT_INACTIVE: 11, // некоторые товары стали архивными или остаток равен 0
    BUNDLE_INACTIVE: 12, // некоторые банды стали неактивными
    BUNDLE_PRODUCT_STOCKS: 13, // суммарное количество товаров и товаров в бандлах превышает количество остатков по товару
    PRODUCT_FOR_PROFESSIONAL: 14, // некоторые товары доступны для покупки только после модерации профиля пользователя
    BUNDLE_MASTERCLASS_STOCKS: 21, // суммарное количество одиночных билетов и билетов в бандлах превышает количество остатков билетов (сейчас не используется, т.к. пока не реализованы бандлы на мастерклассы)
    MASTERCLASS_STOCKS: 22, // некоторые билеты стали неактивными
});

export const cartWarnings = Object.freeze({
    PRODUCT_COUNT_CHANGE: 31, // предупреждение об изменении количества товара
    BUNDLE_DELETED: 32, // предупреждение об удалении бандла из корзины (когда бандл находящийся в корзине удаляется из системы)
    PRODUCT_ADD_COUNT_CHANGE: 33, // предупреждение об изменении количества товара при добавлении
    MASTERCLASS_COUNT_CHANGE: 41, // предупреждение об изменении количества мастерклассов
    MASTERCLASS_ADD_COUNT_CHANGE: 42, // предупреждение об изменении количества мастерклассов при добавлении
});

export default { cartErrors, cartWarnings };
