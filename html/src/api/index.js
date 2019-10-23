import { $http } from '../services/ServiceLocator';

export function search(string) {
    return $http.get('/search', string);
}

export function getProducts(string) {
    return $http.get('/products', string);
}

export function getCatalogItems(string) {
    return $http.get('/catalog/items', string);
}

export function getCategories(string) {
    return $http.get('/categories', string);
}

export function getBanners(string) {
    return $http.get('/banners', string);
}

export function getBrands(string) {
    return $http.get('/brands', string);
}

export function getInstagram(string) {
    return $http.get('/instagram', string);
}

export function getProduct(string) {
    return $http.get('/product', string);
}
