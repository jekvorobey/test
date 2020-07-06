import qs from 'qs';
import axios from 'axios';
import { Cache } from 'axios-extensions';

import { $http, $logger } from '@services';
import { REQUEST_CANCEL_MESSAGE } from '@constants';
import { interval } from '@enums';
import { verificationCodeType } from '@enums/auth';

let catalogItemsCancelSource = null;
const sessionCheckCache = new Cache({
    maxAge: interval.FIVE_MINUTES,
});

// main

export function getMenu() {
    return $http.get('/v1/content/menus');
}

// auth

export function checkSession(force = false) {
    return $http.get('/v1/auth/is-login', {
        cache: sessionCheckCache,
        forceUpdate: force,
    });
}

export function getUser() {
    return $http.get('/v1/auth/user');
}

export function getUserInfo() {
    return $http.get('/v1/auth/user-name-avatar');
}

export function loginByPassword(payload) {
    return $http.post('/v1/auth/loginByPassword', payload);
}

export function loginBySocial(driver, query) {
    return $http.get(`/v1/auth/socialHandler/${driver}`, {
        params: query,
    });
}

export function logout() {
    return $http.post('/v1/auth/logout');
}

export function sendCode(destination, type) {
    let method = '';
    const data = {};

    switch (type) {
        case verificationCodeType.REGISTRATION:
            method = '/v1/auth/sendSMS';
            data.phone = destination;
            break;
        case verificationCodeType.RESET_PASSWORD:
            method = '/v1/auth/reset/sendSMS';
            data.phone = destination;
            break;
        case verificationCodeType.PROFILE_PHONE:
            method = '/v1/lk/profile/change-phone-code';
            data.phone = destination;
            break;
        case verificationCodeType.PROFILE_EMAIL:
            method = '/v1/lk/profile/change-email-code';
            data.email = destination;
            break;

        default:
            throw new Error('Wrong verification code type');
    }

    return $http.post(method, data);
}

export function checkCode(code, type) {
    let method = '';
    switch (type) {
        case verificationCodeType.REGISTRATION:
            method = '/v1/auth/checkCode';
            break;
        case verificationCodeType.RESET_PASSWORD:
            method = '/v1/auth/reset/checkCode';
            break;
        default:
            throw new Error('Wrong verification code type');
    }

    return $http.post(method, {
        code,
    });
}

export function resetPassword(phone, password) {
    return $http.post('/v1/auth/reset/resetPassword', {
        phone,
        password,
    });
}

export function registerByPassword(password) {
    return $http.post('/v1/auth/registerByPassword', {
        password,
    });
}

export function getSocialLink({ backUrl, driver, redirectUrl }) {
    return $http.post('/v1/auth/getSocialLink', {
        final_login_url: backUrl,
        driver,
        redirect_social_url: redirectUrl,
    });
}

export function setCity({ name, fias_id, region_fias_id }) {
    return $http.put('/v1/auth/city', {
        name,
        fias_id,
        region_fias_id,
    });
}

export function setSessionReferralCode(referral_code) {
    return $http.post('/v1/auth/referralCode', {
        referral_code,
    });
}

// profile

export function getProfile() {
    return $http.get('/v1/lk/profile');
}

export function uploadProfileCertificate(formData) {
    return $http.post('/v1/lk/profile/certificate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data; boundary="boundary',
        },
    });
}

export function loadProfileCertificate(name) {
    return $http.get(`/storage/certificate/${name}`, {
        responseType: 'blob',
    });
}

export function deleteProfileCertificate(id) {
    return $http.delete(`/v1/lk/profile/certificate/${id}`);
}

export function changeProfileCredential(code, type) {
    let method = '';
    switch (type) {
        case verificationCodeType.PROFILE_PHONE:
            method = '/v1/lk/profile/change-phone';
            break;
        case verificationCodeType.PROFILE_EMAIL:
            method = '/v1/lk/profile/change-email';
            break;
        default:
            throw new Error(`Wrong verification code type: ${type}`);
    }
    return $http.post(method, {
        code: String(code),
    });
}

export function changeProfilePassword(data) {
    return $http.post('/v1/lk/profile/change-password', data);
}

export function changeProfilePortfolio(portfolios) {
    return $http.put('/v1/lk/profile/portfolio', {
        portfolios,
    });
}

export function changeProfileActivities(ids) {
    return $http.put('/v1/lk/profile/activities', {
        ids,
    });
}

export function changeProfileAvatar(formData) {
    return $http.post('/v1/lk/profile/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data; boundary="boundary',
        },
    });
}

export function changeProfilePersonal({ firstName, lastName, middleName, birthday, gender }) {
    return $http.put('/v1/lk/profile/personal', {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birthday: birthday,
        gender: gender,
    });
}

export function getProfilePreferences(type) {
    return $http.get(`/v1/lk/preferences/${type}`);
}

export function changeProfilePreferences(type, entityType, items) {
    return $http.put(`/v1/lk/preferences/${type}/${entityType}`, {
        [entityType]: items,
    });
}

export function deleteProfileSocial(driver) {
    return $http.delete(`/v1/lk/profile/social/${driver}`);
}

export function deleteProfileAvatar(data) {
    return $http.delete('/v1/lk/profile/avatar');
}

export function getProfileAddresses() {
    return $http.get('/v1/lk/address');
}

export function changeProfileAddress(address) {
    return $http.put('/v1/lk/address', {
        address,
    });
}

export function deleteProfileAddress(id) {
    return $http.delete(`/v1/lk/address/${id}`);
}

export function defaultProfileAddress(id) {
    return $http.put(`/v1/lk/address/${id}/default`);
}

export function getProfileOrdersInfo() {
    return $http.get('/v1/lk/order/info');
}

export function getProfileOrders(sortDirection, sortKey, pageNum, perPage) {
    return $http.get('/v1/lk/order', {
        params: {
            sortDirection,
            sortKey,
            pageNum,
            perPage,
        },
    });
}

export function getProfileOrder(id) {
    return $http.get(`/v1/lk/order/${id}`);
}

export function getProfileOrderPaymentLink(orderId, paymentId, backUrl) {
    return $http.post(`/v1/lk/order/${orderId}/payment/${paymentId}/start`, {
        return_url: backUrl,
    });
}

export function repeatOrder(id) {
    return $http.post(`/v1/lk/order/${id}/repeat`);
}

export function getProfileSeoProducts(pageNum, perPage, isActive) {
    return $http.get('/v1/lk/promotion-product', {
        params: {
            pageNum,
            perPage,
            isActive,
        },
    });
}

export function getProfilePromopage(pageNum, perPage) {
    return $http.get('/v1/lk/promo-page', {
        params: {
            pageNum,
            perPage,
        },
    });
}

export function getProfilePromopageProducts(name, limit) {
    return $http.get('/v1/lk/promo-page/products', {
        params: {
            name,
            limit,
        },
    });
}

export function setProfilePromopageTitle(name) {
    return $http.put('/v1/lk/promo-page/name', {
        promo_page_name: name,
    });
}

export function addProfilePromopageProductByCode(code) {
    return $http.put(`/v1/lk/promo-page/products/by-code/${code}`);
}

export function addProfilePromopageProductById(id) {
    return $http.put(`/v1/lk/promo-page/products/by-id/${id}`);
}

export function deleteProfilePromopageProductById(id) {
    return $http.delete(`/v1/lk/promo-page/products/by-id/${id}`);
}

export function changeProfileRequisites(name, address, inn, account, bank, bik, correspondentAccount) {
    return $http.put('/v1/lk/profile/legal-info', {
        legal_info_company_name: name,
        legal_info_company_address: address,
        legal_info_inn: inn,
        legal_info_payment_account: account,
        legal_info_bik: bik,
        legal_info_bank: bank,
        legal_info_bank_correspondent_account: correspondentAccount,
    });
}

export function changeProfileReferralCode(code) {
    return $http.put('/v1/lk/profile/referral-code', {
        code,
    });
}

export function getReferralData() {
    return $http.get('/v1/lk/order-referral');
}

export function getReferralOrders(pageNum, perPage, sortKey = 'name', sortDirection = 'desc', filterOrderDate) {
    return $http.get('/v1/lk/order-referral/orders', {
        params: {
            pageNum,
            perPage,
            sortKey,
            sortDirection,
            filterOrderDate,
        },
    });
}

export function getReferralOrderDetails(id) {
    return $http.get(`/v1/lk/order-referral/${id}`);
}

export function getBillingData() {
    return $http.get('/v1/lk/bill');
}

export function getBillingOperations(pageNum, perPage) {
    return $http.get('/v1/lk/bill/operations', {
        params: {
            pageNum,
            perPage,
        },
    });
}

export function postCashOut(card_id, value) {
    return $http.post('/v1/lk/bill/cash-out', { card_id, value });
}

export function createYaCard(card_panmask, card_synonim, card_country_code, card_type, account_number) {
    return $http.post('/v1/lk/bill/ya-card', {
        card_panmask,
        card_synonim,
        card_country_code,
        card_type,
        account_number,
    });
}

export function getPromocodeData(isArchive = 0) {
    return $http.get('/v1/lk/promo-code/', {
        params: {
            archive: Number(isArchive),
        },
    });
}

// messages

export function getProfileChats() {
    return $http.get('/v1/lk/messages/');
}

export function createProfileChat(formData) {
    return $http.post('/v1/lk/messages/', formData);
}

export function getProfileChatMessages(chatId) {
    return $http.get(`/v1/lk/messages/${chatId}`);
}

export function createProfileChatMessage(chatId, message, files) {
    return $http.post(`/v1/lk/messages/${chatId}`, {
        message,
        files,
    });
}

export function getUnreadMesagesCount() {
    return $http.get('/v1/lk/messages/unread-count');
}

export function getMessageThemes() {
    return $http.get('/v1/content/messages');
}

export function getBonusesData(pageNum, perPage) {
    return $http.get('/v1/lk/bonuses/', {
        params: {
            pageNum,
            perPage,
        },
    });
}

// referrer

export function getReferrerData(code) {
    return $http.get(`/v1/promo-page/${code}`);
}

export function getReferrerProducts(id, pageNum, perPage) {
    return $http.get(`/v1/promo-page/${id}/products`, {
        params: {
            pageNum,
            perPage,
        },
    });
}

// search

export function search(data) {
    return $http.get('/v1/search', data);
}

// catalog

export function getProductGroups(type, page, orderField = 'name') {
    return $http.get('/v1/catalog/product-groups', {
        params: {
            type_code: type,
            page,
            orderField,
        },
        paramsSerializer(params) {
            return qs.stringify(params, {
                encode: false,
            });
        },
    });
}

export function getProductGroup(type, code) {
    return $http.get('/v1/catalog/product-group', {
        params: {
            type_code: type,
            code,
        },
        paramsSerializer(params) {
            return qs.stringify(params, {
                encode: false,
            });
        },
    });
}

export function getProducts({ filter, orderField = 'price', orderDirection = 'desc', page = 1 }) {
    return $http.get('/v1/catalog/products', {
        params: {
            filter,
            page,
            orderField,
            orderDirection,
        },
        paramsSerializer(params) {
            return qs.stringify(params, {
                encode: false,
            });
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
        params: {
            filter,
            page,
            orderField,
            orderDirection,
        },
        paramsSerializer(params) {
            return qs.stringify(params, {
                encode: false,
            });
        },
    });
}

export function getFilters(categoryCode, excludedFilters) {
    return $http.get('/v1/catalog/filter', {
        params: {
            categoryCode,
            excludedFilters,
        },
        paramsSerializer(params) {
            return qs.stringify(params, {
                encode: false,
            });
        },
    });
}

export function getProductBundles(code) {
    return $http.get('/v1/catalog/bundles', {
        params: {
            code,
        },
    });
}

export function getCategories(node_code, max_depth) {
    return $http.get('/v1/categories', {
        params: {
            node_code: node_code || undefined,
            max_depth: max_depth || undefined,
        },
    });
}

export function getBannersByCode(typeCode, random = false) {
    return $http.get('/v1/content/banners', {
        params: {
            typeCode,
            random: Number(random),
        },
    });
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

export function getProduct(code, referrerCode) {
    return $http.get('/v1/catalog/product-detail', {
        params: {
            code,
            referrerCode,
        },
    });
}

export function getProductPickupPoints(code) {
    return $http.get('/v1/catalog/product-detail/pickup-points', {
        params: {
            code,
        },
    });
}

export function getProductOptions(groupId) {
    return $http.get('/v1/catalog/variants', {
        params: {
            groupId,
        },
    });
}

export function getMasterclass(code) {
    return $http.get('/v1/public-events/detail', {
        params: {
            code,
        },
    });
}

//brand

export function getBrand(data) {
    return $http.get('/v1/brand', data);
}

// cart

export function getCartData() {
    return $http.get('/v1/cart/data');
}

export function deleteAllItems() {
    return $http.delete('/v1/cart/all');
}

export function addMasterclassItem(offerId, count) {
    return $http.post('/v1/cart/item-public-event', {
        offerId,
        count,
    });
}

export function deleteCartItem(offerId, storeId) {
    return $http.delete('/v1/cart/item', {
        data: {
            offerId,
            storeId,
        },
    });
}

export function addCartItem(offerId, storeId, count, referrerCode) {
    return $http.post('/v1/cart/item', {
        offerId,
        storeId,
        count,
        referrerCode: referrerCode ? String(referrerCode) : undefined,
    });
}

export function addCartBundle(bundleId, count, referrerCode) {
    return $http.post('/v1/cart/item-bundle', {
        bundleId,
        count,
        referrerCode,
    });
}

export function deleteCartBundle(bundleId) {
    return $http.delete('/v1/cart/item-bundle', {
        data: {
            bundleId,
        },
    });
}

export function addCartPromocode(data) {
    return $http.post('/v1/cart/promo-code', data);
}

export function deleteCartPromocode(data) {
    return $http.post('/v1/cart/promo-code', data);
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
    return $http.post('/v1/checkout/promo-code', data);
}

export function deletePromocode(data) {
    return $http.post('/v1/checkout/promo-code', data);
}

export function changeReceiveMethod(data) {
    return $http.post('/v1/checkout/receive-method', data);
}

// favorites

export function getFavorites(pageNum, perPage, orderField, orderDirection) {
    return $http.get('/v1/lk/favorites', {
        params: {
            pageNum,
            perPage,
            orderField,
            orderDirection,
        },
    });
}

export function addFavoritesItem(product_id) {
    return $http.post(`/v1/lk/favorites/${product_id}`);
}

export function deleteFavoritesItem(product_id) {
    return $http.delete(`/v1/lk/favorites/${product_id}`);
}

export function deleteAllFavorites() {
    return $http.delete('/v1/lk/favorites/all');
}

export function getFavoritesAll() {
    return $http.get('/v1/lk/favorites/all');
}

// documents

export function getDocuments({ type, status }) {
    return $http.get('/v1/lk/documents', {
        params: {
            type,
            status,
        },
    });
}

export function getDocumentsFilters() {
    return $http.get('/v1/lk/documents/filters');
}

// Masterclasses

export function getCatalogMasterclasses(page, orderField, orderDirection, filter) {
    return $http.get('/v1/public-events', {
        params: {
            filter,
            page,
            orderField,
            orderDirection,
        },
        paramsSerializer(params) {
            return qs.stringify(params, {
                encode: false,
            });
        },
    });
}

export function getMasterclassFilters(excludedFilters) {
    return $http.get('/v1/public-events/filters', {
        params: {
            excludedFilters,
        },
    });
}

export function getReviews(product_code, sort_field = 'created_at', sort_direction = 'desc', page = 1, per_page = 5) {
    return $http.get('/v1/reviews', {
        params: {
            product_code,
            sort_field,
            sort_direction,
            page,
            per_page,
        },
    });
}

export function addReview(product_code, rating, body, pros, cons, files) {
    return $http.post('/v1/reviews/', {
        product_code,
        rating,
        body,
        pros,
        cons,
        files,
    });
}
