export default class HttpServiceBase {
    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    post() {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    get() {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    put() {
        throw new Error('not implemented');
    }

    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    delete() {
        throw new Error('not implemented');
    }
}

/* eslint-enable no-console */
