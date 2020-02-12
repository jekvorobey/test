import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { CART_ITEMS_COUNT } from '../../store/modules/Cart/getters';

export default function isCartEmpty({ next, store }) {
    const itemsCount = store.getters[`${CART_MODULE}/${CART_ITEMS_COUNT}`];
    if (itemsCount === 0) {
        return next({
            path: '/',
            replace: true,
        });
    }

    return next();
}
