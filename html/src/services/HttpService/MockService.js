import HttpServiceBase from './base';

/**
 * Мок сервис для мок данных
 */
export default class MockHttpService extends HttpServiceBase {
    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    delete(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    post(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    put(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    get(path, data = {}) {
        return new Promise((resolve, reject) => {
            switch (path) {
                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }
}
