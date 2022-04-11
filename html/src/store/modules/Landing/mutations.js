import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes } from '@enums/product';
import { bannerType } from '@enums';

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
export const SET_SEO = 'SET_SEO';

function generateUniqueId(existsIds = []) {
    const min = Math.ceil(1);
    const max = Math.floor(1000);

    for (let i = 1; i <= max; i++) {
        const id = Math.floor(Math.random() * (max - min)) + min;

        if (existsIds.indexOf(id) === -1) {
            return id;
        }
    }

    throw new Error('Can not generate unique id');
}

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

    [SET_SEO](state, payload) {
        state.seo = payload;
    },

    [SET_LOAD](state, payload) {
        state.load = payload;

        const sections = [];

        if (state.banners.filter((b) => b.type === bannerType.MAIN_TOP).length > 0) {
            sections.push({
                component: 'slider-banners-section',
                data: {
                    banners: state.banners.filter((b) => b.type === bannerType.MAIN_TOP),
                },
            });
        }

        sections.push({
            component: 'categories-section',
            data: {
                categories: state.frequentCategories,
            },
        });

        sections.push({
            component: 'separator-section',
        });

        sections.push({
            component: 'retail-rocket-recom-section',
        });

        sections.push({
            component: 'retail-rocket-hits-section',
        });

        sections.push({
            component: 'products-section',
            data: {
                titleText: 'Новинки',
                inverse: true,
                ...state.newProducts,
            },
        });

        if (state.banners.filter((b) => b.id === 'middleBanner').length > 0) {
            sections.push({
                component: 'separator-section',
            });

            sections.push({
                component: 'single-banner-section',
                data: {
                    banner: state.banners.find((b) => b.id === 'middleBanner'),
                },
            });
        }

        sections.push({
            component: 'separator-section',
        });

        sections.push({
            component: 'products-section',
            data: {
                titleText: 'Бестселлеры',
                ...state.bestsellerProducts,
            },
        });

        sections.push({
            component: 'separator-section',
        });

        sections.push({
            component: 'list-banners-section',
            data: {
                banners: state.catalogLatestSets,
            },
        });

        sections.push({
            component: 'brands-section',
            data: {
                titleText: 'Популярные бренды',
                items: state.brands,
                restCount: 16,
                btnText: `Показать все ${state.brands.length} брендов`,
            },
        });

        sections.push({
            component: 'instagram-section',
            data: {
                id: 'frisbuy-widget2',
                script: 'https://www.frisbuy.ru/fb/widget?embed_id=ee1f1d2e-9f30-11ea-ba01-0242ac150002',
            },
        });

        state.renderData = sections.map((section) => {
            return Object.assign(section, {
                id: generateUniqueId(state.renderData.map((renderDataItem) => renderDataItem.id)),
            });
        });
    },

    [SET_BRANDS_SET](state, payload) {
        state.bannersSet = payload;
    },

    [SET_CATALOG_LATEST_SETS](state, payload) {
        state.catalogLatestSets = payload;
    },
};
