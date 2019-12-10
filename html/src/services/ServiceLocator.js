const { serviceName } = require('../assets/scripts/constants');

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

    static get $store() {
        return ServiceLocator.instance().get(serviceName.STORE);
    }

    static get $events() {
        return ServiceLocator.instance().get(serviceName.EVENTS);
    }

    static get $progress() {
        return ServiceLocator.instance().get(serviceName.PROGRESS);
    }

    static get $logger() {
        return ServiceLocator.instance().get(serviceName.LOGGER);
    }

    static get $router() {
        return ServiceLocator.instance().get(serviceName.ROUTER);
    }

    static get $http() {
        return ServiceLocator.instance().get(serviceName.HTTP);
    }

    static get $dadata() {
        return ServiceLocator.instance().get(serviceName.DADATA);
    }

    static get $config() {
        return ServiceLocator.instance().get(serviceName.CONFIG);
    }

    static get $cookie() {
        return ServiceLocator.instance().get(serviceName.COOKIE);
    }
};
