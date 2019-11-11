import axios from 'axios';
import HttpServiceBase from './base';
// import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
    baseURL: '/',
    headers: {},
    // cache will be enabled by default
    // adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default class HttpService extends HttpServiceBase {}
