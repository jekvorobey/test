import { $context, $store } from '@services';
import { orderStatus, deliveryStatus, filterField } from '@enums/order';
import { dateToString } from '@util/index';
import { CAN_BUY, HAS_SESSION, NAME as AUTH_MODULE, STATUS, USER } from '@store/modules/Auth';
import {NAME as CHECKOUT_MODULE} from '@store/modules/Checkout';
import { SET_POSCREDIT_SAVE_PROFILE, SET_POSCREDIT_CHECK_STATUS } from '@store/modules/Checkout/actions';

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

export function loadCreditLineWidget() {
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

export function loadPosCreditWidget() {
    return new Promise((resolve, reject) => {

        //Id заказа. Заполняется при формировании заявки в PosCredit
        window.poscreditOrderId = null;

        window.poscreditCheckStatus = function (result) {
            //Один из вариантов возможного использования функции
            if(result === 1) console.log('Клиент ушел не оформив заявку до конца');
            if(result === 2) console.log('Клиенту отказали в кредите предложенные банки');
            if(result === 3) console.log('Клиент сам отказался от кредита после получения решения');
            if(result === 4) console.log('Заявка ушла в обработку кредитным инспекторам или перешла на ручной ввод');
            if(result === 5) console.log('Получено одобрение по заявке, но клиент не подтвердил выбор банка');
            if(result === 6) console.log('Клиент завершил оформление заявки и подтвердил выбор банка');

            // Передаем данные на бэкенд
            $store.dispatch(`${CHECKOUT_MODULE}/${SET_POSCREDIT_CHECK_STATUS}`, {poscreditOrderId, result})
        };

        window.poscreditSaveProfile = function (poscreditId) {
            //Полученный poscreditId и poscreditOrderId заявки нужно отправить на backEnd
            console.log("Номеру заказа:" + poscreditOrderId +" присовена заявка: " + poscreditId);

            // Передаем данные на бэкенд
            $store.dispatch(`${CHECKOUT_MODULE}/${SET_POSCREDIT_SAVE_PROFILE}`, {poscreditOrderId, poscreditId})
        };

        const scriptElement = document.createElement('script');

        scriptElement.setAttribute('src', 'https://api.b2pos.ru/shop/v2/connect.js');
        scriptElement.onload = () => {
            if (typeof window.poscreditServices === "function") {
                return resolve();
            } else {
                return reject();
            }
        };

        document.querySelector('body').appendChild(scriptElement);
    });
}