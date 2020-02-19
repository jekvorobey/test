import { $logger } from '../services/ServiceLocator';

export function registerModuleIfNotExists(store, name, storeModule) {
    const register = !!store._modulesNamespaceMap[`${name}/`];
    if (!register)
        store.registerModule(name, storeModule, {
            preserveState: !!store.state[name],
        });
}

export function storeErrorHandler(methodName, isBubble = false) {
    return thrown => {
        if (thrown && thrown.isCancel === true) $logger.warn(`${methodName} ${thrown.message}`);
        else if (thrown && thrown.isCancel === false) $logger.error(`${methodName} ${thrown.message}`);
        else $logger.error(`${methodName} ${thrown}`);
        if (isBubble) throw thrown;
    };
}

export default { registerModuleIfNotExists };
