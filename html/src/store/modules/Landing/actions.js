import bestsellerDesktopImg from '@images/mock/bestsellers/bDesktop6.jpg';
import bestsellerTabletImg from '@images/mock/bestsellers/bTablet6.jpg';
import bestsellerMobileImg from '@images/mock/bestsellers/bMobile6.jpg';
import bestsellerDesktopImgRetina from '@images/mock/bestsellers/bDesktop6@2x.jpg';
import bestsellerTabletImgRetina from '@images/mock/bestsellers/bTablet6@2x.jpg';
import bestsellerMobileImgRetina from '@images/mock/bestsellers/bMobile6@2x.jpg';

import newDesktopImg from '@images/mock/new/newDesktop6.jpg';
import newTabletImg from '@images/mock/new/newTablet6.jpg';
import newMobileImg from '@images/mock/new/newMobile6.jpg';
import newDesktopImgRetina from '@images/mock/new/newDesktop6@2x.jpg';
import newTabletImgRetina from '@images/mock/new/newTablet6@2x.jpg';
import newMobileImgRetina from '@images/mock/new/newMobile6@2x.jpg';

import middleDesktopImg from '@images/mock/middle/middleDesktop6.jpg';
import middleTabletImg from '@images/mock/middle/middleTablet6.jpg';
import middleMobileImg from '@images/mock/middle/middleMobile6.jpg';
import middleDesktopImgRetina from '@images/mock/middle/middleDesktop6@2x.jpg';
import middleTabletImgRetina from '@images/mock/middle/middleTablet6@2x.jpg';
import middleMobileImgRetina from '@images/mock/middle/middleMobile6@2x.jpg';

import { $logger } from '@services';
import {
    getProducts,
    getProductsHot,
    getCategories,
    getBrands,
    getBannersByCode,
    getProductGroups,
    getFrequentCategories,
    getCatalogLatestSets, getSeoTags,
} from '@api';

import { storeErrorHandler } from '@util/store';
import { generatePictureSourcePath } from '@util/file';
import { generateCategoryUrl } from '@util/catalog';
import { productGroupTypes, productBadges } from '@enums/product';
import { bannerType } from '@enums';
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
    SET_CATALOG_LATEST_SETS, SET_SEO,
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
export const FETCH_SEO = 'FETCH_SEO';

export default {
    async [FETCH_BRANDS]({ commit }) {
        try {
            const data = await getBrands();
            commit(SET_BRANDS, data);
        } catch (error) {
            storeErrorHandler(SET_BRANDS);
        }
    },

    async [FETCH_BANNERS]({ commit }) {
        const [sliderBanners, middleBanners] = await Promise.all([
            getBannersByCode(bannerType.MAIN_TOP, false, '/'),
            getBannersByCode(bannerType.MAIN_MIDDLE, false, '/'),
        ]);

        try {
            const banners = [];

            if (Array.isArray(sliderBanners) && sliderBanners.length > 0) {
                for (const banner of sliderBanners) {
                    banners.push({
                        id: banner.id,
                        name: '',
                        type: bannerType.MAIN_TOP,
                        url: banner.url,
                        color: banner.color,
                        controlsColor: banner.controls_color,
                        desktopImage: banner.desktopImage,
                        tabletImage: banner.tabletImage,
                        mobileImage: banner.mobileImage,
                    });
                }
            }

            if (Array.isArray(middleBanners) && middleBanners.length > 0) {
                banners.push({
                    id: 'middleBanner',
                    name: 'middleBanner',
                    type: bannerType.MAIN_MIDDLE,
                    url: middleBanners[0].url,
                    desktopImage: middleBanners[0].desktopImage,
                    tabletImage: middleBanners[0].tabletImage,
                    mobileImage: middleBanners[0].mobileImage,
                });
            }

            commit(SET_BANNERS, banners);
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
            const [{ items }, banners] = await Promise.all([
                getProductsHot(productBadges.NEW, 4),
                getBannersByCode(bannerType.MAIN_NEW, false, '/'),
            ]);

            let commitObject = {
                items,
                banner: {
                    id: 'newBanner',
                    name: '',
                    type: bannerType.MAIN_TOP,
                    url: '/catalog/dlya_volos/filters/badge-novinki/',

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
            };

            if (Array.isArray(banners) && banners.length > 0) {
                commitObject.banner = {
                    id: 'newBanner',
                    name: 'newBanner',
                    type: bannerType.MAIN_TOP,
                    url: banners[0].url,
                    desktopImage: generatePictureSourcePath(
                        600,
                        890,
                        banners[0].desktopImage.id,
                        banners[0].desktopImage.sourceExt
                    ),
                    desktopImageRetina: generatePictureSourcePath(
                        1200,
                        1780,
                        banners[0].desktopImage.id,
                        banners[0].desktopImage.sourceExt
                    ),
                    tabletImage: generatePictureSourcePath(
                        642,
                        480,
                        banners[0].tabletImage.id,
                        banners[0].tabletImage.sourceExt
                    ),
                    tabletImageRetina: generatePictureSourcePath(
                        1284,
                        960,
                        banners[0].tabletImage.id,
                        banners[0].tabletImage.sourceExt
                    ),
                    mobileImage: generatePictureSourcePath(
                        768,
                        768,
                        banners[0].mobileImage.id,
                        banners[0].mobileImage.sourceExt
                    ),
                    mobileImageRetina: generatePictureSourcePath(
                        1536,
                        1536,
                        banners[0].mobileImage.id,
                        banners[0].mobileImage.sourceExt
                    ),
                };
            }

            commit(SET_NEW_PRODUCTS, commitObject);
        } catch (error) {
            storeErrorHandler(FETCH_NEW_PRODUCTS)(error);
            return [];
        }
    },

    async [FETCH_BESTSELLER_PRODUCTS]({ commit }, payload = {}) {
        try {
            const [{ items }, banners] = await Promise.all([
                getProductsHot(productBadges.BESTSELLERS, 4),
                getBannersByCode(bannerType.MAIN_BEST, false, '/'),
            ]);

            let commitObject = {
                items,
                banner: {
                    id: 'bestsellersBanner',
                    name: '',
                    type: 'banner',
                    url: '/catalog/dlya_volos/filters/badge-bestsellery/',
                    desktopImage: bestsellerDesktopImg,
                    desktopImageRetina: bestsellerDesktopImgRetina,
                    tabletImage: bestsellerTabletImg,
                    tabletImageRetina: bestsellerTabletImgRetina,
                    mobileImage: bestsellerMobileImg,
                    mobileImageRetina: bestsellerMobileImgRetina,
                },
                btnText: 'Смотреть все',
                btnLink: '/bestsellers',
            };

            if (Array.isArray(banners) && banners.length > 0) {
                commitObject.banner = {
                    id: 'bestsellersBanner',
                    name: 'bestsellersBanner',
                    type: bannerType.MAIN_BEST,
                    url: banners[0].url,
                    desktopImage: generatePictureSourcePath(
                        600,
                        890,
                        banners[0].desktopImage.id,
                        banners[0].desktopImage.sourceExt
                    ),
                    desktopImageRetina: generatePictureSourcePath(
                        1200,
                        1780,
                        banners[0].desktopImage.id,
                        banners[0].desktopImage.sourceExt
                    ),
                    tabletImage: generatePictureSourcePath(
                        642,
                        480,
                        banners[0].tabletImage.id,
                        banners[0].tabletImage.sourceExt
                    ),
                    tabletImageRetina: generatePictureSourcePath(
                        1284,
                        960,
                        banners[0].tabletImage.id,
                        banners[0].tabletImage.sourceExt
                    ),
                    mobileImage: generatePictureSourcePath(
                        768,
                        768,
                        banners[0].mobileImage.id,
                        banners[0].mobileImage.sourceExt
                    ),
                    mobileImageRetina: generatePictureSourcePath(
                        1536,
                        1536,
                        banners[0].mobileImage.id,
                        banners[0].mobileImage.sourceExt
                    ),
                };
            }

            commit(SET_BESTSELLER_PRODUCTS, commitObject);
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

    async [FETCH_SEO]({ commit }) {
        try {
            const seoData = await getSeoTags({ code: 'main' });
            commit(SET_SEO, seoData);
        } catch (error) {
            storeErrorHandler(FETCH_SEO)(error);
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
            dispatch(FETCH_SEO),
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
