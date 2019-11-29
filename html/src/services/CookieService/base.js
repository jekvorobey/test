export default class BaseCookie {
    get cookieString() {
        throw new Error('not implemented');
    }

    get(name, options) {
        throw new Error('not implemented');
    }

    set(name, value, options) {
        throw new Error('not implemented');
    }

    remove(name, options) {
        throw new Error('not implemented');
    }

    setAll(cookieArray) {
        throw new Error('not implemented');
    }

    getAll(options) {
        throw new Error('not implemented');
    }

    removeAll() {
        throw new Error('not implemented');
    }
}
