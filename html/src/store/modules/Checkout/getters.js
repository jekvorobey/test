export const PACKAGES_BY_TYPE = 'packagesByType';
export const ADDRESSES_BY_METHOD = 'addressesByMethod';
export const IS_DELIVERY = 'isDelivery';

export default {
    [ADDRESSES_BY_METHOD]: state => state.addresses.find(p => p.methodID === state.checkoutData.deliveryMethodID) || {},

    [PACKAGES_BY_TYPE]: state => state.packages.find(p => p.typeID === state.checkoutData.deliveryTypeID) || {},
};
