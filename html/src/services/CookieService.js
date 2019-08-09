class BaseCookie {
    constructor(cookieString) {
        this.cookieString = `${cookieString}`;
    }

    get(name, def) {
        const matches = this.cookieString.match(
            new RegExp(`(?:^|; )${name.replace(/([$()*+./?[\\\]^{|}])/g, '\\$1')}=([^;]*)`)
        );
        return matches ? decodeURIComponent(matches[1]) : def;
    }

    set(name, value, props) {
        throw new Error('Переопредели set');
    }

    remove(name) {
        throw new Error('Переопредели remove');
    }

    prepareSetCookieString(name, value, props) {
        props = props || {};

        props.path = props.path || '/';
        let exp = props.expires;

        if (typeof exp === 'number' && exp) {
            const d = new Date();
            d.setTime(d.getTime() + exp * 1000);
            exp = props.expires = d;
        }

        if (exp && exp.toUTCString) {
            props.expires = exp.toUTCString();
        }

        value = encodeURIComponent(value);
        let updatedCookie = `${name}=${value}`;
        /* eslint-disable */
        for (const propName in props) {
            if (!props.hasOwnProperty(propName)) continue;
            updatedCookie += `; ${propName}`;
            const propValue = props[propName];

            if (propValue !== true) updatedCookie += `=${propValue}`;
        }
        /* eslint-enable */

        return updatedCookie;
    }
}

export class BrowserCookie extends BaseCookie {
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

export class ExpressCookie extends BaseCookie {
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
