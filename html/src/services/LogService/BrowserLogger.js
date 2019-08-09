/* eslint-disable no-console */
const { LoggerBase, types } = require('./base');

module.exports = class BrowserLogger extends LoggerBase {
    logByType(type, message, ...params) {
        const time = new Date(Date.now()).toTimeString();
        const messageWithTime = `${time}: ${message}`;
        switch (type) {
            case types.ERROR:
                if (params.length !== 0) console.error(messageWithTime, params);
                else console.error(messageWithTime);
                break;
            case types.INFO:
                if (params.length !== 0) console.info(messageWithTime, params);
                else console.info(messageWithTime);
                break;
            case types.WARNING:
                if (params.length !== 0) console.warn(messageWithTime, params);
                else console.warn(messageWithTime);
                break;
            default:
                if (params.length !== 0) console.log(messageWithTime, params);
                else console.log(messageWithTime);
                break;
        }
    }
};

/* eslint-enable no-console */
