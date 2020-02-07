import qs from 'qs';
import axios from 'axios';
import { $http, $logger } from '../services/ServiceLocator';
import { REQUEST_CANCEL_MESSAGE } from '../assets/scripts/constants';

let catalogItemsCancelSource = null;

// auth

export function checkSession() {
    return $http.get('/v1/auth/check-session');
}

export function loginByPassword(payload) {
    return $http.post('/v1/auth/loginByPassword', payload);
}

export function logout() {
    return $http.post('/v1/auth/logout');
}

export function sendSMS(phone) {
    return $http.post('/v1/auth/sendSMS', { phone });
}

export function checkCode(code) {
    return $http.post('/v1/auth/checkCode', { code });
}

export function registerByPassword(password) {
    return $http.post('/v1/auth/registerByPassword', { password });
}

export function getSocialLink(url, driver) {
    return $http.post('/v1/auth/getSocialLink', { final_login_url: url, driver });
}

// search

export function search(data) {
    return $http.get('/v1/search', data);
}

// catalog

export function getProductGroups({ type, page = 1 }) {
    return $http.get('/v1/catalog/product-groups', {
        params: { type_code: type, page },
        paramsSerializer(params) {
            return qs.stringify(params, { encode: false });
        },
    });
}

export function getProductGroup(code) {
    return $http.get('/v1/catalog/product-group', {
        params: { code },
        paramsSerializer(params) {
            return qs.stringify(params, { encode: false });
        },
    });
}

export function getProducts({ filter, orderField = 'price', orderDirection = 'desc', page = 1 }) {
    return $http.get('/v1/catalog/products', {
        params: { filter, page, orderField, orderDirection },
        paramsSerializer(params) {
            return qs.stringify(params, { encode: false });
        },
    });
}

export function getCatalogItems({ filter, orderField = 'price', orderDirection = 'desc', page = 1 }) {
    if (catalogItemsCancelSource) {
        catalogItemsCancelSource.cancel(REQUEST_CANCEL_MESSAGE);
        catalogItemsCancelSource = axios.CancelToken.source();
    } else catalogItemsCancelSource = axios.CancelToken.source();

    return $http.get('/v1/catalog/items', {
        cancelToken: catalogItemsCancelSource.token,
        params: { filter, page, orderField, orderDirection },
        paramsSerializer(params) {
            return qs.stringify(params, { encode: false });
        },
    });
}

export function getFilters(data) {
    return $http.get('/v1/catalog/filter', {
        params: { ...data, needBrands: 1 },
        paramsSerializer(params) {
            return qs.stringify(params, { encode: false });
        },
    });
}

export function getCategories(data) {
    return $http.get('/v1/categories');
}

export function getBanners(data) {
    return $http.get('/v1/banners', data);
}

export function getBrandCatalog(data) {
    return $http.get('/v1/brand-catalog', data);
}

export function getSetCatalog(data) {
    return $http.get('/v1/set-catalog', data);
}

export function getBrands(data) {
    return $http.get('/v1/brands', data);
}

export function getMasterclasses(data) {
    return $http.get('/v1/masterclasses', data);
}

export function getInstagram(data) {
    return $http.get('/v1/instagram', data);
}

export function getProduct({ code }) {
    return $http.get('/v1/catalog/product-detail', { params: { code } });
}

// brand

export function getBrand(data) {
    return $http.get('/v1/brand', data);
}

// cart

export function getCartData() {
    return $http.get('/v1/cart/data');
}

export function deleteCartItem({ offerId }) {
    return $http.delete('/v1/cart/item', { data: { offerId } });
}

export function addCartItem(data) {
    return $http.post('/v1/cart/item', data);
}

// checkout

export function getCheckoutData(data) {
    return $http.get('/v1/checkout/data', data);
}

export function commitCheckoutData(data) {
    return $http.post('/v1/checkout/commit', data);
}

export function changeCity(data) {
    return $http.post('/v1/checkout/city', data);
}

export function setReceiveMethod(data) {
    return $http.post('/v1/checkout/receive-method', data);
}

export function setAddress(data) {
    return $http.post('/v1/checkout/address', data);
}

export function setPickupPoint(data) {
    return $http.post('/v1/checkout/pickup-point', data);
}

export function addBonus(data) {
    return $http.post('/v1/checkout/bonus', data);
}

export function deleteCertificate(data) {
    return $http.post('/v1/checkout/remove-certificate', data);
}

export function addCertificate(data) {
    return $http.post('/v1/checkout/add-certificate', data);
}

export function deleteBonus(data) {
    return $http.post('/v1/checkout/bonus', data);
}

export function addPromocode(data) {
    return $http.post('/v1/checkout/promocode', data);
}

export function deletePromocode(data) {
    return $http.post('/v1/checkout/promocode', data);
}

export function changeReceiveMethod(data) {
    return $http.post('/v1/checkout/receive-method', data);
}
