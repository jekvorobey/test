import { orderStatus, deliveryStatus, filterField } from '@enums/order';
import { numericYearDateSettings } from '@settings';

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
    const getDate = (field) => {
        let today = new Date();
        switch (field) {
            case filterField.YEAR:
                return new Date(today.setFullYear(today.getFullYear() - 1));
            case filterField.MONTH:
                return new Date(today.setMonth(today.getMonth() - 1));
                break;
            case filterField.DAY:
                return new Date(today.setDate(today.getDate() - 1));
                break;
            case filterField.ALL_TIME: default:
                return null;
        }
    };

    return getDate(field) ? getDate(field).toLocaleDateString(numericYearDateSettings) : null;
}