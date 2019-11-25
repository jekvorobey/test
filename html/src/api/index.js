import qs from 'qs';
import { $http } from '../services/ServiceLocator';

// auth

export function login({ email, password }) {
    return $http.post('/v1/auth/login', { email, password });
}

// search

export function search(data) {
    return $http.get('/v1/search', data);
}

// catalog

export function getProducts(data) {
    return $http.get('/v1/products', data);
}

export function getCatalogItems({ filter, orderField = 'price', orderDirection = 'desc', page = 1 }) {
    return $http.get('/v1/catalog/items', {
        params: { filter, page, orderField, orderDirection },
        paramsSerializer(params) {
            return qs.stringify(params, { encode: false });
        },
    });
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

export function getCartData() {
    return $http.get('/v1/cart/data');
}

export function deleteCartItem({ offerId }) {
    return $http.delete('/v1/cart/item', { data: { offerId } });
}

export function addCartItem(data) {
    return $http.post('/v1/cart/item', data).then(resp => resp.data);
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
