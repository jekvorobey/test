import BaseCookie from './base';

export default class ExpressCookie extends BaseCookie {
    constructor(req, res) {
        super(req.headers.cookie);
        this.req = req;
        this.res = res;
    }

    set(name, value, props) {
        let cookies = this.res.getHeader('Set-Cookie');
        if (!cookies) cookies = [this.prepareSetCookieString(name, value, props)];
        else cookies.push(this.prepareSetCookieString(name, value, props));
        this.res.setHeader('Set-Cookie', cookies);
    }

    remove(name) {
        this.set(name, null, { expires: -1 });
    }
}
