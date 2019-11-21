export const DELIVERY_TYPES_MAP = 'deliveryTypesMap';
export const SERTIFICATES = 'sertificates';
export const BONUSES = 'bonuses';
export const CONFIRMATION_TYPE_ID = 'confirmationTypeID';
export const SUBSCRIBE = 'subscribe';
export const AGREEMENT = 'agreement';
export const CHECKOUT = 'checkout';
export const PROMO_CODE = 'promocode';

export default {
    [DELIVERY_TYPES_MAP]: state =>
        state.deliveryTypes.reduce((accum, current) => {
            accum[current.id] = current;
            return accum;
        }, {}),

    [SERTIFICATES]: state => state.checkoutData[SERTIFICATES] || [],

    [BONUSES]: state => state.checkoutData[BONUSES] || [],

    [CONFIRMATION_TYPE_ID]: state => state.checkoutData[CONFIRMATION_TYPE_ID],

    [CHECKOUT]: state => state.checkoutData[CHECKOUT],

    [PROMO_CODE]: state => state.checkoutData[PROMO_CODE],

    [SUBSCRIBE]: state => state.checkoutData[SUBSCRIBE],

    [AGREEMENT]: state => state.checkoutData[AGREEMENT],
};
