import axios from 'axios';
import HttpServiceBase from './base';
// import { cacheAdapterEnhancer } from 'axios-extensions';

export default class HttpService extends HttpServiceBase {
    constructor(baseURL = '') {
        super(baseURL);

        this.instance = axios.create({
            baseURL,
            // cache will be enabled by default
            // adapter: cacheAdapterEnhancer(axios.defaults.adapter),
        });
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    delete(path, config) {
        return this.instance.get(path, config);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    post(path, config) {
        return new Promise(async (resolve, reject) => {
            const resp = await this.instance.get(path, config);
            if (resp.status === 200 || resp.status === 304) resolve(resp.data);
            else reject('bad status');
        });
        // return this.instance.post(path, config);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    get(path, config) {
        return new Promise(async (resolve, reject) => {
            const resp = await this.instance.get(path, config);
            if (resp.status === 200 || resp.status === 304) resolve(resp.data);
            else reject('bad status');
        });
        // return this.instance.get(path, config);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    put(path, config) {
        return this.instance.get(path, config);
    }
}
