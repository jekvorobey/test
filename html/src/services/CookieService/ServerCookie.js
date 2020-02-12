import Cookie from 'cookie-universal';
import BaseCookie from './base';

export default class ServerCookie extends BaseCookie {
    constructor(context) {
        super();
        this.instance = new Cookie(context.req, context.res);
        this.req = context.req;
        this.res = context.res;
    }

    get cookieString() {
        return this.req && this.req.headers.cookie;
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
