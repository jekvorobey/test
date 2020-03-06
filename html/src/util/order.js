import { orderStatus, deliveryStatus } from '../assets/scripts/enums/order';

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
