import { decorate, injectable, inject } from 'inversify';

export function injectableClass(target) {
    if (target.injectable) return;
    decorate(injectable(), target);
    target.injectable = true;
}

export function injectClass(type, target, parameterIndex) {
    if (!target.injectionMap) target.injectionMap = {};
    if (target.injectionMap[type] === parameterIndex) return;
    decorate(inject(type), target, parameterIndex);
    target.injectionMap[type] = parameterIndex;
}

export default { injectableClass, injectClass };
