/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const types = {
    LOG: 0,
    INFO: 1,
    SUCCESS: 2,
    WARNING: 3,
    ERROR: 4,
};

module.exports.types = types;

module.exports.LoggerBase = class LoggerBase {
    logByType(type, message, ...params) {
        return Error('not implemented');
    }

    log(message, ...params) {
        this.logByType(types.LOG, message, ...params);
    }

    info(message, ...params) {
        this.logByType(types.INFO, message, ...params);
    }

    success(message, ...params) {
        this.logByType(types.SUCCESS, message, ...params);
    }

    warn(message, ...params) {
        this.logByType(types.WARNING, message, ...params);
    }

    error(message, ...params) {
        this.logByType(types.ERROR, message, ...params);
    }
};

/* eslint-enable no-console */
/* eslint-enable no-unused-vars */
