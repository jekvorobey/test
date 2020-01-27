import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import HttpServiceBase from './base';

export default class DadataHttpService extends HttpServiceBase {
    constructor(store) {
        const { DADATA_API_HOST, DADATA_API_KEY } = store.state.env;
        super(DADATA_API_HOST);

        this.instance = axios.create({
            baseURL: DADATA_API_HOST,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${DADATA_API_KEY}`,
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
