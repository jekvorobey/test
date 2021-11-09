import bestsellerDesktopImg from '@images/mock/bestsellers/bDesktop6.jpg';
import bestsellerTabletImg from '@images/mock/bestsellers/bTablet6.jpg';
import bestsellerMobileImg from '@images/mock/bestsellers/bMobile6.jpg';
import bestsellerDesktopImgRetina from '@images/mock/bestsellers/bDesktop6@2x.jpg';
import bestsellerTabletImgRetina from '@images/mock/bestsellers/bTablet6@2x.jpg';
import bestsellerMobileImgRetina from '@images/mock/bestsellers/bMobile6@2x.jpg';

// import newDesktopImg from '@images/mock/new/newDesktop6.jpg';
// import newTabletImg from '@images/mock/new/newTablet6.jpg';
// import newMobileImg from '@images/mock/new/newMobile6.jpg';
// import newDesktopImgRetina from '@images/mock/new/newDesktop6@2x.jpg';
// import newTabletImgRetina from '@images/mock/new/newTablet6@2x.jpg';
// import newMobileImgRetina from '@images/mock/new/newMobile6@2x.jpg';

import newDesktopImg from '@images/mock/new/newFreeShippingDesktop.jpg';
import newTabletImg from '@images/mock/new/newFreeShippingTablet.jpg';
import newMobileImg from '@images/mock/new/newFreeShippingMobile.jpg';
import newDesktopImgRetina from '@images/mock/new/newFreeShippingDesktop@2x.jpg';
import newTabletImgRetina from '@images/mock/new/newFreeShippingTablet@2x.jpg';
import newMobileImgRetina from '@images/mock/new/newFreeShippingMobile@2x.jpg';

import middleDesktopImg from '@images/mock/middle/middleDesktop6.jpg';
import middleTabletImg from '@images/mock/middle/middleTablet6.jpg';
import middleMobileImg from '@images/mock/middle/middleMobile6.jpg';
import middleDesktopImgRetina from '@images/mock/middle/middleDesktop6@2x.jpg';
import middleTabletImgRetina from '@images/mock/middle/middleTablet6@2x.jpg';
import middleMobileImgRetina from '@images/mock/middle/middleMobile6@2x.jpg';

import mainDesktopImg from '@images/mock/landing-banner/mainDesktop.jpg';
import mainTabletImg from '@images/mock/landing-banner/mainTablet.jpg';
import mainMobileImg from '@images/mock/landing-banner/mainMobile.jpg';
import mainDesktopImgRetina from '@images/mock/landing-banner/mainDesktop@2x.jpg';
import mainTabletImgRetina from '@images/mock/landing-banner/mainTablet@2x.jpg';
import mainMobileImgRetina from '@images/mock/landing-banner/mainMobile@2x.jpg';

import evaDiscountDesktopImg from '@images/mock/landing-eva-discount/evaDiscountDesktop.jpg';
import evaDiscountDesktopRetina from '@images/mock/landing-eva-discount/evaDiscountDesktop@2x.jpg';
import evaDiscountTabletImg from '@images/mock/landing-eva-discount/evaDiscountTablet.jpg';
import evaDiscountTabletRetina from '@images/mock/landing-eva-discount/evaDiscountTablet@2x.jpg';
import evaDiscountMobileImg from '@images/mock/landing-eva-discount/evaDiscountMobile.jpg';
import evaDiscountMobileRetina from '@images/mock/landing-eva-discount/evaDiscountMobile@2x.jpg';

import { $logger } from '@services';
import {
    getProducts,
    getProductsHot,
    getCategories,
    getBrands,
    getBannersByCode,
    getProductGroups,
    getFrequentCategories,
    getCatalogLatestSets,
} from '@api';

import { storeErrorHandler } from '@util/store';
import { generatePictureSourcePath } from '@util/file';
import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes, productBadges } from '@enums/product';
import {
    SET_BESTSELLER_PRODUCTS,
    SET_NEW_PRODUCTS,
    SET_FEATURED_PRODUCTS,
    SET_CATEGORIES,
    SET_BANNERS,
    SET_BRANDS,
    SET_LOAD,
    SET_BRANDS_SET,
    SET_FREQUENT_CATEGORIES,
    SET_CATALOG_LATEST_SETS,
} from './mutations';

export const FETCH_LANDING_DATA = 'FETCH_LANDING_DATA';
export const FETCH_LANDING_DATA_2 = 'FETCH_LANDING_DATA_2';
export const FETCH_NEW_PRODUCTS = 'FETCH_NEW_PRODUCTS';
export const FETCH_BESTSELLER_PRODUCTS = 'FETCH_BESTSELLER_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const FETCH_BANNERS_SET = 'FETCH_BANNERS_SET';
export const FETCH_FREQUENT_CATEGOIRES = 'FETCH_FREQUENT_CATEGOIRES';
export const FETCH_CATALOG_LATEST_SETS = 'FETCH_CATALOG_LATEST_SETS';

export default {
    async [FETCH_BRANDS]({ commit }) {
        try {
            const data = await getBrands();
            commit(SET_BRANDS, data);
        } catch (error) {
            storeErrorHandler(SET_BRANDS);
        }
    },

    [FETCH_BANNERS]({ commit }) {
        try {
            commit(SET_BANNERS, [
                {
                    id: 'evaDiscount',
                    name: '',
                    type: 'banner',
                    url: 'catalog/nabory_1/eva_professional_nabor_dlya_okrashivaniya_divina_xl_pack/',
                    desktopImage: evaDiscountDesktopImg,
                    desktopImageRetina: evaDiscountDesktopRetina,
                    tabletImage: evaDiscountTabletImg,
                    tabletImageRetina: evaDiscountTabletRetina,
                    mobileImage: evaDiscountMobileImg,
                    mobileImageRetina: evaDiscountMobileRetina,
                },
                {
                    id: 'middleBanner',
                    name: '',
                    type: 'banner',
                    url: 'https://www.instagram.com/bessovestnotalantlivy/',
                    // button: {
                    //     id: 2,
                    //     url: 'https://www.instagram.com/bessovestnotalantlivy/',
                    //     text: 'Подписаться',
                    //     location: 'bottom_left',
                    //     type: 'white',
                    // },
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
                    url: '/?registration=true',
                    // button: {
                    //     id: 2,
                    //     url: '/?registration=true',
                    //     text: 'Присоединиться',
                    //     location: 'bottom_right',
                    //     type: 'white',
                    // },
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
            const data = items || [];
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
                        // button: {
                        //     id: 2,
                        //     url: '/404',
                        //     text: 'Подписаться',
                        //     location: 'bottom',
                        //     type: 'white',
                        // },
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
                    url: '/catalog/',
                    //url: '/catalog/dlya_volos/filters/badge-novinki/',

                    // button: {
                    //     id: 2,
                    //     url: '/catalog/dlya_volos/filters/badge-novinki/',
                    //     text: 'Посмотреть',
                    //     location: 'bottom',
                    //     type: 'white',
                    // },

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
                    url: '/catalog/dlya_volos/filters/badge-bestsellery/',

                    // button: {
                    //     id: 2,
                    //     url: '/catalog/dlya_volos/filters/badge-bestsellery/',
                    //     text: 'Посмотреть',
                    //     location: 'bottom',
                    //     type: 'white',
                    // },

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
            dispatch(FETCH_BANNERS),
            dispatch(FETCH_BANNERS_SET),
            dispatch(FETCH_FREQUENT_CATEGOIRES),
            /*
             * no JS content loading
             */
            dispatch(FETCH_BRANDS),
            dispatch(FETCH_NEW_PRODUCTS),
            dispatch(FETCH_BESTSELLER_PRODUCTS),
            /*
             *
             */
        ]).then(() => commit(SET_LOAD, true));
    },

    [FETCH_LANDING_DATA_2]({ dispatch, commit }) {
        return Promise.all([
            dispatch(FETCH_NEW_PRODUCTS),
            dispatch(FETCH_BESTSELLER_PRODUCTS),
            // dispatch(FETCH_FEATURED_PRODUCTS),
            dispatch(FETCH_CATEGORIES),
            dispatch(FETCH_BRANDS),
            dispatch(FETCH_CATALOG_LATEST_SETS),
        ]).then(() => commit(SET_LOAD, true));
    },
};
