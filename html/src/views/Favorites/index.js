import hasSession from '@router/middleware/hasSession';

/**
 * @Module
 */

const FavoritesAsync = () => import(/* webpackChunkName: "favorites-view" */ './Favorites.vue');

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
                middleware: [hasSession],
                skipScroll: true,
            },
        },
    ],
};
