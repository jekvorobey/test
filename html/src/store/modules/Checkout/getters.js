import { requestStatus } from '@enums';

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

export default {
    [AVAILABLE_BONUS]: (state) => (state.checkoutData && state.checkoutData[AVAILABLE_BONUS]) || [],

    [RECIPIENTS]: (state) => (state.checkoutData && state.checkoutData[RECIPIENTS]) || [],
    [ADDRESSES]: (state) => (state.checkoutData && state.checkoutData[ADDRESSES]) || [],
    [PICKUP_POINTS]: (state) => (state.checkoutData && state.checkoutData[PICKUP_POINTS]) || [],

    [RECEIVE_METHODS]: (state) => (state.checkoutData && state.checkoutData[RECEIVE_METHODS]) || [],
    [PAYMENT_METHODS]: (state) => (state.checkoutData && state.checkoutData[PAYMENT_METHODS]) || [],

    [CONFIRMATION_TYPES]: (state) => (state.checkoutData && state.checkoutData[CONFIRMATION_TYPES]) || [],

    [DELIVERY_TYPES]: (state) => (state.checkoutData && state.checkoutData[DELIVERY_TYPES]) || [],

    [CHECKOUT_INPUT]: (state) => (state.checkoutData && state.checkoutData.input) || {},

    [DELIVERY_METHODS]: (state, getters) => {
        const receiveMethod =
            state.checkoutData &&
            state.checkoutData.receiveMethods.find((m) => m.id === getters[SELECTED_RECEIVE_METHOD_ID]);
        return receiveMethod ? receiveMethod.methods : [];
    },

    [SELECTED_RECEIVE_METHOD_ID]: (state) => state.checkoutData && state.checkoutData.input.receiveMethodID,
    [SELECTED_DELIVERY_METHOD_ID]: (state) => state.checkoutData && state.checkoutData.input.deliveryMethodID,
    [SELECTED_PAYMENT_METHOD_ID]: (state) => state.checkoutData && state.checkoutData.input.paymentMethodID,
    [SELECTED_CONFIRMATION_TYPE_ID]: (state) => state.checkoutData && state.checkoutData.input.confirmationTypeID,

    [SELECTED_RECIPIENT]: (state) => state.checkoutData && state.checkoutData.input.recipient,
    [SELECTED_ADDRESS]: (state) => state.checkoutData && state.checkoutData.input.address,
    [SELECTED_PICKUP_POINT]: (state) => state.checkoutData && state.checkoutData.input.pickupPoint,
    [SELECTED_DELIVERY_TYPE]: (state) => state.checkoutData && state.checkoutData.input.deliveryType,

    [BONUS]: (state) => state.checkoutData && state.checkoutData.input.bonus,
    [PROMO_CODE]: (state) => state.checkoutData && state.checkoutData.input.promoCode,
    [SUBSCRIBE]: (state) => state.checkoutData && !!state.checkoutData.input.subscribe,
    [AGREEMENT]: (state) => state.checkoutData && !!state.checkoutData.input.agreement,
    [CERTIFICATES]: (state) => (state.checkoutData && state.checkoutData.input.certificates) || [],

    [SUMMARY]: (state) => (state.checkoutData && state.checkoutData[SUMMARY]) || {},

    [CHECKOUT_STATUS]: (state) => state[CHECKOUT_STATUS] || {},
    [RECEIVE_METHOD_STATUS]: (state) => state[CHECKOUT_STATUS][RECEIVE_METHOD_STATUS] || requestStatus.SUCCESS,
    [ADDRESS_STATUS]: (state) => state[CHECKOUT_STATUS][ADDRESS_STATUS] || requestStatus.SUCCESS,
    [BONUS_STATUS]: (state) => state[CHECKOUT_STATUS][BONUS_STATUS] || requestStatus.SUCCESS,
    [CERTIFICATE_STATUS]: (state) => state[CHECKOUT_STATUS][CERTIFICATE_STATUS] || requestStatus.SUCCESS,
    [PROMOCODE_STATUS]: (state) => state[CHECKOUT_STATUS][PROMOCODE_STATUS] || requestStatus.SUCCESS,
};
