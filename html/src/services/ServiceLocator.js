let locatorInstance;
module.exports = class ServiceLocator {
    constructor() {
        this.services = {};
    }

    static instance() {
        if (locatorInstance === undefined) return this.createInstance();
        return locatorInstance;
    }

    static createInstance() {
        if (locatorInstance) locatorInstance.services = null;
        locatorInstance = new ServiceLocator();
        return locatorInstance;
    }

    /**
     *
     * @param {String} name
     * @param {function(ServiceLocator)} cb
     */
    register(name, cb) {
        this.services[name] = {
            cb,
            instance: cb(this),
        };
        return this;
    }

    /**
     * Получить сервис.
     * @param {String} name
     * @returns {*}
     */
    get(name) {
        return this.services[name] ? this.services[name].instance : null;
    }

    static $store() {
        return ServiceLocator.instance().get('store');
    }

    static $events() {
        return ServiceLocator.instance().get('events');
    }

    static $progress() {
        return ServiceLocator.instance().get('progress');
    }

    static $logger() {
        return ServiceLocator.instance().get('logger');
    }

    static $router() {
        return ServiceLocator.instance().get('router');
    }

    static $http() {
        return ServiceLocator.instance().get('http');
    }

    static $config() {
        return ServiceLocator.instance().get('config');
    }

    static $cookie() {
        return ServiceLocator.instance().get('cookie');
    }
};
