import HttpServiceBase from './base';
import MockHttpService from './MockService';
import HttpService from './index';

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
    post(path, config) {
        switch (path) {
            default:
                return this.mockServiceInstance.post(path, config);
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
    put(path, config) {
        switch (path) {
            default:
                return this.mockServiceInstance.put(path, config);
        }
    }
}
