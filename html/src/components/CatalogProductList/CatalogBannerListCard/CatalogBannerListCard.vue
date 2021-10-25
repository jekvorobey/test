<template>
    <li class="catalog-banner-list-card" :class="mobileOrderClass">
        <div class="catalog-banner-list-card__img" v-once>
            <router-link tag="div" :to="href" :class="{ 'catalog-banner-list-card__img__link': href }">
                <v-picture>
                    <source
                        v-if="desktopImg.webp"
                        :data-srcset="desktopImg.webp"
                        type="image/webp"
                        media="(min-width: 1024px)"
                    />
                    <source :data-srcset="desktopImg.orig" media="(min-width: 1024px)" />
                    <source
                        v-if="tabletImg.webp"
                        :data-srcset="tabletImg.webp"
                        type="image/webp"
                        media="(min-width: 768px)"
                    />
                    <source :data-srcset="tabletImg.orig" media="(min-width: 768px)" />
                    <source
                        v-if="mobileImg.webp"
                        :data-srcset="mobileImg.webp"
                        type="image/webp"
                        media="(min-width: 320px)"
                    />
                    <source :data-srcset="mobileImg.orig" media="(min-width: 320px)" />
                    <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
                </v-picture>
            </router-link>
        </div>

        <div v-if="item.button" class="catalog-banner-list-card__panel" :class="panelClasses" v-once>
            <v-button class="catalog-banner-list-card__panel-btn" :class="btnClasses" :to="item.button.url || '/'">
                {{ item.button.text }}
            </v-button>
        </div>
    </li>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '@util/file';
import { fileExtension } from '@enums';
import './CatalogBannerListCard.css';

const btnType = Object.freeze({
    WHITE: 'white',
    BLACK: 'black',
    OUTLINE_BLACK: 'outline_black',
    OUTLINE_WHITE: 'outline_white',
});

const btnLocation = Object.freeze({
    TOP: 'top',
    BOTTOM: 'bottom',

    LEFT: 'left',
    RIGHT: 'right',

    TOP_LEFT: 'top_left',
    TOP_RIGHT: 'top_right',

    BOTTOM_LEFT: 'bottom_left',
    BOTTOM_RIGHT: 'bottom_right',
});

export default {
    name: 'catalog-banner-list-card',

    components: {
        VButton,
        VPicture,
    },

    props: {
        item: {
            type: Object,
            default() {
                return {};
            },
        },

        referralCode: {
            type: String,
        },

        position: {
            type: Number,
        },

        itemProp: {
            type: Boolean,
            default: false,
        },

        mobileOrder: {
            type: Number,
        },
    },

    data() {
        return {
            desktopSize: { w: 1200, h: 864 },
            tabletSize: { w: 944, h: 704 },
            mobileSize: { w: 640, h: 640 },
        };
    },

    computed: {
        mobileImg() {
            const { mobileSize } = this;
            const image = this.item.mobileImage || this.item.tabletImage || this.item.desktopImage;
            return {
                webp:
                    image.sourceExt === 'webp'
                        ? `${generatePictureSourcePath(
                              mobileSize.w,
                              mobileSize.h,
                              image.id,
                              fileExtension.image.WEBP
                          )} 1x, ${generatePictureSourcePath(
                              2 * mobileSize.w,
                              2 * mobileSize.h,
                              image.id,
                              fileExtension.image.WEBP
                          )} 2x`
                        : undefined,
                orig: `${generatePictureSourcePath(
                    mobileSize.w,
                    mobileSize.h,
                    image.id
                )} 1x, ${generatePictureSourcePath(2 * mobileSize.w, 2 * mobileSize.h, image.id)} 2x`,
            };
        },

        tabletImg() {
            const { tabletSize } = this;
            const image = this.item.tabletImage || this.item.desktopImage;
            return {
                webp:
                    image.sourceExt === 'webp'
                        ? `${generatePictureSourcePath(
                              tabletSize.w,
                              tabletSize.h,
                              image.id,
                              fileExtension.image.WEBP
                          )} 1x, ${generatePictureSourcePath(
                              2 * tabletSize.w,
                              2 * tabletSize.h,
                              image.id,
                              fileExtension.image.WEBP
                          )} 2x`
                        : undefined,
                orig: `${generatePictureSourcePath(
                    tabletSize.w,
                    tabletSize.h,
                    image.id
                )} 1x, ${generatePictureSourcePath(2 * tabletSize.w, 2 * tabletSize.h, image.id)} 2x`,
            };
        },

        desktopImg() {
            const { desktopSize } = this;
            const image = this.item.desktopImage || this.item.tabletImage;
            return {
                webp:
                    image.sourceExt === 'webp'
                        ? `${generatePictureSourcePath(
                              desktopSize.w,
                              desktopSize.h,
                              image.id,
                              fileExtension.image.WEBP
                          )} 1x, ${generatePictureSourcePath(
                              2 * desktopSize.w,
                              2 * desktopSize.h,
                              image.id,
                              fileExtension.image.WEBP
                          )} 2x`
                        : undefined,
                orig: `${generatePictureSourcePath(
                    desktopSize.w,
                    desktopSize.h,
                    image.id
                )} 1x, ${generatePictureSourcePath(2 * desktopSize.w, 2 * desktopSize.h, image.id)} 2x`,
            };
        },

        defaultImg() {
            const { desktopSize } = this;
            const image = this.item.desktopImage || this.item.tabletImage || this.item.mobileImage.id;
            return generatePictureSourcePath(desktopSize.w, desktopSize.h, image.id);
        },

        btnClasses() {
            const classes = [];
            switch (this.item.button.type) {
                case btnType.WHITE:
                    classes.push('btn--white');
                    break;
                case btnType.OUTLINE_WHITE:
                    classes.push('btn--white');
                    classes.push('btn--outline');
                    break;
                case btnType.OUTLINE_BLACK:
                    classes.push('btn--outline');
                    break;
                default:
                    break;
            }
            return classes;
        },

        panelClasses() {
            const classes = [];
            switch (this.item.button.location) {
                case btnLocation.LEFT:
                    classes.push('catalog-banner-list-card__panel--left');
                    break;
                case btnLocation.RIGHT:
                    classes.push('catalog-banner-list-card__panel--right');
                    break;

                case btnLocation.TOP:
                    classes.push('catalog-banner-list-card__panel--top');
                    break;
                case btnLocation.TOP_LEFT:
                    classes.push('catalog-banner-list-card__panel--top-left');
                    break;
                case btnLocation.TOP_RIGHT:
                    classes.push('catalog-banner-list-card__panel--top-right');
                    break;

                case btnLocation.BOTTOM:
                    classes.push('catalog-banner-list-card__panel--bottom');
                    break;
                case btnLocation.BOTTOM_LEFT:
                    classes.push('catalog-banner-list-card__panel--bottom-left');
                    break;
                case btnLocation.BOTTOM_RIGHT:
                    classes.push('catalog-banner-list-card__panel--bottom-right');
                    break;
                default:
                    break;
            }
            return classes;
        },

        href() {
            return this.item.url || '';
        },

        mobileOrderClass() {
            return `catalog-product-list__item--order-${this.mobileOrder}`;
        },
    },
};
</script>
