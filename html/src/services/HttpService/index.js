/* eslint-disable no-console */
import axios from 'axios';
// import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
    baseURL: '/',
    headers: {},
    // cache will be enabled by default
    // adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default class HttpService {
    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    post(path, data) {}

    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    get(path, data) {}
}
