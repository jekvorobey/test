import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import HttpServiceBase from './base';

export default class DadataHttpService extends HttpServiceBase {
    constructor(baseURL = '', key = '') {
        super(baseURL);

        this.instance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${key}`,
            },
            adapter: cacheAdapterEnhancer(axios.defaults.adapter),
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
    }
}
