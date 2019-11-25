/* eslint-disable no-console */
const { LoggerBase, types } = require('./base');

module.exports = class ClientLogger extends LoggerBase {
    logByType(type, message, ...params) {
        switch (type) {
            case types.ERROR:
                if (params.length !== 0) console.error(message, params);
                else console.error(message);
                break;
            case types.INFO:
                if (params.length !== 0) console.info(message, params);
                else console.info(message);
                break;
            case types.WARNING:
                if (params.length !== 0) console.warn(message, params);
                else console.warn(message);
                break;
            default:
                if (params.length !== 0) console.log(message, params);
                else console.log(message);
                break;
        }
    }
};

/* eslint-enable no-console */
