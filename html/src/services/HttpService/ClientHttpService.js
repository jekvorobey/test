import axios from 'axios';
import HttpServiceBase from './base';
// import { cacheAdapterEnhancer } from 'axios-extensions';

export default class ClientHttpService extends HttpServiceBase {
    constructor(baseURL = '') {
        super(baseURL);

        this.instance = axios.create({
            baseURL,
            withCredentials: true,
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
    get(path, config) {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await this.instance.get(path, config);
                if (resp.status === 200 || resp.status === 304) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (error) {
                reject(error);
            }
        });
        // return this.instance.get(path, config);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    post(path, data, config) {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await this.instance.post(path, data, config);
                if (resp.status === 200 || resp.status === 304) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (error) {
                reject(error);
            }
        });
        // return this.instance.post(path, config);
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    delete(path, config) {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await this.instance.delete(path, config);
                if (resp.status === 200 || resp.status === 204) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     *
     * @param {String} path
     * @param {*} config
     * @returns {Promise<Object>}
     */
    put(path, data, config) {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await this.instance.put(path, data, config);
                if (resp.status === 200 || resp.status === 204) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (error) {
                reject(error);
            }
        });
    }
}
