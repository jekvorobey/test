const { injectionType } = require('@enums');

let locatorInstance;
module.exports = class ServiceLocator {
    constructor(container) {
        this._container = container;
    }

    static instance() {
        if (locatorInstance === undefined) throw new Error('instance is not created');
        return locatorInstance;
    }

    static createInstance(container) {
        if (locatorInstance) locatorInstance._container = null;
        locatorInstance = new ServiceLocator(container);
        return locatorInstance;
    }

    static get $container() {
        return ServiceLocator.instance()._container;
    }

    static get $store() {
        return ServiceLocator.instance()._container.get(injectionType.STORE);
    }

    static get $events() {
        return ServiceLocator.instance()._container.get(injectionType.EVENTS);
    }

    static get $progress() {
        return ServiceLocator.instance()._container.get(injectionType.PROGRESS);
    }

    static get $logger() {
        return ServiceLocator.instance()._container.get(injectionType.LOGGER);
    }

    static get $router() {
        return ServiceLocator.instance()._container.get(injectionType.ROUTER);
    }

    static get $http() {
        return ServiceLocator.instance()._container.get(injectionType.HTTP);
    }

    static get $dadata() {
        return ServiceLocator.instance()._container.get(injectionType.DADATA);
    }

    static get $config() {
        return ServiceLocator.instance()._container.get(injectionType.CONFIG);
    }

    static get $cookie() {
        return ServiceLocator.instance()._container.get(injectionType.COOKIE);
    }

    static get $locale() {
        return ServiceLocator.instance()._container.get(injectionType.LOCALIZATION);
    }
};
