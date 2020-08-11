// eslint-disable-next-line
import HttpService from 'HttpServiceEntry';
import HttpServiceBase from './base';
import MockHttpService from './MockService';

/**
 * Адаптер для мок сервиса (часть запросов идут в реальное апи, часть в мок сервис)
 */
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
            case '':
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
