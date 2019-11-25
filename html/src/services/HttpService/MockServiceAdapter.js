// eslint-disable-next-line
import HttpService from 'HttpServiceEntry';
import HttpServiceBase from './base';
import MockHttpService from './MockService';

export default class MockServiceAdapter extends HttpServiceBase {
    constructor(baseURL = 'https://master-front.ibt-mas.greensight.ru') {
        super(baseURL);
        this.httpServiceInstance = new HttpService(baseURL);
        this.mockServiceInstance = new MockHttpService(baseURL);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    delete(path, config) {
        switch (path) {
            case '/v1/cart/item':
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
    post(path, data, config) {
        switch (path) {
            case '/v1/auth/login':
            case '/v1/cart/item':
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
    get(path, config) {
        switch (path) {
            case '/v1/categories':
            case '/v1/catalog/items':
            case '/v1/cart/data':
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
    put(path, data, config) {
        switch (path) {
            default:
                return this.mockServiceInstance.put(path, config);
        }
    }
}
