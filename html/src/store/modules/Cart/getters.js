import { $logger } from '@services';
import { cartItemTypes } from '@enums/product';
import { requestStatus } from '@enums';

export const GET_ITEMS_BY_TYPE = 'GET_ITEMS_BY_TYPE';
export const IS_PRODUCT = 'IS_PRODUCT';
export const IS_MASTER_CLASS = 'IS_MASTER_CLASS';
export const IS_IN_CART = 'IS_IN_CART';

export const PRODUCTS = 'products';
export const MASTER_CLASSES = 'masterClasses';
export const CART_TYPES = 'cartTypes';
export const CART_ITEMS_COUNT = 'cartItemsCount';
export const PRODUCT_ITEMS_SUM = 'productItemsSum';
export const PROMO_CODE = 'promocode';
export const DELIVERY_INFO = 'deliveryInfo';

export const PROMOCODE_STATUS = 'promocodeStatus';
export const CART_STATUS = 'cartStatus';

const itemTypes = Object.values(cartItemTypes);

function isValidType(type) {
    const isValid = itemTypes.some((t) => t === type);
    if (!isValid) $logger.warn(`Unknown cart item type ${type}`);
    return isValid;
}

export default {
    [PROMO_CODE]: (state) => state.cartData.product.input.promoCode,

    [DELIVERY_INFO]: (state) => state.cartData.deliveryInfo,

    [CART_ITEMS_COUNT]: (state, getters) => {
        const itemsCount = getters[CART_TYPES].reduce((accum, current) => {
            let count = 0;
            if (Array.isArray(current.items)) {
                for (let i = 0; i < current.items.length; i++) {
                    const item = current.items[i];
                    count += item.count;
                }
                return accum + count;
            }
            return accum;
        }, 0);
        return itemsCount;
    },

    [CART_TYPES]: (state) => {
        const types = itemTypes.reduce((accum, current) => {
            const type = state.cartData[current];
            if (type) accum.push(type);
            return accum;
        }, []);
        return types;
    },

    [PRODUCT_ITEMS_SUM]: (state) => {
        const productData = state.cartData[cartItemTypes.PRODUCT];
        if (productData) return productData.summary.total;
        return '';
    },

    [IS_IN_CART]: (state, getters) => (type, id) => {
        const data = state.cartData[type];
        return data && data.items.some((i) => i.p.id === id);
    },

    [IS_PRODUCT]: () => (item = {}) => isValidType(item.type) && item.type === cartItemTypes.PRODUCT,

    [IS_MASTER_CLASS]: () => (item = {}) => isValidType(item.type) && item.type === cartItemTypes.MASTERCLASS,

    [PROMOCODE_STATUS]: (state) => state[CART_STATUS][PROMOCODE_STATUS] || requestStatus.SUCCESS,
};
