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

export function getCartData(data) {
    return $http.get('/cart-data', data);
}

export function deleteCartItem(data) {
    return $http.delete('/delete-cart-item', data);
}

export function addCartItem(data) {
    return $http.post('/add-cart-item', data);
}
