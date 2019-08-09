/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const chalk = require('chalk');

const types = {
    LOG: 0,
    INFO: 1,
    SUCCESS: 2,
    WARNING: 3,
    ERROR: 4,
};

class LoggerBase {
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
}

module.exports.logType = types;

module.exports.ExpressLogger = class ExpressLogger extends LoggerBase {
    logByType(type, message, ...params) {
        const time = new Date(Date.now()).toTimeString();
        let messageWithTime = null;
        switch (type) {
            case types.ERROR:
                messageWithTime = `${chalk.black.bgRed(' ERROR ')} ${chalk.red(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
            case types.INFO:
                messageWithTime = `${chalk.black.bgBlue(' INFO ')} ${chalk.blue(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
            case types.SUCCESS:
                messageWithTime = `${chalk.black.bgGreen(' SUCCESS ')} ${chalk.green(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
            case types.WARNING:
                messageWithTime = `${chalk.black.bgYellow(' WARNING ')} ${chalk.yellow(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
            default:
                messageWithTime = `${chalk.black.bgWhite(' LOG ')} ${chalk.white(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
        }
    }
};

module.exports.BrowserLogger = class BrowserLogger extends LoggerBase {
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

/* eslint-enable no-unused-vars */
/* eslint-enable no-console */
