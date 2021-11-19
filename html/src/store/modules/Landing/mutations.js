import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes } from '@enums/product';

export const SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS';
export const SET_BESTSELLER_PRODUCTS = 'SET_BESTSELLER_PRODUCTS';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_LOAD = 'SET_LOAD';
export const SET_BRANDS_SET = 'SET_BRANDS_SET';
export const SET_FREQUENT_CATEGORIES = 'SET_FREQUENT_CATEGORIES';
export const SET_CATALOG_LATEST_SETS = 'SET_CATALOG_LATEST_SETS';

export default {
    [SET_BRANDS](state, payload) {
        const brands = payload.map((item) => ({
            ...item,
            href: generateCategoryUrl(productGroupTypes.BRANDS, item.code),
        }));
        state.brands = brands;
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

    [SET_FREQUENT_CATEGORIES](state, payload) {
        state.frequentCategories = payload;
    },

    [SET_LOAD](state, payload) {
        state.load = payload;
        state.renderData = [
            {
                id: 1,
                component: 'slider-banners-section',
                data: {
                    banners: state.banners.filter((b) => b.id === 'mainBanner' || b.id === 'T-Lab'),
                },
            },
            {
                id: 2,
                component: 'categories-section',
                data: {
                    categories: state.frequentCategories,
                },
            },
            {
                id: 3,
                component: 'separator-section',
            },
            {
                id: 4,
                component: 'retail-rocket-recom-section',
            },
            {
                id: 5,
                component: 'retail-rocket-hits-section',
            },
            {
                id: 6,
                component: 'products-section',
                data: {
                    titleText: 'Новинки',
                    inverse: true,
                    ...state.newProducts,
                },
            },
            {
                id: 7,
                component: 'separator-section',
            },
            {
                id: 8,
                component: 'single-banner-section',
                data: {
                    banner: state.banners.find((b) => b.id === 'middleBanner'),
                },
            },
            {
                id: 9,
                component: 'separator-section',
            },
            {
                id: 10,
                component: 'products-section',
                data: {
                    titleText: 'Бестселлеры',
                    ...state.bestsellerProducts,
                },
            },
            {
                id: 11,
                component: 'separator-section',
            },
            {
                id: 12,
                component: 'list-banners-section',
                data: {
                    banners: state.catalogLatestSets,
                },
            },
            // {
            //     id: 14,
            //     component: 'products-section',
            //     data: {
            //         titleText: 'Смотрят на сайте сейчас',
            //         ...state.featuredProducts,
            //     },
            // },
            {
                id: 15,
                component: 'brands-section',
                data: {
                    titleText: 'Популярные бренды',
                    items: state.brands,
                    restCount: 16,
                    btnText: `Показать все ${state.brands.length} брендов`,
                },
            },
            {
                id: 16,
                component: 'instagram-section',
                data: {
                    id: 'frisbuy-widget2',
                    script: 'https://www.frisbuy.ru/fb/widget?embed_id=ee1f1d2e-9f30-11ea-ba01-0242ac150002',
                },
            },
        ];
    },

    [SET_BRANDS_SET](state, payload) {
        state.bannersSet = payload;
    },

    [SET_CATALOG_LATEST_SETS](state, payload) {
        state.catalogLatestSets = payload;
    },
};
