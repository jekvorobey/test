import { $http } from '../services/ServiceLocator';

export function search(data) {
    return $http.get('/search', data);
}

export function getProducts(data) {
    return $http.get('/products', data);
}

export function getCatalogItems(data) {
    return $http.get('/catalog/items', data);
}

export function getCategories(data) {
    return $http.get('/categories', data);
}

export function getBanners(data) {
    return $http.get('/banners', data);
}

export function getBrands(data) {
    return $http.get('/brands', data);
}

export function getInstagram(data) {
    return $http.get('/instagram', data);
}

export function getProduct(data) {
    return $http.get('/product', data);
}

// cart

export function getCartData(data) {
    return $http.get('/cart/data', data);
}

export function deleteCartItem(data) {
    return $http.delete('/cart/delete-item', data);
}

export function addCartItem(data) {
    return $http.post('/cart/add-item', data);
}

// checkout

export function getCheckoutData(data) {
    return $http.get('/checkout/data', data);
}

export function getCheckoutReceiveMethods(data) {
    return $http.get('/checkout/receive-methods', data);
}

export function getCheckoutDeliveryTypes(data) {
    return $http.get('/checkout/delivery-types', data);
}

export function getCheckoutConfirmationTypes(data) {
    return $http.get('/checkout/confirmation-types', data);
}

export function getCheckoutPaymentMethods(data) {
    return $http.get('/checkout/payment-methods', data);
}

export function getCheckoutAddresses(data) {
    return $http.get('/checkout/addresses', data);
}

export function getCheckoutPickupPoints(data) {
    return $http.get('/checkout/pickup-points', data);
}

export function getCheckoutPackages(data) {
    return $http.get('/checkout/packages', data);
}
