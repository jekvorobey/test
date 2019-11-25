/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const chalk = require('chalk');
const { LoggerBase, types } = require('./base');

module.exports = class ServerLogger extends LoggerBase {
    logByType(type, message, ...params) {
        const time = new Date(Date.now()).toTimeString();
        let messageWithTime = null;
        switch (type) {
            case types.ERROR:
                messageWithTime = `${chalk.black.bgRed(' ERROR   ')} ${chalk.red(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
            case types.INFO:
                messageWithTime = `${chalk.black.bgBlue(' INFO    ')} ${chalk.blue(`${time}: ${message}`)}`;
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
                messageWithTime = `${chalk.black.bgWhite(' LOG    ')} ${chalk.white(`${time}: ${message}`)}`;
                if (params.length !== 0) console.log(messageWithTime, ...params);
                else console.log(messageWithTime);
                break;
        }
    }
};

/* eslint-enable no-console */
/* eslint-enable no-unused-vars */
