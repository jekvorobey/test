// eslint-disable-next-line
import HttpService from 'HttpServiceEntry';
import HttpServiceBase from './base';
import MockHttpService from './MockService';

export default class MockServiceAdapter extends HttpServiceBase {
    constructor(context, cookie) {
        super(context.baseURL);
        this.httpServiceInstance = new HttpService(context, cookie);
        this.mockServiceInstance = new MockHttpService(context);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    get(path, config) {
        if (path.includes('/v1/auth/socialHandler/')) return this.httpServiceInstance.get(path, config);
        if (path.includes('/storage/certificate/')) return this.httpServiceInstance.get(path, config);
        if (path.includes('/v1/lk/order')) return this.httpServiceInstance.get(path, config);

        switch (path) {
            case '/v1/content/banners':
            case '/v1/content/menus':
            case '/v1/auth/is-login':
            case '/v1/categories':
            case '/v1/cart/data':
            case '/v1/checkout/data':
            case '/v1/catalog/products':
            case '/v1/catalog/items':
            case '/v1/catalog/product-detail':
            case '/v1/catalog/variants':
            case '/v1/catalog/filter':
            case '/v1/catalog/product-groups':
            case '/v1/catalog/product-group':

            case '/v1/lk/profile':
            case '/v1/lk/preference':
            case '/v1/lk/address':
                return this.httpServiceInstance.get(path, config);
            default:
                return this.mockServiceInstance.get(path, config);
        }
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    post(path, data, config) {
        if (path.includes('/v1/lk/order')) return this.httpServiceInstance.post(path, data, config);

        switch (path) {
            case '/v1/auth/loginBySocial':
            case '/v1/auth/loginByPassword':
            case '/v1/auth/sendSMS':
            case '/v1/auth/checkCode':
            case '/v1/auth/registerByPassword':
            case '/v1/auth/getSocialLink':
            case '/v1/auth/logout':

            case '/v1/auth/reset/sendSMS':
            case '/v1/auth/reset/checkCode':
            case '/v1/auth/reset/resetPassword':

            case '/v1/cart/item':

            case '/v1/checkout/receive-method':
            case '/v1/checkout/address':
            case '/v1/checkout/pickup-point':
            case '/v1/checkout/add-certificate':
            case '/v1/checkout/remove-certificate':
            case '/v1/checkout/bonus':
            case '/v1/checkout/promocode':
            case '/v1/checkout/commit':

            case '/v1/lk/profile/certificate':
            case '/v1/lk/profile/avatar':
            case '/v1/lk/profile/change-phone-code':
            case '/v1/lk/profile/change-phone':
            case '/v1/lk/profile/change-email-code':
            case '/v1/lk/profile/change-email':
            case '/v1/lk/profile/change-password':
                return this.httpServiceInstance.post(path, data, config);
            default:
                return this.mockServiceInstance.post(path, data, config);
        }
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    delete(path, config) {
        if (path.includes('/v1/lk/profile/certificate/')) return this.httpServiceInstance.delete(path, config);
        if (path.includes('/v1/lk/profile/social/')) return this.httpServiceInstance.delete(path, config);
        if (path.includes('/v1/lk/address/')) return this.httpServiceInstance.delete(path, config);

        switch (path) {
            case '/v1/cart/item':
            case '/v1/cart/all':
            case '/v1/checkout/certificate':
            case '/v1/checkout/bonus':
            case '/v1/checkout/promocode':

            case '/v1/lk/profile/avatar':
            case '/v1/lk/profile/social/vkontakte':
                return this.httpServiceInstance.delete(path, config);
            default:
                return this.mockServiceInstance.delete(path, config);
        }
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    put(path, data, config) {
        if (path.includes('/v1/lk/preference/')) return this.httpServiceInstance.put(path, data, config);
        if (path.includes('/v1/lk/address/')) return this.httpServiceInstance.put(path, data, config);

        switch (path) {
            case '/v1/lk/profile/portfolio':
            case '/v1/lk/profile/personal':
            case '/v1/lk/profile/activities':
            case '/v1/lk/address':
                return this.httpServiceInstance.put(path, data, config);
            default:
                return this.mockServiceInstance.put(path, data, config);
        }
    }
}
