class BaseCookie {
    constructor(cookieString) {
        this.cookieString = `${cookieString}`;
    }
}

export class BrowserCookie extends BaseCookie {
    constructor() {
        super();
    }
}

export class ExpressCookie extends BaseCookie {
    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
    }
}
