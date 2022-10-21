/**
 * Возвращает Promise, вызов должен быть асинхронным (async/await)
 * @param size {number}
 * @param str {string}
 * @returns {Promise | Promise<unknown> | undefined}
 * @constructor
 */
export function QRGenerate(size, str) {
    const QRCode = require('qrcode');

    const options = {
        height: size,
        width: size,
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#FFF',
        },
    }

    return QRCode.toString(str, options);
}