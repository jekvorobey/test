import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

import { $logger } from '@services';
import { httpCodes } from '@enums';
import { HTTP_REQUEST_TIMEOUT } from '@constants';

import HttpServiceBase from './base';

export default class ClientHttpService extends HttpServiceBase {
    constructor(context) {
        super(context.baseURL);

        this.instance = axios.create({
            baseURL: context.baseURL,
            withCredentials: true,
            timeout: HTTP_REQUEST_TIMEOUT,
            // cache will be enabled by default
            adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
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
                if (resp.status >= httpCodes.SUCCESS && resp.status <= httpCodes.NOT_MODIFIED) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (thrown) {
                const { message, response } = thrown;
                const { status = null, data: thrownData = null } = response || {};
                reject({ isCancel: axios.isCancel(thrown), message, status, data: thrownData });
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
                if (resp.status >= httpCodes.SUCCESS && resp.status <= httpCodes.NOT_MODIFIED) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (thrown) {
                const { message, response } = thrown;
                const { status = null, data: thrownData = null } = response || {};
                reject({ isCancel: axios.isCancel(thrown), message, status, data: thrownData });
            }
        });
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
                if (resp.status >= httpCodes.SUCCESS && resp.status <= httpCodes.NO_CONTENT) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (thrown) {
                const { message, response } = thrown;
                const { status = null, data: thrownData = null } = response || {};
                reject({ isCancel: axios.isCancel(thrown), message, status, data: thrownData });
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
                if (resp.status >= httpCodes.SUCCESS && resp.status <= httpCodes.NO_CONTENT) resolve(resp.data);
                else reject(`status code ${resp.status}`);
            } catch (thrown) {
                const { message, response } = thrown;
                const { status = null, data: thrownData = null } = response || {};
                reject({ isCancel: axios.isCancel(thrown), message, status, data: thrownData });
            }
        });
    }
}
