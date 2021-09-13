import { $context } from '@services';
import { orderStatus, deliveryStatus, filterField } from '@enums/order';
import { dateToString } from '@util/index';

export function getDeliveryStatusColorClass(status) {
    if (status === deliveryStatus.STATUS_DONE) return 'status-color-success';
    if (status >= deliveryStatus.STATUS_LOST) return 'status-color-error';
}

export function getOrderStatusColorClass(status, isCanceled = false, isPartiallyCancelled = false) {
    if (isCanceled || isPartiallyCancelled) return 'status-color-error';
    switch (status) {
        case orderStatus.DONE:
            return 'status-color-success';
        default:
            return null;
    }
}

export function getOrderFilterDate(field) {
    const getDate = (f) => {
        const today = new Date();
        switch (f) {
            case filterField.YEAR:
                return new Date(today.setFullYear(today.getFullYear() - 1));
            case filterField.MONTH:
                return new Date(today.setMonth(today.getMonth() - 1));
            case filterField.DAY:
                return new Date(today.setDate(today.getDate() - 1));
            case filterField.ALL_TIME:
            default:
                return null;
        }
    };

    return getDate(field) ? dateToString(getDate(field)) : null;
}

export function generateThankPageUrl(orderId) {
    return `${$context.baseURL}/thank-you/${orderId}`;
}
