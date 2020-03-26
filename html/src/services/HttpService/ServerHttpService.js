import axios from 'axios';
import HttpServiceBase from './base';

import { httpCodes } from '@enums';
import { HTTP_REQUEST_TIMEOUT } from '@constants';

export default class ServerHttpService extends HttpServiceBase {
    constructor(context, cookie) {
        super(context.baseURL);

        this.instance = axios.create({
            baseURL: context.baseURL,
            withCredentials: true,
            timeout: HTTP_REQUEST_TIMEOUT,
            headers: { Cookie: cookie.cookieString || '' },
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
            } catch (error) {
                let status = null;
                if (error.response) status = error.response.status;
                reject({ isCancel: axios.isCancel(error), message: error.message, status });
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
            } catch (error) {
                let status = null;
                if (error.response) status = error.response.status;
                reject({ isCancel: axios.isCancel(error), message: error.message, status });
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
            } catch (error) {
                let status = null;
                if (error.response) status = error.response.status;
                reject({ isCancel: axios.isCancel(error), message: error.message, status });
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
            } catch (error) {
                let status = null;
                if (error.response) status = error.response.status;
                reject({ isCancel: axios.isCancel(error), message: error.message, status });
            }
        });
    }
}
