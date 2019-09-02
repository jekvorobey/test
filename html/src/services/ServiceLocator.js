const { serviceName } = require('../constants');

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
        return ServiceLocator.instance().get(serviceName.STORE);
    }

    static $events() {
        return ServiceLocator.instance().get(serviceName.EVENTS);
    }

    static $progress() {
        return ServiceLocator.instance().get(serviceName.PROGRESS);
    }

    static $logger() {
        return ServiceLocator.instance().get(serviceName.LOGGER);
    }

    static $router() {
        return ServiceLocator.instance().get(serviceName.ROUTER);
    }

    static $http() {
        return ServiceLocator.instance().get(serviceName.HTTP);
    }

    static $config() {
        return ServiceLocator.instance().get(serviceName.CONFIG);
    }

    static $cookie() {
        return ServiceLocator.instance().get(serviceName.COOKIE);
    }
};
