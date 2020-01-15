export function registerModuleIfNotExists(store, name, storeModule) {
    const register = !!store._modulesNamespaceMap[`${name}/`];
    if (!register)
        store.registerModule(name, storeModule, {
            preserveState: !!store.state[name],
        });
}

export default { registerModuleIfNotExists };
