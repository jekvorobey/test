import hasSession from '@router/middleware/hasSession';
import canUserBuy from '@router/middleware/canUserBuy';

/**
 * @Module
 */

const FavoritesAsync = () => import(/* webpackChunkName: "cart-view" */ './Favorites.vue');

/**
 * Модуль компонента Favorites
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Favorites',
            path: '/favorites',
            component: FavoritesAsync,

            meta: {
                middleware: [hasSession, canUserBuy],
            },
        },
    ],
};
