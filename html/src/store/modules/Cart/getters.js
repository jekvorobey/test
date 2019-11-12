import { $logger } from '../../../services/ServiceLocator';
import { cartItemTypes } from '../../../assets/scripts/constants';

export const GET_ITEMS_BY_TYPE = 'GET_ITEMS_BY_TYPE';
export const IS_PRODUCT = 'IS_PRODUCT';
export const IS_MASTER_CLASS = 'IS_MASTER_CLASS';

export const PRODUCTS = 'products';
export const MASTER_CLASSES = 'masterClasses';
export const CART_ITEMS_COUNT = 'cartItemsCount';

const itemTypes = Object.values(cartItemTypes);

function isValidType(type) {
    const isValid = itemTypes.some(t => t === type);
    if (!isValid) $logger.warn(`Unknown cart item type ${type}`);
    return isValid;
}

export default {
    [GET_ITEMS_BY_TYPE]: state => type => (isValidType(type) ? state.cartItems.filter(i => i.type === type) : []),

    [PRODUCTS]: state => state.cartItems.filter(i => i.type === cartItemTypes.PRODUCT),

    [MASTER_CLASSES]: state => state.cartItems.filter(i => i.type === cartItemTypes.MASTERCLASS),

    [CART_ITEMS_COUNT]: state => {
        if (!state.cartItems || state.cartItems.length === 0) return 0;
        const count = state.cartItems.reduce((accum, current) => accum + current.count, 0);
        return count;
    },

    [IS_PRODUCT]: () => (item = {}) => isValidType(item.type) && item.type === cartItemTypes.PRODUCT,

    [IS_MASTER_CLASS]: () => (item = {}) => isValidType(item.type) && item.type === cartItemTypes.MASTERCLASS,
};
