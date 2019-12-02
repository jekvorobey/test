import { requestStatus } from '../../../assets/scripts/constants';

export const DELIVERY_TYPES_MAP = 'deliveryTypesMap';

export const CERTIFICATES = 'certificates';
export const BONUS = 'bonus';

export const SUBSCRIBE = 'subscribe';
export const AGREEMENT = 'agreement';
export const CHECKOUT = 'checkout';
export const PROMO_CODE = 'promocode';

export const AVAILABLE_BONUS = 'availableBonus';
export const RECIPIENTS = 'recipients';
export const ADDRESSES = 'addresses';
export const PICKUP_POINTS = 'pickupPoints';

export const RECEIVE_METHODS = 'receiveMethods';
export const PAYMENT_METHODS = 'paymentMethods';
export const DELIVERY_METHODS = 'deliveryMethods';

export const CONFIRMATION_TYPES = 'confirmationTypes';
export const DELIVERY_TYPES = 'deliveryTypes';

export const CHECKOUT_INPUT = 'checkoutInput';
export const SELECTED_RECIPIENT = 'selectedRecipient';
export const SELECTED_ADDRESS = 'selectedAddress';
export const SELECTED_PICKUP_POINT = 'selectedPickupPoint';
export const SELECTED_DELIVERY_TYPE = 'selectedDeliveryType';

export const SELECTED_RECEIVE_METHOD_ID = 'selectedReceiveMethodID';
export const SELECTED_DELIVERY_METHOD_ID = 'selectedDeliveryMethodID';
export const SELECTED_PAYMENT_METHOD_ID = 'selectedPaymentMethodID';
export const SELECTED_CONFIRMATION_TYPE_ID = 'selectedConfirmationTypeID';

export const CHECKOUT_STATUS = 'checkoutStatus';
export const RECEIVE_METHOD_STATUS = 'receiveMethodStatus';
export const ADDRESS_STATUS = 'addressStatus';
export const BONUS_STATUS = 'bonusStatus';
export const CERTIFICATE_STATUS = 'certificateStatus';
export const PROMOCODE_STATUS = 'promocodeStatus';

export const SUMMARY = 'summary';

// const checkoutData = {
//     recipients: [...recipients],
//     addresses: [...addresses],
//     pickupPoints: [...pickupPoints],
//     receiveMethods: [...receiveMethods],
//     paymentMethods: [...paymentMethods],
//     confirmationTypes: [...confirmationTypes],
//     deliveryTypes: [],
//     availableBonus: 300,

//     input: {
//         receiveMethodID: receiveMethods[0].id,
//         deliveryMethodID: receiveMethods[0].methods[0].id,
//         paymentMethodID: paymentMethods[0].id,
//         confirmationTypeID: confirmationTypes[0].id,

//         recipient: recipients[0],
//         address: addresses[0],
//         pickupPoint: null,
//         deliveryType: null,

//         subscribe: 0,
//         agreement: 0,

//         promocode: null,
//         bonus: 0,
//         certificates: [],
//     },

//     summary: {
//         sum: '6 704 ₽',
//         discount: '0 ₽',
//         certificate: '0 ₽',
//         bonusPay: '0 ₽',
//         delivery: 'Бесплатно',
//         total: '6 704 ₽',
//         bonusGet: '+ 1 488',
//         bonusSpent: '0',
//     },
// };

export default {
    [AVAILABLE_BONUS]: state => state.checkoutData[AVAILABLE_BONUS],

    [RECIPIENTS]: state => state.checkoutData[RECIPIENTS] || [],
    [ADDRESSES]: state => state.checkoutData[ADDRESSES] || [],
    [PICKUP_POINTS]: state => state.checkoutData[PICKUP_POINTS] || [],

    [RECEIVE_METHODS]: state => state.checkoutData[RECEIVE_METHODS] || [],
    [PAYMENT_METHODS]: state => state.checkoutData[PAYMENT_METHODS] || [],

    [CONFIRMATION_TYPES]: state => state.checkoutData[CONFIRMATION_TYPES] || [],

    [DELIVERY_TYPES]: state => state.checkoutData[DELIVERY_TYPES] || [],

    [CHECKOUT_INPUT]: state => state.checkoutData.input || {},

    [DELIVERY_METHODS]: (state, getters) => {
        const receiveMethod = state.checkoutData.receiveMethods.find(m => m.id === getters[SELECTED_RECEIVE_METHOD_ID]);
        return receiveMethod ? receiveMethod.methods : [];
    },

    [SELECTED_RECEIVE_METHOD_ID]: state => state.checkoutData.input.receiveMethodID,
    [SELECTED_DELIVERY_METHOD_ID]: state => state.checkoutData.input.deliveryMethodID,
    [SELECTED_PAYMENT_METHOD_ID]: state => state.checkoutData.input.paymentMethodID,
    [SELECTED_CONFIRMATION_TYPE_ID]: state => state.checkoutData.input.confirmationTypeID,

    [SELECTED_RECIPIENT]: state => state.checkoutData.input.recipient,
    [SELECTED_ADDRESS]: state => state.checkoutData.input.address,
    [SELECTED_PICKUP_POINT]: state => state.checkoutData.input.pickupPoint,
    [SELECTED_DELIVERY_TYPE]: state => state.checkoutData.input.deliveryType,

    [BONUS]: state => state.checkoutData.input.bonus,
    [PROMO_CODE]: state => state.checkoutData.input.promocode,
    [SUBSCRIBE]: state => !!state.checkoutData.input.subscribe,
    [AGREEMENT]: state => !!state.checkoutData.input.agreement,
    [CERTIFICATES]: state => state.checkoutData.input.certificates || [],

    [SUMMARY]: state => state.checkoutData[SUMMARY],

    [CHECKOUT_STATUS]: state => state[CHECKOUT_STATUS] || {},
    [RECEIVE_METHOD_STATUS]: state => state[CHECKOUT_STATUS][RECEIVE_METHOD_STATUS] || requestStatus.SUCCESS,
    [ADDRESS_STATUS]: state => state[CHECKOUT_STATUS][ADDRESS_STATUS] || requestStatus.SUCCESS,
    [BONUS_STATUS]: state => state[CHECKOUT_STATUS][BONUS_STATUS] || requestStatus.SUCCESS,
    [CERTIFICATE_STATUS]: state => state[CHECKOUT_STATUS][CERTIFICATE_STATUS] || requestStatus.SUCCESS,
    [PROMOCODE_STATUS]: state => state[CHECKOUT_STATUS][PROMOCODE_STATUS] || requestStatus.SUCCESS,
};
