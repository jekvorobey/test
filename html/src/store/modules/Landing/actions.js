import bestsellerDesktopImg from '@images/mock/bestsellers/bDesktop5.jpg';
import bestsellerTabletImg from '@images/mock/bestsellers/bTablet5.jpg';
import bestsellerMobileImg from '@images/mock/bestsellers/bMobile5.jpg';
import bestsellerDesktopImgRetina from '@images/mock/bestsellers/bDesktop5@2x.jpg';
import bestsellerTabletImgRetina from '@images/mock/bestsellers/bTablet5@2x.jpg';
import bestsellerMobileImgRetina from '@images/mock/bestsellers/bMobile5@2x.jpg';

import newDesktopImg from '@images/mock/new/newDesktop5.jpg';
import newTabletImg from '@images/mock/new/newTablet5.jpg';
import newMobileImg from '@images/mock/new/newMobile5.jpg';
import newDesktopImgRetina from '@images/mock/new/newDesktop5@2x.jpg';
import newTabletImgRetina from '@images/mock/new/newTablet5@2x.jpg';
import newMobileImgRetina from '@images/mock/new/newMobile5@2x.jpg';

import middleDesktopImg from '@images/mock/middle/middleDesktop5.jpg';
import middleTabletImg from '@images/mock/middle/middleTablet5.jpg';
import middleMobileImg from '@images/mock/middle/middleMobile5.jpg';
import middleDesktopImgRetina from '@images/mock/middle/middleDesktop5@2x.jpg';
import middleTabletImgRetina from '@images/mock/middle/middleTablet5@2x.jpg';
import middleMobileImgRetina from '@images/mock/middle/middleMobile5@2x.jpg';

import mainDesktopImg from '@images/mock/main/mainDesktop5.jpg';
import mainTabletImg from '@images/mock/main/mainTablet5.jpg';
import mainMobileImg from '@images/mock/main/mainMobile5.jpg';
import mainDesktopImgRetina from '@images/mock/main/mainDesktop5@2x.jpg';
import mainTabletImgRetina from '@images/mock/main/mainTablet5@2x.jpg';
import mainMobileImgRetina from '@images/mock/main/mainMobile5@2x.jpg';

import { $logger } from '@services';
import {
    getProducts,
    getProductsHot,
    getCategories,
    getBanners,
    getBrands,
    getInstagram,
    getBannersByCode,
    getProductGroups,
    getFrequentCategories,
    getCatalogLatestSets,
} from '@api';

import {
    SET_BESTSELLER_PRODUCTS,
    SET_NEW_PRODUCTS,
    SET_FEATURED_PRODUCTS,
    SET_CATEGORIES,
    SET_BANNERS,
    SET_BRANDS,
    SET_INSTAGRAM,
    SET_LOAD,
    SET_BRANDS_SET,
    SET_FREQUENT_CATEGORIES,
    SET_CATALOG_LATEST_SETS,
} from './mutations';
import { storeErrorHandler } from '@util/store';
import { generatePictureSourcePath } from '@util/file';
import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes, productBadges } from '@enums/product';

export const FETCH_LANDING_DATA = 'FETCH_LANDING_DATA';
export const FETCH_NEW_PRODUCTS = 'FETCH_NEW_PRODUCTS';
export const FETCH_BESTSELLER_PRODUCTS = 'FETCH_BESTSELLER_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const FETCH_INSTAGRAM = 'FETCH_INSTAGRAM';
export const FETCH_BANNERS_SET = 'FETCH_BANNERS_SET';
export const FETCH_FREQUENT_CATEGOIRES = 'FETCH_FREQUENT_CATEGOIRES';
export const FETCH_CATALOG_LATEST_SETS = 'FETCH_CATALOG_LATEST_SETS';

export default {
    [FETCH_INSTAGRAM]({ commit }) {
        return getInstagram()
            .then((data) => commit(SET_INSTAGRAM, data))
            .catch((error) => {
                $logger.error(`FETCH_INSTAGRAM error: ${error}`);
                return [];
            });
    },

    async [FETCH_BRANDS]({ commit }) {
        try {
            const data = await getBrands();
            commit(SET_BRANDS, data);
        } catch(error) {
            storeErrorHandler(SET_BRANDS);
        }
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
                        externalUrl: 'https://www.instagram.com/bessovestnotalantlivy/',
                        text: 'Подписаться',
                        location: 'bottom_left',
                        type: 'white',
                    },
                    desktopImage: middleDesktopImg,
                    desktopImageRetina: middleDesktopImgRetina,
                    tabletImage: middleTabletImg,
                    tabletImageRetina: middleTabletImgRetina,
                    mobileImage: middleMobileImg,
                    mobileImageRetina: middleMobileImgRetina,
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
                        authLink: 'Cabinet',
                    },
                    desktopImage: mainDesktopImg,
                    desktopImageRetina: mainDesktopImgRetina,
                    tabletImage: mainTabletImg,
                    tabletImageRetina: mainTabletImgRetina,
                    mobileImage: mainMobileImg,
                    mobileImageRetina: mainMobileImgRetina,
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

    async [FETCH_BANNERS_SET]({ commit }) {
        try {
            const type = productGroupTypes.SETS;
            const page = 1;
            const orderField = 'name';

            const { items } = await getProductGroups(type, page, orderField);
            const data = items ? items : [];
            commit(SET_BRANDS_SET, data);
        } catch (error) {
            storeErrorHandler(FETCH_BANNERS_SET)(error);
        }
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
                        desktopImageRetina: middleDesktopImgRetina,
                        tabletImage: middleTabletImg,
                        tabletImageRetina: middleTabletImgRetina,
                        mobileImage: middleMobileImg,
                        mobileImageRetina: middleMobileImgRetina,
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

    async [FETCH_NEW_PRODUCTS]({ commit }) {
        try {
            const { items } = await getProductsHot(productBadges.NEW, 4);

            commit(SET_NEW_PRODUCTS, {
                items,
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
                    desktopImageRetina: newDesktopImgRetina,
                    tabletImage: newTabletImg,
                    tabletImageRetina: newTabletImgRetina,
                    mobileImage: newMobileImg,
                    mobileImageRetina: newMobileImgRetina,
                },
                btnText: 'Смотреть все',
                btnLink: '/new',
            });
        } catch (error) {
            storeErrorHandler(FETCH_NEW_PRODUCTS)(error);
            return [];
        }
    },

    async [FETCH_BESTSELLER_PRODUCTS]({ commit }, payload = {}) {
        try {
            const { items } = await getProductsHot(productBadges.BESTSELLERS, 4);

            commit(SET_BESTSELLER_PRODUCTS, {
                items,
                banner: {
                    id: 'bestsellersBanner',
                    name: '',
                    type: 'banner',
                    button: {
                        id: 2,
                        url: '/bestsellers',
                        text: 'Посмотреть',
                        location: 'bottom',
                        type: 'white',
                    },
                    desktopImage: bestsellerDesktopImg,
                    desktopImageRetina: bestsellerDesktopImgRetina,
                    tabletImage: bestsellerTabletImg,
                    tabletImageRetina: bestsellerTabletImgRetina,
                    mobileImage: bestsellerMobileImg,
                    mobileImageRetina: bestsellerMobileImgRetina,
                },
                btnText: 'Смотреть все',
                btnLink: '/bestsellers',
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

    async [FETCH_FREQUENT_CATEGOIRES]({ commit }) {
        try {
            const data = await getFrequentCategories();
            commit(SET_FREQUENT_CATEGORIES, data);
        } catch (error) {
            storeErrorHandler(FETCH_FREQUENT_CATEGOIRES)(error);
            return [];
        }
    },

    async [FETCH_CATALOG_LATEST_SETS]({ commit }) {
        try {
            const { items } = await getCatalogLatestSets();
            commit(
                SET_CATALOG_LATEST_SETS,
                items.map((item) => ({
                    ...item,
                    image: generatePictureSourcePath(null, null, item.image),
                    href: generateCategoryUrl(productGroupTypes.SETS, item.code),
                }))
            );
        } catch (error) {
            storeErrorHandler(FETCH_CATALOG_LATEST_SETS)(error);
        }
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
            dispatch(FETCH_BANNERS_SET),
            dispatch(FETCH_FREQUENT_CATEGOIRES),
            dispatch(FETCH_CATALOG_LATEST_SETS),
        ]).then(() => commit(SET_LOAD, true));
    },
};
