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
        switch (path) {
            case '/v1/banners':
            case '/v1/instagram':
            case '/v1/masterclasses':
                return this.mockServiceInstance.get(path, config);
            default:
                return this.httpServiceInstance.get(path, config);
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
            case '':
                return this.mockServiceInstance.post(path, data, config);
            default:
                return this.httpServiceInstance.post(path, data, config);
        }
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    delete(path, config) {
        switch (path) {
            case '':
                return this.mockServiceInstance.delete(path, config);
            default:
                return this.httpServiceInstance.delete(path, config);
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
            case '':
                return this.mockServiceInstance.put(path, data, config);
            default:
                return this.httpServiceInstance.put(path, data, config);
        }
    }
}
