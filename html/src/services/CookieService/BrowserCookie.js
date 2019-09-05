import BaseCookie from './base';

export default class BrowserCookie extends BaseCookie {
    constructor() {
        super(document.cookie);
    }

    set(name, value, props) {
        document.cookie = this.prepareSetCookieString(name, value, props);
    }

    remove(name) {
        this.set(name, null, { expires: -1 });
    }
}
