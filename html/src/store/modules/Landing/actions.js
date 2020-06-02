import bestsellerDesktopImg from '@images/mock/bestsellers/bDesktop3.jpg';
import bestsellerTabletImg from '@images/mock/bestsellers/bTablet3.jpg';
import bestsellerMobileImg from '@images/mock/bestsellers/bMobile3.jpg';

import newDesktopImg from '@images/mock/new/newDesktop3.jpg';
import newTabletImg from '@images/mock/new/newTablet3.jpg';
import newMobileImg from '@images/mock/new/newMobile3.jpg';

import middleDesktopImg from '@images/mock/middle/middleDesktop3.jpg';
import middleTabletImg from '@images/mock/middle/middleTablet3.jpg';
import middleMobileImg from '@images/mock/middle/middleMobile3.jpg';

import mainDesktopImg from '@images/mock/main/mainDesktop3.jpg';
import mainTabletImg from '@images/mock/main/mainTablet3.jpg';
import mainMobileImg from '@images/mock/main/mainMobile3.jpg';

import { $logger } from '@services';
import { getProducts, getCategories, getBanners, getBrands, getInstagram, getBannersByCode } from '@api';
import {
    SET_BESTSELLER_PRODUCTS,
    SET_NEW_PRODUCTS,
    SET_FEATURED_PRODUCTS,
    SET_CATEGORIES,
    SET_BANNERS,
    SET_BRANDS,
    SET_INSTAGRAM,
    SET_LOAD,
} from './mutations';
import { storeErrorHandler } from '@util/store';

export const FETCH_LANDING_DATA = 'FETCH_LANDING_DATA';
export const FETCH_NEW_PRODUCTS = 'FETCH_NEW_PRODUCTS';
export const FETCH_BESTSELLER_PRODUCTS = 'FETCH_BESTSELLER_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const FETCH_INSTAGRAM = 'FETCH_INSTAGRAM';

export default {
    [FETCH_INSTAGRAM]({ commit }) {
        return getInstagram()
            .then((data) => commit(SET_INSTAGRAM, data))
            .catch((error) => {
                $logger.error(`FETCH_INSTAGRAM error: ${error}`);
                return [];
            });
    },

    [FETCH_BRANDS]({ commit }) {
        return getBrands()
            .then((data) => commit(SET_BRANDS, data))
            .catch((error) => {
                $logger.error(`FETCH_BRANDS error: ${error}`);
                return [];
            });
    },

    async [FETCH_BANNERS]({ commit }) {
        try {
            const data = await getBanners();
            commit(SET_BANNERS, [
                ...data,
                {
                    id: 'middleBanner',
                    name: '',
                    type: 'banner',
                    button: {
                        id: 2,
                        url: '/404',
                        text: 'Подписаться',
                        location: 'bottom_left',
                        type: 'white',
                    },
                    desktopImage: middleDesktopImg,
                    tabletImage: middleTabletImg,
                    mobileImage: middleMobileImg,
                },
                {
                    id: 'mainBanner',
                    name: '',
                    type: 'banner',
                    button: {
                        id: 2,
                        url: '/?registration=true',
                        text: 'Присоединиться',
                        location: 'bottom_right',
                        type: 'white',
                    },
                    desktopImage: mainDesktopImg,
                    tabletImage: mainTabletImg,
                    mobileImage: mainMobileImg,
                },
            ]);
        } catch (error) {
            storeErrorHandler(FETCH_BANNERS)(error);
            return [];
        }
    },

    [FETCH_CATEGORIES]({ commit }) {
        return getCategories()
            .then((data) => commit(SET_CATEGORIES, data))
            .catch((error) => {
                $logger.error(`FETCH_CATEGORIES error: ${error}`);
                return [];
            });
    },

    [FETCH_FEATURED_PRODUCTS]({ commit }, payload = {}) {
        return Promise.all([getProducts(payload), getBannersByCode('header', true)])
            .then((data) => {
                commit(SET_FEATURED_PRODUCTS, {
                    items: data[0] ? data[0].items.slice(8, 12) : [],
                    banner: {
                        id: 'middleBanner',
                        name: '',
                        type: 'banner',
                        button: {
                            id: 2,
                            url: '/404',
                            text: 'Подписаться',
                            location: 'bottom',
                            type: 'white',
                        },
                        desktopImage: middleDesktopImg,
                        tabletImage: middleTabletImg,
                        mobileImage: middleMobileImg,
                    },
                });
            })
            .catch((error) => {
                $logger.error(`FETCH_FEATURED_PRODUCTS error: ${error}`);
                return [];
            });

        // return Promise.all([getProducts(payload), getBannersByCode('header', true)])
        //     .then(data => {
        //         commit(SET_FEATURED_PRODUCTS, {
        //             items: data[0] ? data[0].items.slice(8, 12) : [],
        //             banner: data[1],
        //         });
        //     })
        //     .catch(error => {
        //         $logger.error(`FETCH_FEATURED_PRODUCTS error: ${error}`);
        //         return [];
        //     });
    },

    async [FETCH_NEW_PRODUCTS]({ commit }, payload = {}) {
        try {
            const data = await getProducts(payload);
            commit(SET_NEW_PRODUCTS, {
                items: data ? data.items.slice(4, 8) : [],
                banner: {
                    id: 'newBanner',
                    name: '',
                    type: 'banner',
                    button: {
                        id: 2,
                        url: '/sets/hair_20/',
                        text: 'Посмотреть',
                        location: 'bottom',
                        type: 'white',
                    },
                    desktopImage: newDesktopImg,
                    tabletImage: newTabletImg,
                    mobileImage: newMobileImg,
                },
            });
        } catch (error) {
            storeErrorHandler(FETCH_NEW_PRODUCTS)(error);
            return [];
        }
    },

    async [FETCH_BESTSELLER_PRODUCTS]({ commit }, payload = {}) {
        try {
            const data = await getProducts(payload);
            commit(SET_BESTSELLER_PRODUCTS, {
                items: data ? data.items.slice(4, 8) : [],
                banner: {
                    id: 'newBanner',
                    name: '',
                    type: 'banner',
                    button: {
                        id: 2,
                        url: '/sets/hair_best/',
                        text: 'Посмотреть',
                        location: 'bottom',
                        type: 'white',
                    },
                    desktopImage: bestsellerDesktopImg,
                    tabletImage: bestsellerTabletImg,
                    mobileImage: bestsellerMobileImg,
                },
            });
        } catch (error) {
            storeErrorHandler(FETCH_BESTSELLER_PRODUCTS)(error);
            return [];
        }
        // return Promise.all([getProducts(payload), getBannersByCode('header', true)])
        //     .then((data) => {
        //         commit(SET_BESTSELLER_PRODUCTS, {
        //             items: data[0] ? data[0].items.slice(4, 8) : [],
        //             banner: data[1],
        //         });
        //     })
        //     .catch((error) => {
        //         $logger.error(`FETCH_BESTSELLER_PRODUCTS error: ${error}`);
        //         return [];
        //     });
    },

    [FETCH_LANDING_DATA]({ dispatch, commit }) {
        return Promise.all([
            dispatch(FETCH_NEW_PRODUCTS),
            dispatch(FETCH_BESTSELLER_PRODUCTS),
            // dispatch(FETCH_FEATURED_PRODUCTS),
            dispatch(FETCH_CATEGORIES),
            dispatch(FETCH_BANNERS),
            dispatch(FETCH_BRANDS),
            dispatch(FETCH_INSTAGRAM),
        ]).then(() => commit(SET_LOAD, true));
    },
};
