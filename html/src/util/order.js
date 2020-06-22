import { orderStatus, deliveryStatus, filterFields } from '@enums/order';

export function getDeliveryStatusColorClass(status) {
    if (status === deliveryStatus.STATUS_DONE) return 'status-color-success';
    if (status >= deliveryStatus.STATUS_LOST) return 'status-color-error';
}

export function getOrderStatusColorClass(status, isCanceled = false) {
    if (isCanceled) return 'status-color-error';
    switch (status) {
        case orderStatus.DONE:
            return 'status-color-success';
        default:
            return null;
    }
}

export function getOrderFilterDate(field) {
    let date = new Date();

    switch (field) {
        case filterFields.ALL_TIME:
            return;
        case filterFields.YEAR:
            return date.setFullYear(date.getFullYear() - 1);
        case filterFields.MONTH:
            return date.setMonth(date.getMonth() - 1);
        case filterFields.DAY:
            return date.setDate(date.getDate() - 1);
        default:
            return
    }
}
