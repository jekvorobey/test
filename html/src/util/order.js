import { $context, $store } from '@services';
import { orderStatus, deliveryStatus, filterField } from '@enums/order';
import { dateToString } from '@util/index';
import { CAN_BUY, HAS_SESSION, NAME as AUTH_MODULE, STATUS, USER } from '@store/modules/Auth';
import { userStatus } from '@enums/profile';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { modalName } from '@enums';

export function checkPermissions() {
    const user = $store.state[AUTH_MODULE][USER];
    const status = user && user[STATUS];
    const canBuy = user && user[CAN_BUY];

    if (!canBuy) {
        if (status === userStatus.CREATED || status === userStatus.NEW) {
            $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message:
                        'Ваш профессиональный статус не подтвержден. Заполните недостающую информацию в Личном кабинете.',
                    btnMessage: 'Заполнить',
                    href: '/profile',
                },
            });
        } else {
            $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message: 'Статус вашего профиля не подтверждён',
                },
            });
        }

        return false;
    }

    return true;
}

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

export function loadCreditWidget() {
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');

        scriptElement.setAttribute('src', 'https://online.pp.credit/assets_widget/l-kredit.js');
        scriptElement.onload = () => {
            if (typeof window.CLObject !== 'undefined') {
                return resolve();
            } else {
                return reject();
            }
        };

        document.querySelector('body').appendChild(scriptElement);
    });
}
