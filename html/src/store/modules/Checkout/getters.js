export const PACKAGES_BY_TYPE = 'packagesByType';
export const ADDRESSES_BY_METHOD = 'addressesByMethod';
export const SERTIFICATES = 'sertificates';
export const BONUSES = 'bonuses';
export const CONFIRMATION_TYPE_ID = 'confirmationTypeID';
export const SUBSCRIBE = 'subscribe';
export const AGREEMENT = 'agreement';
export const CHECKOUT = 'checkout';
export const PROMO_CODE = 'promocode';

export default {
    [SERTIFICATES]: state => state.checkoutData[SERTIFICATES] || [],

    [BONUSES]: state => state.checkoutData[BONUSES] || [],

    [CONFIRMATION_TYPE_ID]: state => state.checkoutData[CONFIRMATION_TYPE_ID],

    [CHECKOUT]: state => state.checkoutData[CHECKOUT],

    [PROMO_CODE]: state => state.checkoutData[PROMO_CODE],

    [SUBSCRIBE]: state => state.checkoutData[SUBSCRIBE],

    [AGREEMENT]: state => state.checkoutData[AGREEMENT],

    [ADDRESSES_BY_METHOD]: state => state.addresses.find(p => p.methodID === state.checkoutData.deliveryMethodID) || {},

    [PACKAGES_BY_TYPE]: state => state.packages.find(p => p.typeID === state.checkoutData.deliveryTypeID) || {},
};
