import { requestStatus } from '@enums';
import { pointType } from '@enums/checkout';

const pickupPointTypes = [
    {
        id: pointType.TYPE_PICKUP_POINT,
        title: 'Пункт выдачи заказа',
    },
    {
        id: pointType.TYPE_POSTOMAT,
        title: 'Постомат',
    },
    {
        id: pointType.TYPE_RU_POST_OFFICE,
        title: 'Отделение почты России',
    },
    {
        id: pointType.SERVICE_TERMINAL,
        title: 'Терминал',
    },
];

const PROFESSIONS = 'professions';
const CHECKOUT_DATA = 'checkoutData';
const INPUT = 'input';

export const PROFESSIONS_MAP = 'professionsMap';

export const CERTIFICATES = 'certificates';
export const BONUS = 'bonus';

export const CHECKOUT_FIRST_LOADED = 'checkoutFirstLoaded';

export const SUBSCRIBE = 'subscribe';
export const AGREEMENT = 'agreement';
export const CHECKOUT = 'checkout';
export const PROMO_CODE = 'promocode';

export const BONUS_PAYMENT = 'bonusPayment';
export const BONUS_PER_RUB = 'bonusPerRub';
export const AVAILABLE_BONUS = 'availableBonus';
export const MAX_BONUS = 'maxBonus';
export const METRO_STATIONS = 'metroStations';
export const METRO_LINES = 'listMetroLines';
export const MAX_CERTIFICATE_DISCOUNT = 'maxCertificateDiscount';
export const RECIPIENTS = 'recipients';
export const ADDRESSES = 'addresses';
export const PICKUP_POINTS = 'pickupPoints';
export const PUBLIC_EVENTS = 'publicEvents';

export const CERTIFICATE_PAYMENT = 'certificatePayment';

export const RECEIVE_METHODS = 'receiveMethods';
export const PAYMENT_METHODS = 'paymentMethods';
export const DELIVERY_METHODS = 'deliveryMethods';

export const CONFIRMATION_TYPES = 'confirmationTypes';
export const DELIVERY_TYPES = 'deliveryTypes';
export const PICKUP_POINT_TYPES = 'pickupPointTypes';

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
export const PAYMENT_METHOD_STATUS = 'paymentMethodStatus';
export const BONUS_STATUS = 'bonusStatus';
export const CERTIFICATE_STATUS = 'certificateStatus';
export const PROMOCODE_STATUS = 'promocodeStatus';
export const TICKET_STATUS = 'ticketStatus';

export const SUMMARY = 'summary';

export const CITY_FIAS = 'cityFias';

export default {
    [PROFESSIONS_MAP]: (state) => {
        const professions = state[PROFESSIONS] || [];
        const map = {};

        // eslint-disable-next-line no-restricted-syntax
        for (const prof of professions) map[prof.id] = prof;
        return map;
    },

    [PICKUP_POINT_TYPES]: (state, getters) => {
        const pickupPoints = getters[PICKUP_POINTS] || [];
        const types = pickupPointTypes.filter((t) => pickupPoints.some((p) => p.methodID === t.id));
        return types;
    },

    [BONUS_PER_RUB]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][BONUS_PER_RUB]) || 0,
    [AVAILABLE_BONUS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][AVAILABLE_BONUS]) || 0,
    [MAX_BONUS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][MAX_BONUS]) || 0,
    [METRO_STATIONS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][METRO_STATIONS]) || 0,
    [METRO_LINES]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][METRO_LINES]) || 0,
    [MAX_CERTIFICATE_DISCOUNT]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][MAX_CERTIFICATE_DISCOUNT]) || 0,

    [RECIPIENTS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][RECIPIENTS]) || [],
    [ADDRESSES]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][ADDRESSES]) || [],
    [PICKUP_POINTS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][PICKUP_POINTS]) || [],
    [PUBLIC_EVENTS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][PUBLIC_EVENTS]) || [],

    [RECEIVE_METHODS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][RECEIVE_METHODS]) || [],
    [PAYMENT_METHODS]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][PAYMENT_METHODS]) || [],

    [CONFIRMATION_TYPES]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][CONFIRMATION_TYPES]) || [],

    [DELIVERY_TYPES]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][DELIVERY_TYPES]) || [],

    [CHECKOUT_INPUT]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT]) || {},

    [DELIVERY_METHODS]: (state, getters) => {
        const receiveMethod =
            state[CHECKOUT_DATA] &&
            state[CHECKOUT_DATA][RECEIVE_METHODS].find((m) => m.id === getters[SELECTED_RECEIVE_METHOD_ID]);
        return receiveMethod ? receiveMethod.methods : [];
    },

    [SELECTED_RECEIVE_METHOD_ID]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].receiveMethodID,
    [SELECTED_DELIVERY_METHOD_ID]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].deliveryMethodID,
    [SELECTED_PAYMENT_METHOD_ID]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].paymentMethodID,
    [SELECTED_CONFIRMATION_TYPE_ID]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].confirmationTypeID,

    [SELECTED_RECIPIENT]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].recipient,
    [SELECTED_ADDRESS]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].address,
    [SELECTED_PICKUP_POINT]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].pickupPoint,
    [SELECTED_DELIVERY_TYPE]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].deliveryType,

    [BONUS]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].bonus,
    [PROMO_CODE]: (state) => state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].promoCode,
    [SUBSCRIBE]: (state) => state[CHECKOUT_DATA] && !!state[CHECKOUT_DATA][INPUT].subscribe,
    [AGREEMENT]: (state) => state[CHECKOUT_DATA] && !!state[CHECKOUT_DATA][INPUT].agreement,
    [CERTIFICATES]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][INPUT].certificates) || [],

    [SUMMARY]: (state) => (state[CHECKOUT_DATA] && state[CHECKOUT_DATA][SUMMARY]) || {},

    [CITY_FIAS]: (state) => (state[CITY_FIAS]) || {},

    [BONUS_PAYMENT]: (state, getters) => {
        const { bonusSpent = 0 } = getters[SUMMARY];
        const bonusPerRub = getters[BONUS_PER_RUB]; // рубли за 1 бонус
        return bonusSpent * bonusPerRub;
    },
    [CERTIFICATE_PAYMENT]: (state, getters) => {
        const { certDiscount } = getters[SUMMARY];
        return certDiscount ? Math.abs(certDiscount.value) : 0
    },

    [CHECKOUT_STATUS]: (state) => state[CHECKOUT_STATUS] || {},
    [RECEIVE_METHOD_STATUS]: (state) => state[CHECKOUT_STATUS][RECEIVE_METHOD_STATUS] || requestStatus.SUCCESS,
    [ADDRESS_STATUS]: (state) => state[CHECKOUT_STATUS][ADDRESS_STATUS] || requestStatus.SUCCESS,
    [PAYMENT_METHOD_STATUS]: (state) => state[CHECKOUT_STATUS][PAYMENT_METHOD_STATUS] || requestStatus.SUCCESS,
    [BONUS_STATUS]: (state) => state[CHECKOUT_STATUS][BONUS_STATUS] || requestStatus.SUCCESS,
    [CERTIFICATE_STATUS]: (state) => state[CHECKOUT_STATUS][CERTIFICATE_STATUS] || requestStatus.SUCCESS,
    [PROMOCODE_STATUS]: (state) => state[CHECKOUT_STATUS][PROMOCODE_STATUS] || requestStatus.SUCCESS,
    [TICKET_STATUS]: (state) => state[CHECKOUT_STATUS][TICKET_STATUS] || requestStatus.SUCCESS,
};
