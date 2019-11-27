import Cookie from 'cookie-universal';
import BaseCookie from './base';

export default class ServerCookie extends BaseCookie {
    constructor(req, res) {
        super();
        this.instance = new Cookie(req, res);
        this.req = req;
        this.res = res;
    }

    get(name, options) {
        return this.instance.get(name, options);
    }

    set(name, value, options) {
        this.instance.set(name, value, options);
    }

    remove(name, options) {
        this.instance.remove(name, options);
    }

    getAll(options) {
        return this.instance.getAll(options);
    }
}
