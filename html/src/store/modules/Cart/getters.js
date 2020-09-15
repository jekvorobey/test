import { cartItemTypes } from '@enums/product';
import { requestStatus } from '@enums';
import { generateProductUrl, generateMasterclassUrl } from '@util/catalog';

export const GET_ITEMS_BY_TYPE = 'GET_ITEMS_BY_TYPE';
export const IS_PRODUCT = 'IS_PRODUCT';
export const IS_MASTER_CLASS = 'IS_MASTER_CLASS';
export const IS_IN_CART = 'IS_IN_CART';

export const CART_TYPES = 'cartTypes';
export const CART_ITEMS = 'cartItems';
export const CART_ITEMS_COUNT = 'cartItemsCount';
export const PRODUCT_ITEMS_SUM = 'productItemsSum';
export const PROMO_CODE = 'promocode';
export const DELIVERY_INFO = 'deliveryInfo';
export const ERRORS = 'errors';
export const WARNINGS = 'warnings';

export const PROMOCODE_STATUS = 'promocodeStatus';
export const CART_STATUS = 'cartStatus';

const itemTypes = Object.values(cartItemTypes);

function prepareItem(item) {
    const { p } = item;

    switch (item.type) {
        case cartItemTypes.PRODUCT: {
            const categoryCode = Array.isArray(p.categoryCodes) && p.categoryCodes[p.categoryCodes.length - 1];
            const url = generateProductUrl(categoryCode, p.code);
            return { ...item, p: { ...p, url } };
        }

        case cartItemTypes.MASTERCLASS: {
            const url = generateMasterclassUrl(p.code);
            const note = p.ticketTypeName;
            return { ...item, p: { ...p, url, note } };
        }
        default:
            return item;
    }
}

export default {
    [ERRORS]: (state) => (state.cartData && state.cartData[ERRORS]) || [],

    [WARNINGS]: (state) => (state.cartData && state.cartData[WARNINGS]) || [],

    [PROMO_CODE]: (state) => state.cartData.product && state.cartData.product.input.promoCode,

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

    [CART_ITEMS]: (state, getters) => {
        const cartTypes = getters[CART_TYPES] || [];
        const items = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const type of cartTypes) items.push(...type.items);
        return items.map(prepareItem);
    },

    [PRODUCT_ITEMS_SUM]: (state, getters) => {
        const cartTypes = getters[CART_TYPES] || [];

        const sum = cartTypes.reduce(
            (accum, current) => {
                accum.value += current.summary.total.value;
                accum.currency = current.summary.total.currency;
                return accum;
            },
            { value: 0, currency: 'RUB' }
        );
        return sum;
    },

    [IS_IN_CART]: (state) => (type, id) => {
        const data = state.cartData[type];
        return data && data.items.some((i) => i.p.id === id);
    },

    [IS_PRODUCT]: () => (item = {}) => item.type === cartItemTypes.PRODUCT,

    [IS_MASTER_CLASS]: () => (item = {}) => item.type === cartItemTypes.MASTERCLASS,

    [PROMOCODE_STATUS]: (state) => state[CART_STATUS][PROMOCODE_STATUS] || requestStatus.SUCCESS,
};
