import Cookie from 'cookie-universal';
import BaseCookie from './base';

export default class ClientCookie extends BaseCookie {
    constructor() {
        super();
        this.instance = new Cookie();
    }

    get cookieString() {
        return document.cookie;
    }

    get(name, options) {
        this.instance.get(name, options);
    }

    set(name, value, options) {
        this.instance.set(name, value, options);
    }

    remove(name, options) {
        this.instance.get(name, options);
    }

    getAll(options) {
        return this.instance.getAll(options);
    }
}
