export const SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS';
export const SET_BESTSELLER_PRODUCTS = 'SET_BESTSELLER_PRODUCTS';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_INSTAGRAM = 'SET_INSTAGRAM';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_INSTAGRAM](state, payload) {
        state.instagramItems = payload;
    },

    [SET_BRANDS](state, payload) {
        state.brands = payload;
    },

    [SET_BANNERS](state, payload) {
        state.banners = payload;
    },

    [SET_NEW_PRODUCTS](state, payload) {
        state.newProducts = payload;
    },

    [SET_BESTSELLER_PRODUCTS](state, payload) {
        state.bestsellerProducts = payload;
    },

    [SET_FEATURED_PRODUCTS](state, payload) {
        state.featuredProducts = payload;
    },

    [SET_CATEGORIES](state, payload) {
        state.categories = payload;
    },

    [SET_LOAD](state, payload) {
        state.load = payload;
        state.renderData = [
            {
                id: 1,
                component: 'slider-banners-section',
                data: {
                    banners: state.banners.filter((b) => b.id === 'mainBanner'),
                },
            },
            {
                id: 2,
                component: 'categories-section',
                data: {
                    categories: state.categories,
                },
            },
            {
                id: 3,
                component: 'separator-section',
            },
            {
                id: 4,
                component: 'products-section',
                data: {
                    titleText: 'Новинки',
                    inverse: true,
                    ...state.newProducts,
                },
            },
            {
                id: 5,
                component: 'separator-section',
            },
            {
                id: 6,
                component: 'single-banner-section',
                data: {
                    banner: state.banners.find((b) => b.id === 'middleBanner'),
                },
            },
            {
                id: 7,
                component: 'separator-section',
            },
            {
                id: 8,
                component: 'products-section',
                data: {
                    titleText: 'Бестселлеры',
                    ...state.bestsellerProducts,
                },
            },
            {
                id: 9,
                component: 'separator-section',
            },
            {
                id: 10,
                component: 'list-banners-section',
                data: {
                    banners: state.banners.slice(3, 6),
                },
            },
            {
                id: 11,
                component: 'separator-section',
            },
            // {
            //     id: 12,
            //     component: 'products-section',
            //     data: {
            //         titleText: 'Смотрят на сайте сейчас',
            //         ...state.featuredProducts,
            //     },
            // },
            {
                id: 13,
                component: 'brands-section',
                data: {
                    titleText: 'Популярные бренды',
                    items: state.brands,
                    restCount: 10,
                    btnText: 'Показать',
                },
            },
            {
                id: 14,
                component: 'instagram-section',
                data: {
                    titleText: 'Instabeauty',
                    items: state.instagramItems,
                    btnText: 'Подписаться на нас',
                },
            },
        ];
    },
};
