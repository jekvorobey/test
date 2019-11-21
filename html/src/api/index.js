import { $http } from '../services/ServiceLocator';

export function search(data) {
    return $http.get('/v1/search', data);
}

export function getProducts(data) {
    return $http.get('/v1/products', data);
}

export function getCatalogItems({ code, page = 1 }) {
    return $http.get('/v1/catalog/items', { params: { category: code, page } });
}

export function getCategories(data) {
    return $http.get('/v1/categories', data);
}

export function getBanners(data) {
    return $http.get('/v1/banners', data);
}

export function getBrands(data) {
    return $http.get('/v1/brands', data);
}

export function getInstagram(data) {
    return $http.get('/v1/instagram', data);
}

export function getProduct(data) {
    return $http.get('/v1/product', data);
}

// cart

export function getCartData(data) {
    return $http.get('/v1/cart/data', data);
}

export function deleteCartItem(data) {
    return $http.delete('/v1/cart/item', data);
}

export function addCartItem(data) {
    return $http.post('/v1/cart/item', data);
}

// checkout

export function getCheckoutData(data) {
    return $http.get('/v1/checkout/data', data);
}

export function getCheckoutReceiveMethods(data) {
    return $http.get('/v1/checkout/receive-methods', data);
}

export function getCheckoutDeliveryTypes(data) {
    return $http.get('/v1/checkout/delivery-types', data);
}

export function getCheckoutConfirmationTypes(data) {
    return $http.get('/v1/checkout/confirmation-types', data);
}

export function getCheckoutPaymentMethods(data) {
    return $http.get('/v1/checkout/payment-methods', data);
}

export function getCheckoutAddresses(data) {
    return $http.get('/v1/checkout/addresses', data);
}

export function getCheckoutPickupPoints(data) {
    return $http.get('/v1/checkout/pickup-points', data);
}

export function getCheckoutPackages(data) {
    return $http.get('/v1/checkout/packages', data);
}

export function addBonus(data) {
    return $http.post('/v1/checkout/bonus', data);
}

export function deleteSertificate(data) {
    return $http.delete('/v1/checkout/sertificate', data);
}

export function addSertificate(data) {
    return $http.post('/v1/checkout/sertificate', data);
}

export function deleteBonus(data) {
    return $http.delete('/v1/checkout/bonus', data);
}

export function addPromocode(data) {
    return $http.post('/v1/checkout/promocode', data);
}

export function deletePromocode(data) {
    return $http.delete('/v1/checkout/promocode', data);
}

export function changeReceiveMethod(data) {
    return $http.post('/v1/checkout/receive-method', data);
}
